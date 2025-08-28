
import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import {toast} from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import {createProject} from "@/api/ProjectAPI"
import ButtonLink from "@/components/ButtonLink"

export default function CreateProjectView() {

    const navigate = useNavigate()
    const initialValues:ProjectFormData = {
        projectName: "",
        clientName: "",
        description:""   
    }

    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({

        mutationFn:createProject, 
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            toast.success(data)
            navigate('/')
        }

    })

    const handleForm = async (formData:ProjectFormData) => mutate(formData)

  return (
    <>
        <div className="max-w-3xl mx-auto">
            
            <h1 className="text-3xl font-medium text-white tracking-widest">Crear proyectos</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para creacion.</p>
            <nav className="my-5 tracking-widest">
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
                    value='Crear proyecto'
                    className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer">
                </input>
            </form>
        </div>
    </>
  )
}
