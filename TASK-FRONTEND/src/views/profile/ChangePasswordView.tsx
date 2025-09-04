import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import type { UpdateCurrentUserPasswordForm } from "@/types/index";

export default function ChangePasswordView() {
  const initialValues:UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password');

  const handleChangePassword = (formData:UpdateCurrentUserPasswordForm) => { 

    console.log(formData)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow">Cambiar Password</h1>
        <p className="text-2xl font-light text-jira-text-primary mt-5 italic">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="mt-14 space-y-5  bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="font-normal text-2xl text-black tracking-wide"
              htmlFor="current_password"
            >Password Actual</label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="font-normal text-2xl text-black tracking-wide"
              htmlFor="password"
            >Nuevo Password</label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="font-normal text-2xl text-black tracking-wide"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
          />
        </form>
      </div>
    </>
  )
}