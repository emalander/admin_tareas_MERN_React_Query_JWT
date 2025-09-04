import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import { useMutation } from '@tanstack/react-query'
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate  } from "react-router-dom";
import { autenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: autenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-jira-background-secondary rounded-md shadow-md shadow-jira-background-tertiary"
        noValidate
      >
        <div className="flex items-center justify-between gap-4"> {/* Contenedor para el logo y el título */}
          
          <img src="../../estadistica_1.png" alt="Logo" className="h-20 w-auto" />
          <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow italic">
            React - Admin <span className="italic">Proyectos</span>
          </h1> 
        </div>
        <div className="w-1/1 h-px bg-gray-500 my-1"></div>
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-jira-text-primary tracking-wide"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("email", {
              required: "El Email es obligatorio",
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
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border placeholder-jira-text-tertiary bg-jira-background-clean"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-2 items-center bg-jira-background-tertiary p-1 rounded-2xl">
        <Link to={"/auth/register"} className="text-gray-300 font-normal">¿No tienes cuenta? <span className="italic">crear cuenta</span></Link>
        <div className="w-1/2 h-px bg-gray-500 my-1"></div>
        <Link to={"/auth/forgot-password"} className="text-gray-300 font-normal mt-1">¿Olvidaste tu password? <span className="italic">reestablecer</span></Link>

      </nav>
    </>
  )
}