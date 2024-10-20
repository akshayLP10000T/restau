import { Timer } from "lucide-react"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"

type Props = {
    data: any;
}

const Header = (props: Props) => {

    return (
        <div className="w-full h-fit relative">
            <img className="object-cover w-full md:h-[30vh] h-[20vh] aspect-auto rounded-xl" src={props.data.imageUrl} alt="img" />
            <Separator className="mt-2" />
            <h1 className="font-medium text-2xl">{props.data.restaurentName}</h1>
            <div className="flex gap-2 mt-1 flex-wrap">
                {
                    props.data.cuisines.map((item: string, idx: number) => {
                        return (
                            <Badge key={idx} className='transition-all duration-300 cursor-pointer hover:bg-zinc-900 bg-zinc-900 text-white font-medium'>
                                {item}
                            </Badge>
                        )
                    })
                }
            </div>
            <div className="mt-2">
                <h2 className="font-medium text-sm flex items-center gap-2"><Timer /> Delivery Time:- <span className="text-primaryColor font-bold">{props.data.deliveryTime} min</span></h2>
            </div>
        </div>
    )
}

export default Header