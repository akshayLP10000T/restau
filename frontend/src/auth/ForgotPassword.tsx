import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail } from "lucide-react"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, seterr] = useState("");

    const submitHandler = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            setLoading(true)

            if(email.trim() === ""){
                seterr("Email is required");
                return;
            }

        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center px-9 h-screen">
            <h1 className="text-4xl font-bold text-hoverPrimaryColor text-center">Forgot Password</h1>
            <h2 className="text-2xl tracking-tight text-primaryColor text-center mt-5">Enter email to get password reset link</h2>

            <form className="md:min-w-[50vw] min-w-full mt-5" onSubmit={submitHandler}>
                <div className="w-full">

                    <div className="relative">

                        <Input
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-100 rounded-xl pl-12 pr-3 py-2"
                            type="email"
                            placeholder="Email..."
                        />

                        <Mail className="absolute top-1/2 left-0 -translate-y-1/2 ml-3 text-gray-600" />
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
                                Send
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

export default ForgotPassword