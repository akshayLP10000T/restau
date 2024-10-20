import { useState } from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [text, setText] = useState<string>("");
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto lg:p-10 rounded-lg items-center justify-center m-4 gap-20">
            <div className="flex flex-col gap-10 lg:w-[40%] flex-1">
                <div className="flex-col flex gap-5">
                    <h1 className="font-bold lg:font-extrabold lg:text-5xl text-3xl">Lorem ipsum dolor sit amet. Lorem, ipsum dolor.</h1>
                    <p className="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero id architecto at tenetur unde fugit soluta pariatur rem? Porro, illo!</p>
                </div>
                <form onSubmit={() => navigate(`/search/${text}`)}>

                    <div className="relative">

                        <Input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="pl-10 border-2 shadow-lg"
                            placeholder="Search for you food..."
                        />
                        <Search className="text-gray-500 absolute top-1/2 left-2 -translate-y-1/2" />
                    </div>
                    <Button type="submit" className="bg-primaryColor hover:bg-hoverPrimaryColor mt-2 w-full">Search</Button>
                </form>
            </div>
            <div className="max-h-[100vw] max-w-[100vw] p-2 lg:max-h-[500px] lg:max-w-[500px] aspect-square">
                <img className="object-cover aspect-square object-center w-full lg:max-h-[500px] lg:max-w-[500px] max-h-[100vw] rounded-full max-w-[100vw]" src="./pizza.jpg" alt="img" />
            </div>
        </div>
    )
}

export default HeroSection