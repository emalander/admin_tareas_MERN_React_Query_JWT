import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatusTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import formatDate from '@/utils/utils';
import { statusTranslations } from '@/locales/es'
import type { TaskStatus } from '@/types/index';
//import { URLSearchParams } from 'url';

export default function TaskModalDetails() {

  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(window.location.search)
  const taskId = queryParams.get('viewTask')!
  const navigate = useNavigate()

  const show = taskId ? true: false

  const {data, isError, error} = useQuery({
    queryKey: ['task', taskId],
    queryFn:() => getTaskById({projectId, taskId}),
    enabled:!!taskId
  })

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateStatusTask,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess:(data)=> {
      toast.success(data)
      queryClient.invalidateQueries({queryKey:['project', projectId]})
      queryClient.invalidateQueries({queryKey:['task', taskId]})
    }
  })

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    
    const status = e.target.value as TaskStatus
    const data = {projectId, taskId, status}
    mutate(data)
  }

  if(isError) {
    toast.error(error.message, {toastId:'error'})
    return <Navigate to={`/projects/${projectId}`}/>
  }

  if(data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-jira-background-clean text-left align-middle shadow-xl transition-all p-16">
                  <div className='text-jira-text-primary bg-jira-background-tertiary rounded-t-md p-2'>
                    <p className='text-sm text-jira-text-primary'><span className='font-bold tracking-widest'>Agregada el:</span> {formatDate(data.createdAt) } </p>
                    <p className='text-sm text-jira-text-primary'><span className='font-bold tracking-widest'>Última actualización:</span> {formatDate(data.updatedAt)}</p>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5"
                  >{data.name }
                  </Dialog.Title>
                  <p className='text-lg text-slate-500 mb-2'>Descripción:{data.description}</p>
                  <p className='text-lg text-slate-500 mb-2'>Historial de cambios</p>
                  <br></br>
                  <ul className=' list-decimal'>
                    {data.completedBy.map((activityLog, index)=> (
                      <li
                        key={activityLog._id}
                        className={`
                          p-2 
                          ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                          ${index < data.completedBy.length - 1 ? 'border-b border-gray-300' : ''}
                        `}
                      >
                        <span className='font-bold text-slate-600'>
                          {statusTranslations[activityLog.status]} 
                        </span>{' '} por: 
                          {activityLog.user.name}
                      </li>
                    ))}
                  </ul>
                  <div className='my-5 space-y-3'>
                    <label className='font-bold'>Estado Actual:</label>
                    <select 
                      className='w-full p-3 bg-white border border-gray-300'
                      defaultValue={data.status}
                      onChange={handleChange}
                    >
                      {Object.entries(statusTranslations).map(([key, value])=>(
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}