import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import cloudinary from '../utils/cloudinary';
import { generateVerificationCode } from '../utils/generateVerification';
import { generateToken } from '../utils/generateToken';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, contactNumber } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already in use",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const verificationToken = generateVerificationCode()

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            contact: Number(contactNumber),
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        generateToken(res, user);

        await sendVerificationEmail(email, verificationToken);

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
};

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        generateToken(res, user)

        user.lastLogin = new Date();
        await user.save();

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {

        const { verificationCode } = req.body;

        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpireAt: {
                $gt: Date.now()
            }
        }).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        };

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.fullName);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const logout = async (_: Request, res: Response) => {
    try {

        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });

    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Check email address and try again",
            });
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpireAt = new Date(Date.now() + (2 * 60 * 60 * 1000))

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiredAt = resetTokenExpireAt;

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`)

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {

        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiredAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 15);

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiredAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });

    }
}

export const checkAuth = async (req: Request, res: Response) => {
    try {

        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });

    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {

        const userId = req.id;
        const { fullName, email, address, city, country, profilePicture } = req.body;

        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);

        const updatedData = { fullName, email, address, city, country, profilePicture }

        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true
        }).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated",
            user,
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });

    }
}