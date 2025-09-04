import { Fragment } from "react/jsx-runtime";
import { Menu, Transition } from "@headlessui/react";

import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import type { User } from "@/types/index";

export default function ProjectTeam() {

  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false
  })

  const {mutate} = useMutation({
    mutationFn:removeUserFromProject,
    onError:(error)=> {
        toast.error(error.message)
    },
    onSuccess:(data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }

  })

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate to={'/404'} />

  if (data) return (
    <>
      <h1 className="text-3xl font-medium text-white tracking-widest">Administrar equipo</h1>
      <p className="text-2xl font-light text-white mt-5 tracking-widest">Distribuye las tareas</p>
      <nav className='my-5 flex gap-3'>
        <button
          type='button'
          className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate(location.pathname + '?addMember=true')}
        >Agregar colaborador</button>
        <Link to={`/projects/${projectId}`}
          className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover p-3 text-white text-1xl font-bold tracking-wide cursor-pointer">Volver a proyectos</Link>
      </nav>
      <h2 className="text-3xl font-medium text-white tracking-widest">Miembros actuales</h2>
      {data.length ? (
        <ul role="list" className="divide-y divide-gray-100 border border-gray-500 mt-10 bg-white shadow-lg">
          {data?.map((member:User) => (
            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-2">
                <div className="min-w-0 flex-auto space-y-1">
                  <p className="text-3xl font-bold text-gray-600 ">
                    {member.name}
                  </p>
                  <p className="text-2xl text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        <button
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 text-red-500'
                          onClick={()=> mutate({projectId, userId:member._id})}
                        >
                          Eliminar del Proyecto
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center py-20'>No hay miembros en este equipo</p>
      )}
      <AddMemberModal />
    </>
  )
}
