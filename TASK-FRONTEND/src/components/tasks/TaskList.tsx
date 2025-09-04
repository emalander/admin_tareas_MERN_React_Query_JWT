import type { Project, TaskProject, TaskStatus } from '@/types/index'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import { statusTranslations } from '@/locales/es'
import DropTask from './DropTask'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatusTask } from '@/api/TaskAPI'
import { useParams } from 'react-router-dom'

type TaskListProps = {
  tasks: TaskProject[],
  canEdit:boolean
}
type GroupTasks = {
  [key: string]: TaskProject[]
}

const initialStatusGroup: GroupTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
}

const statusStyles:{[key:string]:string} = {
  pending: 'border-t-8 border-red-500',
  onHold: 'border-t-8 border-yellow-500',
  inProgress: 'border-t-8 border-orange-500',
  underReview: 'border-t-8 border-blue-500',
  completed: 'border-t-8 border-green-500'
}



export default function TaskList({ tasks, canEdit }: TaskListProps) {

  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!
  //const queryParams = new URLSearchParams(window.location.search)
  //const taskId = queryParams.get('viewTask')!

  const {mutate} = useMutation({
    mutationFn: updateStatusTask,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess:(data)=> {
      toast.success(data)
      //queryClient.invalidateQueries({queryKey:['project', projectId]})
      console.log(params)
    }
  })

  const groupedTasks = (tasks || []).reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  const handleDragEnd = (e:DragEndEvent) => {
    const {over, active} = e
    if(over && over.id) {
      console.log(active.id)
      const taskId = active.id.toString()
      const status = over.id as TaskStatus
      mutate({projectId, taskId, status})

      queryClient.setQueryData(['project', projectId], (prevData:Project)=> {
        const updatedTasks = prevData.tasks.map((task)=> {
          if(task._id === taskId){
            return {
              ...task,
              status
            }
          } return task
        })
        return {
          ...prevData,
          tasks:updatedTasks
        }
      })
    } 
  }

  return (
    <>
      <h2 className="text-3xl font-medium text-jira-text-primary tracking-widest mb-5">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className={`min-w-[300px] 2xl:min-w-0 2xl:w-1/5 bg-jira-background-tertiary rounded-lg shadow-lg ${statusStyles[status]}`}>
              <h3 className="capitalize text-xl font-medium text-jira-text-primary p-3">
                {statusTranslations[status]}
              </h3>
              <DropTask status={status}/>
              <ul className='mt-1 space-y-5 p-3'>
                {tasks.length === 0 ? (
                  <li className="text-jira-text-secondary text-center">No hay tareas</li>
                ) : (
                  tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>

    </>
  )
}
