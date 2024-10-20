import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { FormDataLogin, userLoginSchema } from "@/schema/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";

const Form = () => {
    const [formData, setFormData] = useState<FormDataLogin>({
        email: "",
        password: "",
    });

    const [err, setErr] = useState<Partial<FormDataLogin>>({});

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const { login, loading } = useUserStore();

    const navigate = useNavigate();

    const RegisterHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = userLoginSchema.safeParse(formData);
            if (!result.success) {
                const fieldErr = result.error.formErrors.fieldErrors;
                setErr(fieldErr as Partial<FormDataLogin>);
                return;
            }

            await login(formData);

            navigate("/", {replace: true});

        } catch (error) {
            console.log(error)

        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center px-9">
            <h1 className="text-5xl font-bold text-hoverPrimaryColor">Login</h1>

            <form action="" className="space-y-3 flex flex-col mt-6 w-full" onSubmit={RegisterHandler}>
                <div>

                    <div className="relative">

                        <Input
                            name="email"
                            value={formData.email}
                            onChange={valueChangeHandler}
                            className="w-full bg-zinc-100 rounded-xl pl-12 pr-3 py-2"
                            type="email"
                            placeholder="Email..."
                        />

                        <Mail className="absolute top-1/2 left-0 -translate-y-1/2 ml-3 text-gray-600" />
                    </div>
                    {
                        err && <span className="text-sm text-red-700">{err.email}</span>
                    }
                </div>
                <div>

                    <div className="relative">

                        <Input
                            name="password"
                            value={formData.password}
                            onChange={valueChangeHandler}
                            className="w-full bg-zinc-100 outline-none rounded-xl pl-12 pr-3 py-2"
                            type="password"
                            placeholder="Password..."
                        />

                        <LockKeyhole className="absolute top-1/2 left-0 -translate-y-1/2 ml-3 text-gray-600" />
                    </div>
                    {
                        err && <span className="text-red-700 text-sm">{err.password}</span>
                    }
                </div>
                {
                    loading ?
                        <Button disabled type="submit" className="bg-primaryColor rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
                            <Loader2 className="mr-2 animate-spin" />
                            Please wait...
                        </Button>
                        :
                        <Button type="submit" className="bg-primaryColor rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
                            Login
                        </Button>
                }
                <Link to={"/forgot-password"} className="text-blue-500 font-semibold cursor-pointer hover:underline max-w-fit">Forgot Password?</Link>
            </form>
            <Separator className="mt-3" />
            <p className="text-lg mt-2">
                Not a user?
                <Link to="/register" replace className="text-blue-500 hover:underline cursor-pointer ml-1">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Form;
