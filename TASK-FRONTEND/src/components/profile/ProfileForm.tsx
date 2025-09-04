import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
  data:User
}

export default function ProfileForm({ data }: ProfileFormProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey:['user']})
    }
  })

  const handleEditProfile = (formData:UserProfileForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl bg-jira-background-secondary rounded-md shadow-md shadow-jira-background-tertiary">
        <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow ">Mi perfil</h1>
        <p className="text-2xl font-light text-jira-text-primary mt-5 italic">Aquí puedes actualizar tu información</p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="mt-14 space-y-5  bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="font-normal text-2xl text-black tracking-wide"
              htmlFor="name"
            >Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
               className="font-normal text-2xl text-black tracking-wide"
              htmlFor="password"
            >E-mail</label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value='Guardar Cambios'
            className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
          />
        </form>
      </div>
    </>
  )
}