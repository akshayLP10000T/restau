import { AvatarFallback } from "@radix-ui/react-avatar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Loader2, Locate, Mail, MapPin, MapPinHouse, Plus } from "lucide-react"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { useUserStore } from "@/store/useUserStore"

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
  const { user, updateProfile, loading } = useUserStore();
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    contact: user?.contact,
    address: user?.address,
    city: user?.city,
    country: user?.country,
    profilePicture: user?.profilePicture,
  });

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      if (!file.type.startsWith("image/")) {
        return;
      }

      reader.onload = () => {
        const result = reader.result as string;

        if (result) {
          setSelectedProfilePicture(result);
          setProfileData((prevData) => ({
            ...prevData,
            profilePicture: result,
          }));
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected.");
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateProfile(profileData);
  };


  return (
    <form className="p-9 w-full space-y-2" onSubmit={updateProfileHandler}>
      <div className="flex gap-4 items-center justify-center w-full">
        <Avatar className="relative p-8 text-lg font-medium bg-gray-200 transition-all duration-500 flex items-center justify-center hover:bg-gray-600">
          {selectedProfilePicture ? (
            <AvatarImage src={selectedProfilePicture} alt="Profile Picture" />
          ) : (
            <AvatarFallback>AK</AvatarFallback>
          )}
          <input accept="image/*" onChange={fileChangeHandler} type="file" className="hidden" ref={imageRef} />
          <div onClick={() => imageRef.current?.click()} className="absolute opacity-0 hover:opacity-100 w-full h-full cursor-pointer text-white flex items-center justify-center">
            <Plus />
          </div>
        </Avatar>
        <Input
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={changeHandler}
          className="flex-1 font-bold text-2xl outline-none border-none focus-visible:ring-transparent" />
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              name="email"
              type="email"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              onChange={changeHandler}
              value={profileData.email}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Locate className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              name="address"
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              onChange={changeHandler}
              value={profileData.address}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              onChange={changeHandler}
              value={profileData.city}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              name="country"
              type="text"
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.country}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Phone</Label>
            <input
              name="phone"
              type="text"
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.contact}
            />
          </div>
        </div>
      </div>
      {
        loading ?
          <Button disabled type="submit" className="bg-primaryColor hover:bg-hoverPrimaryColor"><Loader2 className="animate-spin mr-2" /> Please Wait...</Button>
          : <Button type="submit" className="bg-primaryColor hover:bg-hoverPrimaryColor">Update</Button>
      }
    </form>
  )
}

export default Profile