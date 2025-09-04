import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import type { Project, ProjectFormData } from "@/types/index"
import { updateProject } from "@/api/ProjectAPI"
import ButtonLink from "@/components/ButtonLink"

type EditProjectFormProps = {

    data:ProjectFormData
    projectId:Project['_id']
}


export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    console.log(data)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    } })

    const queryClient =useQueryClient()

    const {mutate} = useMutation({

        mutationFn: updateProject,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData:ProjectFormData) => {

        const data = {
            formData,
            projectId
        }
        mutate(data) // 
    }

    return (
        <>
            <div className="max-w-3xl mx-auto space-y-8 p-10 bg-jira-background-secondary rounded-md shadow-md shadow-jira-background-tertiary">
                <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow">Editar proyecto</h1>
                <p className="text-2xl font-semibold text-gray-500 mt-5">Llena el siguiente formulario para edición.</p>
                <nav className="my-5">
                    <ButtonLink textButton="Volver a proyectos" LinkButton='/'/>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input type="submit"
                        value='Guardar cambios'
                        className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer">
                    </input>
                </form>
            </div>
        </>
    )
}
