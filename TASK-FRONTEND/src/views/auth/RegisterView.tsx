import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn:createAccount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess:(data)=> {
        toast.success(data)
        reset()
    }
  })
  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow italic">Crear Cuenta</h1>
      <p className="text-1xl font-medium text-jira-text-primary tracking-widest text-left flex-grow italic mt-5">
        Llena el formulario para crear tu cuenta
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-jira-background-secondary rounded-md shadow-md shadow-jira-background-tertiary"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-jira-text-primary tracking-wide"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("email", {
              required: "El Email de registro es obligatorio",
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-jira-text-primary tracking-wide"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-jira-text-primary tracking-wide"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("password", {
              required: "El Password es obligatorio",
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-jira-text-primary tracking-wide"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
        />
      </form>
      
      <nav className="mt-10 flex flex-col space-y-2 items-center bg-jira-background-tertiary p-1 rounded-2xl">
          <Link to={"/auth/login"} className="text-gray-300 font-normal">Iniciar sesión</Link>
          <div className="w-1/2 h-px bg-gray-500 my-1"></div>
          <Link to={"/auth/forgot-password"} className="text-gray-300 font-normal mt-1">¿Olvidaste tu password? <span className="italic">reestablecer</span></Link>
      </nav>
    </>
  )
}