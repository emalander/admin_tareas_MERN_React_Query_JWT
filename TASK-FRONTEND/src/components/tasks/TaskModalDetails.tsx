import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatusTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import formatDate from '@/utils/utils';
import { formatDateWithSeconds } from '@/utils/dateFormatter';
import { statusTranslations } from '@/locales/es'
import type { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';
//import { URLSearchParams } from 'url';

export default function TaskModalDetails() {

  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(window.location.search)
  const taskId = queryParams.get('viewTask')!
  const navigate = useNavigate()

  const show = taskId ? true : false



  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })

    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const status = e.target.value as TaskStatus
    const data = { projectId, taskId, status }
    mutate(data)
  }

  const statusStyles: { [key: string]: string } = {
    pending: 'border-t-8 border-red-500',
    onHold: 'border-t-8 border-yellow-500',
    inProgress: 'border-t-8 border-orange-500',
    underReview: 'border-t-8 border-blue-500',
    completed: 'border-t-8 border-green-500'
  }

  if (isError) {
    toast.error(error.message, { toastId: 'error' })
    return <Navigate to={`/projects/${projectId}`} />
  }

  if (data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-slate-100 text-left align-middle shadow-xl transition-all p-16">
                  
                  <div className='bg-gray-50 p-2'>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-black my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className='text-lg text-slate-800 mb-2'>Descripción:{data.description}</p>
                    
                    <p className='text-sm text-slate-800'><span className='font-bold tracking-widest'>Agregada el:</span> {formatDate(data.createdAt)} </p>
                    <p className='text-sm text-slate-800'><span className='font-bold tracking-widest'>Última actualización:</span> {formatDate(data.updatedAt)}</p>
                  </div>
                  <div className="w-1/1 h-px bg-gray-500 my-1"></div>
                  <div className='bg-gray-200 flex flex-col items-center p-5'>
                    
                    
                      <div className='bg-gray-300 w-3/4 flex flex-row justify-between items-center p-5'>
                        <label className='font-bold'>Estado Actual:</label>
                        <select
                          className='p-3 w-2/3 bg-white border border-gray-300'
                          defaultValue={data.status}
                          onChange={handleChange}
                        >
                          {Object.entries(statusTranslations).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    <br></br>
                    <div className="w-1/1 h-px bg-gray-500 my-1"></div>
                    <p className='text-lg text-black mb-2 tracking-wide text-left self-start'>Historial de cambios</p>
                    {data.completedBy.length ? (
                      <ul className=' list-decimal w-3/4'>
                        {data.completedBy.map((activityLog, index) => (
                          <li
                            key={activityLog._id}
                            className="bg-gray-50 p-1 mb-2"
                          >
                            <div className={`font-semibold text-slate-600 ${statusStyles[activityLog.status]}`}>
                              <span>
                                {statusTranslations[activityLog.status]}
                              </span>{' '} por: {' '}
                              <span className='font-bold text-black'>{activityLog.user.name}</span>
                            </div>
                            <div className="mt-2"></div>

                          </li>

                        ))}
                      </ul>) : null}

                    
                  </div>
                  <div className="w-1/1 h-px bg-gray-500 my-1"></div>
                  <NotesPanel notes={data.notes} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}