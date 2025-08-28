import type { Task } from '@/types/index'
import TaskCard from './TaskCard'
import { statusTranslations } from '@/locales/es'

type TaskListProps = {
  tasks: Task[],
  canEdit:boolean
}
type GroupTasks = {
  [key: string]: Task[]
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

  const groupedTasks = (tasks || []).reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  console.log(groupedTasks)
  return (
    <>
      <h2 className="text-3xl font-medium text-jira-text-primary tracking-widest mb-5">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className={`min-w-[300px] 2xl:min-w-0 2xl:w-1/5 bg-jira-background-tertiary rounded-lg shadow-lg ${statusStyles[status]}`}>
            <h3 className="capitalize text-xl font-medium text-jira-text-primary p-3">
              {statusTranslations[status]}
            </h3>
            
            <ul className='mt-1 space-y-5 p-3'>
              {tasks.length === 0 ? (
                <li className="text-jira-text-secondary text-center">No hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
      </div>

    </>
  )
}
