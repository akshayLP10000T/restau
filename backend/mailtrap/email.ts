import { generatePasswordResetEmailHtml, generateWelcomeEmailHtml, htmlContent, generateResetSuccessEmailHtml } from "./htmlContent";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            category: "Email Verification",
            html: htmlContent.replace("{verificationToken}", verificationToken) ,
        });

    } catch (error) {
        console.log(error);

        throw new Error("Failed to send verification email");
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generateWelcomeEmailHtml(name);

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Welcome!",
            html: htmlContent,
            template_variables: {
                company_info_name: "AlooDaParontha",
                name: name,
            }
        });

    } catch (error) {
        console.log(error);

        throw new Error("Failed to send welcome email");
    }
}

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generatePasswordResetEmailHtml(resetUrl);

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: htmlContent,
            category: "Reset Password",
        });

    } catch (error) {
        console.log(error);

        throw new Error("Failed to send password reset email");
    }
}

export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generateResetSuccessEmailHtml();

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "password reset successfully",
            html: htmlContent,
            category: "Password resetted",
        });

    } catch (error) {
        console.log(error);

        throw new Error("Failed to send reset success email");
    }
}