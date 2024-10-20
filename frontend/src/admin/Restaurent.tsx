import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurentFormSchema,
  RestaurentFormSchema,
} from "@/schema/restaurent";
import { useRestaurentStore } from "@/store/useRestaurentStore";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Restaurent = () => {
  const { loading, createRestaurent, restaurent, updateRestaurent, getRestaurent } =
    useRestaurentStore();
  const [input, setInput] = useState<RestaurentFormSchema>({
    restaurentName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const formData = new FormData();
  formData.append("restaurentName", input.restaurentName);
  formData.append("city", input.city);
  formData.append("country", input.country);
  formData.append("deliveryTime", input.deliveryTime?.toString());
  formData.append("cuisines", JSON.stringify(input.cuisines));

  if (input.imageFile) {
    formData.append("imageFile", input.imageFile);
  }

  const addRestaurentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurentFormSchema.safeParse(input);
    if (!result.success) {
      const errors = result.error.formErrors.fieldErrors;
      setErrors(errors as Partial<RestaurentFormSchema>);
      return;
    }

    if (restaurent) {
      await updateRestaurent(formData);
    } else {
      await createRestaurent(formData);
    }
  };

  const [errors, setErrors] = useState<Partial<RestaurentFormSchema>>({});

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  useEffect(() => {
    const fetchRestaurent = async () => {
        await getRestaurent();

      setInput({
        restaurentName: restaurent.restaurentName ,
        city: restaurent.city,
        country: restaurent.country,
        deliveryTime: restaurent.deliveryTime,
        cuisines: restaurent.cuisines? restaurent.cuisines.map((cuisine: string)=> cuisine) : [],
        imageFile: undefined,
      });
    };

    fetchRestaurent();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-extrabold">Add Restaurent</h1>
      <form className="space-y-2 mt-5 w-full" onSubmit={addRestaurentHandler}>
        <div>
          <Label className="text-lg">Restaurent Name</Label>
          <Input
            type="text"
            placeholder="Enter your restaurent name"
            className="w-full"
            name="restaurentName"
            value={input.restaurentName}
            onChange={valueChangeHandler}
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.restaurentName}
            </span>
          )}
        </div>
        <div>
          <Label className="text-lg">City</Label>
          <Input
            type="text"
            placeholder="Enter city"
            className="w-full"
            name="city"
            value={input.city}
            onChange={valueChangeHandler}
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.city}
            </span>
          )}
        </div>
        <div>
          <Label className="text-lg">Country</Label>
          <Input
            type="text"
            placeholder="Enter country"
            className="w-full"
            name="country"
            value={input.country}
            onChange={valueChangeHandler}
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.country}
            </span>
          )}
        </div>
        <div>
          <Label className="text-lg">Extimated Delivery time</Label>
          <Input
            type="number"
            placeholder="Enter estimated delivery time (minutes)"
            className="w-full"
            name="deliveryTime"
            value={input.deliveryTime}
            onChange={valueChangeHandler}
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.deliveryTime}
            </span>
          )}
        </div>
        <div>
          <Label className="text-lg">Cuisines</Label>
          <Input
            type="text"
            placeholder="e.g. Vada Pao, Aloo roti, biryani"
            className="w-full"
            name="cuisines"
            value={input.cuisines}
            onChange={(e) =>
              setInput({ ...input, cuisines: e.target.value.split(",") })
            }
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.cuisines}
            </span>
          )}
        </div>
        <div>
          <Label className="text-lg">Enter banner image</Label>
          <Input
            type="file"
            accept="image/*"
            name="imageFile"
            onChange={(e) =>
              setInput({
                ...input,
                imageFile: e.target.files?.[0] || undefined,
              })
            }
          />
          {errors && (
            <span className="text-sm text-red-700 font-medium">
              {errors.imageFile?.name}
            </span>
          )}
        </div>
        <div>
          {loading ? (
            <Button
              type="submit"
              className="bg-primaryColor hover:bg-hoverPrimaryColor mt-4"
              disabled
            >
              <Loader2 className="mr-2 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-primaryColor hover:bg-hoverPrimaryColor mt-4"
            >
              {!restaurent ? "Add Restaurent" : "Update Restaurent"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Restaurent;
