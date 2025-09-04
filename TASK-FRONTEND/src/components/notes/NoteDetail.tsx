import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import formatDate from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}:NoteDetailProps) {

  const {data, isLoading} = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id , [data])
  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    } 

  })

  if(isLoading) return 'Cargando...'

  return (
    <div className="bg-white p-2  w-full max-w-2xl mx-auto mb-0.5">
        <div className="border-b m-1">
            <p className="bg-gray-100 border-b border-gray-300 p-2">
                {note.content} 
            </p>
            
        </div>
        <div className="p-1 flex justify-between items-center bg-white rounded-lg">
            <p className="text-xs text-jira-border-dark">
              Autor: <span className="font-bold italic">{note.createdBy.name}</span>
            </p>
            <p className="text-xs text-jira-border-dark">
              <span>{formatDate(note.createdAt)}</span>
            </p>
            {canDelete && (
          <button 
            type="button"
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
            onClick={()=>mutate({projectId, taskId,noteId:note._id})}
          >Eliminar</button>
        )} 
        </div>
        
    </div>
  )
}

