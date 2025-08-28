
import Logo from "@/components/Logo";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Authlayout() {
  return (
    <>
        <div className="bg-jira-background-primary min-h-screen" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231d7afc' fill-opacity='0.11'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}> 
          <div className="py-10 lg:py:20 mx-auto w-[450px]">
            <div className="mt-10">
              
              <Outlet/>
            </div>
          </div>
        </div>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
    </>
  )
}
