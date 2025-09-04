import { getFullProjectDetail } from '@/api/ProjectAPI'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TaskList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { useMemo } from 'react'

export default function ProjectDetailsView() {


  const { data: user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProjectDetail(projectId),
    retry: false
  })

  const canEdit = useMemo(() =>data?.manager=== user?._id, [data, user])

  console.log(canEdit)

  if (isLoading && authLoading) return 'Cargando...'
  if (isError) return <Navigate to='/404' />
  
  if (data && user) return (
    <>
      <h1 className='text-3xl font-medium text-white tracking-widest mb-5'>{data.projectName} | {data.description}</h1>
      {isManager(data.manager, user._id) && (
        <nav className='my-5 flex gap-3'>
          <button
            type='button'
            className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
            onClick={() => navigate(location.pathname + '?newTask=true')}
          >Agregar tarea</button>
          <Link to={'team'}
            className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover p-3 text-white text-1xl font-bold tracking-wide cursor-pointer">Colaboradores</Link>
        </nav>
      )}
      <TaskList
        tasks={data.tasks}
        canEdit = {canEdit}
      />
      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
