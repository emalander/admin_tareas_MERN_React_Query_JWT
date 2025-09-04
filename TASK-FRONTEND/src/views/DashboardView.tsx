
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery} from '@tanstack/react-query'
import { getProjects } from "@/api/ProjectAPI"
import ButtonLink from "@/components/ButtonLink"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

export default function DashboardView() {

  const location = useLocation ()
  const navigate = useNavigate()
  const {data:user, isLoading:authLoading} = useAuth()
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading && authLoading) return 'Cargando...'
  if (error) {
    // Si hay un error, puedes manejarlo aquí
    return <div>Error al cargar los proyectos: {error.message}</div>;
  }

  const colorShades = [
    'bg-jira-background-tertiary',
  ];

  let bgColorClass

  if (data && user) return (
    <>
      <h1 className="text-3xl font-medium text-white tracking-widest">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5 tracking-widest">Administrar proyectos</p>
      <nav className="my-5 tracking-widest">
        <ButtonLink textButton="Nuevo proyecto" LinkButton='/projects/create'/>
      </nav>
      {data.length ? (
        <ul role="list" className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((project, i) => {

            bgColorClass = colorShades[i % colorShades.length]
            return(
              <li key={project._id} className={`flex justify-between gap-x-6 px-5 py-10 mb-4 bg-cyan-600 rounded-lg rounded-tl-none ${bgColorClass}  border border-slate-200`}>
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2 ">
                    <div className='mb-2'>
                      {isManager(project.manager, user._id) ? 
                      <p className='font-bold text-xs uppercase text-jira-background-primary bg-jira-accent-red border-2 border-red-500 rounded-lg inline-block py-1 px-5'>Manager</p>:
                      <p className='font-bold text-xs uppercase text-jira-background-primary bg-jira-accent-green border-2 border-green-500 rounded-lg inline-block py-1 px-5'>Miembro del equipo</p>}
                    </div>
                    <Link to={`/projects/${project._id}`}
                      className="text-jira-text-primary cursor-pointer hover:underline text-2xl font-bold"
                    >{project.projectName}</Link>
                    <div className='mt-2 bg-jira-background-secondary p-4 rounded-tr-lg rounded-bl-lg'>
                      <p className="text-md text-jira-text-primary">
                      Cliente: <b>{project.clientName}</b>
                      </p>
                      <p className="text-md text-jira-text-primary bg-jira-background-secondary">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6 py-1">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                      >
                        <Menu.Item>
                          <Link to={`/projects/${project._id}`}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            Ver Proyecto
                          </Link>
                        </Menu.Item>
                        {isManager(project.manager, user._id) && (
                          <>
                            <Menu.Item>
                              <Link to={`/projects/${project._id}/edit`}
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                Editar Proyecto
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}` )}
                              >
                                Eliminar Proyecto
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        
        <nav className="mt-10 flex flex-col space-y-2 items-center bg-jira-background-tertiary p-1 rounded-2xl">
        <p className="text-2xl tracking-widest text-gray-300 font-normal">No hay proyectos aún</p>

      </nav>
      )}
      <DeleteProjectModal/>
    </>

  )
}
