import { useState } from "react"
import AddItemDialog from "./addMenu/AddItemDialog";
import ItemCard from "./addMenu/ItemCard";
import { useRestaurentStore } from "@/store/useRestaurentStore";

const AddMenu = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { restaurent } = useRestaurentStore();

    return (
        <div className="w-full h-full">
            <div className="p-3 flex items-center h-fit justify-between w-full">
                <h1 className="text-3xl font-extrabold">Available Items</h1>
                <div className="mt-3">
                    <AddItemDialog open={open} setOpen={setOpen} />
                </div>
            </div>

            <div className="h-full w-full grid lg:grid-cols-2 grid-cols-1 gap-4 items-center justify-center">
                {
                    restaurent.items.map((data: any, idx: number) => {
                        return (
                            <ItemCard key={idx} data={data} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AddMenu