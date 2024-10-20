import Footer from "@/components/MainLayout/Footer"
import Navbar from "@/components/MainLayout/Navbar"
import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="w-full min-h-full overflow-x-hidden flex flex-col md:m-0">
      <header>
        <Navbar />
      </header>
      <Separator />
      <div className="flex-1 px-2 flex w-full h-full items-center justify-center">
        <Outlet />
      </div>
      <footer className="w-full items-end justify-end">
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout