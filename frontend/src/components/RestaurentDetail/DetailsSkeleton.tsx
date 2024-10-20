import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const DetailsSkeleton = () => {
  return (
    <>
      <div className="w-full h-fit relative">
        <Skeleton className="object-cover w-full md:h-[30vh] h-[20vh] aspect-auto rounded-xl" />

        <Skeleton className="mt-2 w-full h-2" />

        <Skeleton className="w-1/2 h-6 mt-4" />

        <div className="flex gap-2 mt-1 flex-wrap">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="w-20 h-6 rounded-md" />
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </div>

      <div className="w-full h-full">
        <Skeleton className="w-1/3 h-8 mt-6" />

        <div className="grid md:grid-cols-3 sm:grid-cols-2 space-y-4 md:space-y-4 space-x-3 w-full">
          {[...Array(3)].map((_, idx) => (
            <Card key={idx} className="shadow-lg hover:shadow-xl rounded-lg overflow-hidden mt-4">
              <Skeleton className="w-full h-40 object-cover" />

              <CardContent className="p-4">
                <Skeleton className="w-2/3 h-6 mb-2" />

                <Skeleton className="w-full h-4 mt-2" />
                <Skeleton className="w-full h-4 mt-2" />
                <Skeleton className="w-5/6 h-4 mt-2" />

                <div className="flex gap-2 items-center mt-4">
                  <Skeleton className="w-12 h-4" />
                  <Skeleton className="w-8 h-4" />
                </div>
              </CardContent>

              <CardFooter className="p-2">
                <Skeleton className="w-full h-8 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </>

  )
}

export default DetailsSkeleton