import { Globe, MapPin } from "lucide-react"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
    data: any;
}

const FoodCard = (props: Props) => {
    return (
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="relative">
                <AspectRatio ratio={16 / 6}>
                    <img className="object-cover w-full h-full aspect-auto" src={props.data.imageUrl} alt="img" />
                </AspectRatio>
                <div className="absolute top-2 left-2 rounded-sm px-3 py-1 bg-white dark:bg-gray-700 bg-opacity-75">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                </div>
            </div>
            <CardContent className="p-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{props.data.restaurentName}</h1>
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <p className="text-sm">
                        City: {" "}
                        <span className="font-medium">{props.data.city}</span>
                    </p>
                </div>
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <Globe size={16} />
                    <p className="text-sm">
                        Country: {" "}
                        <span className="font-medium">{props.data.country}</span>
                    </p>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                    {
                        props.data.cuisines.map((item: string, idx: number) => {
                            return (
                                <Badge key={idx} className='text-primaryColor transition-all duration-300 cursor-pointer bg-zinc-900 text-white hover:bg-white hover:text-black border-[1px] font-medium border-black'>
                                    {item}
                                </Badge>
                            )
                        })
                    }
                </div>
            </CardContent>
            <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white justify-end">
                <Link to={`/restaurent/${props.data._id}`}>
                    <Button className="bg-primaryColor font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200 hover:bg-hoverPrimaryColor">
                        View Menu
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default FoodCard