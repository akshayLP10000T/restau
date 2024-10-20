import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);

  const { verify, loading } = useUserStore();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  const navigate = useNavigate();

  const verifyHandler = async (e:  React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const verificationCode = otp.join("");
      await verify(verificationCode);

      navigate("/", {replace: true});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-9 flex-col">
      <h1 className="text-4xl font-bold text-hoverPrimaryColor text-center">Verify Your email</h1>
      <p className="text-lg mt-2 font-semibold text-primaryColor">Enter the 6 digit code that we have send you</p>

      <form onSubmit={(e)=> verifyHandler(e)}>
        <div className="flex w-full items-center justify-between gap-5 mt-3">
          {
            otp.map((letter: string, index: number) => (
              <Input
                type="text"
                key={index}
                value={letter}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(element) => inputRef.current[index] = element}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                className="md:w-12 md:h-12 rounded-md w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))
          }
        </div>
        {
          loading ?
            <Button disabled type="submit" className="bg-primaryColor mt-4 w-full rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
              <Loader2 className="mr-2 animate-spin" />
              Please wait...
            </Button>
            :
            <Button type="submit" className="bg-primaryColor w-full mt-4 rounded-full text-white py-3 hover:bg-hoverPrimaryColor">
              Verify
            </Button>
        }
      </form>
    </div>
  )
}

export default VerifyEmail