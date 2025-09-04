import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

<div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
    }}
  />
  {/* Your Content/Components */}
</div>

export default function AppLayout() {

  const {data, isError, isLoading} = useAuth()
  
  if(isLoading) return 'Cargando...'
  if(isError) {
    return <Navigate to='/auth/login'/>
  }

  if(data) return (
    
    <div className="min-h-screen w-full bg-jira-background-primary">
      <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231d7afc' fill-opacity='0.1'%3E%3Cpath d='M2 6h12l-6 12-6-12zM20 36h12l-6 12-6-12z'/%3E%3C/g%3E%3Cg fill='%231d7afc' fill-opacity='0.3'%3E%3Cpath d='M2 36h12l-6 12-6-12zM20 6h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          // Controla la posicion y el tamaño de la zona
            top: '0',
            right: '0',
            width: '100%',
            height: '100%',
            backgroundSize: '40px 80px',
          // backgroundRepeat: 'no-repeat' // para que no se repita
          }}
      />
      <div className="relative z-10">
        <header className="py-2 relative">
          <div className="max-w-screen-2xl 
              mx-auto 
              flex flex-col lg:flex-row
              justify-between 
              items-center">
            <div className="ml-5 mt-5">
                <img src="../../estadistica_1.png" alt="Logo" className="h-20 w-auto" />
            </div>
            <div className="mr-5">
              <NavMenu name={data.name}>
                
              </NavMenu>
            </div>
          </div>
        </header>
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>
        <footer className="py-5">
          <p className="text-center text-jira-text-tertiary">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </div>
  );
}
