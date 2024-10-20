import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, LockKeyhole } from 'lucide-react';
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, seterr] = useState("");

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)

            if (password.trim() === "") {
                seterr("Password is required");
                return;
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center px-9 h-screen">
            <h1 className="text-4xl font-bold text-hoverPrimaryColor text-center">Reset Password</h1>
            <h2 className="text-2xl tracking-tight text-primaryColor text-center mt-5">Enter below details to reset password</h2>

            <form className="md:min-w-[50vw] min-w-full mt-5" onSubmit={submitHandler}>
                <div className="w-full">

                    <div className="relative">

                        <Input
                            name="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full bg-zinc-100 outline-none rounded-xl pl-12 pr-3 py-2"
                            type="password"
                            placeholder="Password..."
                        />

                        <LockKeyhole className="absolute top-1/2 left-0 -translate-y-1/2 ml-3 text-gray-600" />
                    </div>
                    {
                        err && <span className="text-red-700 text-sm">{err}</span>
                    }

                </div>
                {
                    loading ?
                        <Button disabled type="submit" className="bg-primaryColor mt-2 w-full rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
                            <Loader2 className="mr-2 animate-spin" />
                            Please wait...
                        </Button>
                        :
                        <Button type="submit" className="bg-primaryColor mt-2 w-full rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
                            Reset Password
                        </Button>
                }
            </form>
            <Separator className="mt-2 md:w-[55vw] w-full" />

            <div className="mt-5">
                Want to login? <Link className="text-blue-700 hover:underline" to={"/login"}>Login</Link>
            </div>
        </div>
    )
}

export default ResetPassword