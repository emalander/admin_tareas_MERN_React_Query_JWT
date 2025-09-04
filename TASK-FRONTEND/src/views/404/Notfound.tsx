import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
        <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
        <nav className="mt-10 flex flex-col space-y-2 items-center bg-jira-background-tertiary p-1 rounded-2xl">
        <p>
            <Link to={"/"} className="text-gray-300 font-normal">volver a <span className="italic">Proyectos</span></Link>
        </p>
        </nav>
    </>
  )
}
