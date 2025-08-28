import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }

  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl font-medium text-jira-text-primary tracking-widest text-left flex-grow italic">Reestablecer Password</h1>
      <p className="text-1xl font-medium text-jira-text-primary tracking-widest text-left flex-grow italic mt-5">
        Ingresa tu email para reestablecer tu password
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 bg-jira-background-secondary rounded-md shadow-md shadow-jira-background-tertiary"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
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

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-jira-accent-blue hover:bg-jira-accent-blue-hover w-full p-3 text-white text-1xl font-bold tracking-wide cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-2 items-center bg-jira-background-tertiary p-1 rounded-2xl">
        <Link to={"/auth/login"} className="text-gray-300 font-normal">¿Ya tienes cuenta? <span className="italic">Iniciar Sesión</span></Link>
        <div className="w-1/2 h-px bg-gray-500 my-1"></div>
        <Link to={"/auth/register"} className="text-gray-300 font-normal mt-1">¿No tienes cuenta? <span className="italic">Crea una cuenta</span></Link>

      </nav>
    </>
  )
}