import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNotesForm() {

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: createNote,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess:(data)=> {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData})
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="flex flex-col items-center space-y-3 "
      noValidate
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="font-bold" htmlFor="">Crear Nota</label>
        <input id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="p-3 border border-jira-accent-blue bg-gray-50"
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />
        {errors.content && (
          <ErrorMessage >{errors.content?.message}</ErrorMessage>
        )}
      </div>
      <input
        type='submit'
        value='Crear Nota'
        className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-3/4 p-3 text-white text-1xl font-bold tracking-wide cursor-pointer" ></input>
    </form>
  )
}
