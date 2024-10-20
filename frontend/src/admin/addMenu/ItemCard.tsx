import { Button } from "@/components/ui/button"
import { useState } from "react";
import EditMenu from "./EditMenu";

const ItemCard = (props: any) => {
    const [selectedItem, setSelectedItem] = useState<any>();
    const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);

    return (
        <div className="w-full h-full shadow-md hover:shadow-xl rounded-lg border flex flex-col md:p-4 p-2 gap-2">

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
                <img
                    className="h-32 w-full object-cover rounded-lg md:w-fit"
                    src={props.data?.image || ""} alt="img" />
                <div className="flex-1">
                    <h1 className="text-lg font-semibold text-gray-800">{props.data?.name}</h1>
                    <p className="text-sm text-gray-600">{props.data?.description}</p>
                    <h2 className="font-semibold mt-1">Price: <span className="text-primaryColor font-bold">{props.data?.price}</span></h2>
                </div>
            </div>
            <Button onClick={() => {
                setSelectedItem(props.data);
                setEditMenuOpen(true);
            }} size={'sm'} className="bg-primaryColor hover:bg-hoverPrimaryColor w-full">Edit</Button>

            <EditMenu selectedMenu={selectedItem} open={editMenuOpen} setOpen={setEditMenuOpen} />

        </div>
    )
}

export default ItemCard