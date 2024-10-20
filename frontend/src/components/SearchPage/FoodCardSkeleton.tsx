import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const FoodCardSkeleton = () => {
    return (
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="relative">
                <AspectRatio ratio={16 / 6}>
                    <Skeleton className="object-cover w-full h-full aspect-auto" />
                </AspectRatio>
                <div className="absolute top-2 left-2 rounded-sm px-3 py-1 bg-white dark:bg-gray-700 bg-opacity-75">
                    <Skeleton className="w-16 h-4" />
                </div>
            </div>

            <CardContent className="p-4">
                <Skeleton className="w-1/2 h-6 mb-2" />
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-24 h-4 ml-2" />
                </div>
                <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-24 h-4 ml-2" />
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                    {[...Array(3)].map((_, idx) => (
                        <Skeleton key={idx} className="w-20 h-6" />
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white justify-end">
                <Skeleton className="w-24 h-8 rounded-full" />
            </CardFooter>
        </Card>

    )
}

export default FoodCardSkeleton