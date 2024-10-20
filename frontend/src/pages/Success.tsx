import { IndianRupee } from "lucide-react"
import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div className="p-3 flex flex-col items-center justify-center md:w-[50vw] border w-fit h-full rounded-lg px-7 py-3 shadow-md hover:shadow-xl">
        <h1 className="font-bold text-2xl">Order status: <span className="text-red-600">CONFIRM</span></h1>

        <div className="flex flex-col w-full h-full items-center mt-3 gap-3">
          <p className="text-lg text-gray-700">Order summary</p>
          <div className="flex flex-col w-full h-full gap-3">
            <div className="flex w-full h-full justify-between items-center border-b border-gray-300 hover:bg-gray-100 px-3 py-3 rounded-xl">
              <div className="flex items-center gap-2">
                <img className="rounded-full h-16 w-16 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIibPbOeDQQscm9g-fDNdCvROokQJukg8nYQ&s" alt="img" />
                <p>Pizza</p>
              </div>
              <div className="flex">
                <IndianRupee />
                <p>80</p>
              </div>
            </div>
          </div>
          <Link to={"/cart"} className="bg-primaryColor hover:bg-hoverPrimaryColor w-full text-white text-center py-2 rounded-lg">Continue Shopping</Link>
        </div>

    </div>
  )
}

export default Success