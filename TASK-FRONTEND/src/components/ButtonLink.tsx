
import { Link } from 'react-router-dom'

type ButtonLinkProps = {
    textButton: string; 
    LinkButton: string; 
};


export default function ButtonLink({ textButton, LinkButton }: ButtonLinkProps) {
  return (
    <>
      <Link className="bg-slate-400 
          hover:bg-slate-500 px-10 py-3 
          text-white text-xl font-bold 
          cursor-pointer 
          transition-colors rounded-tr-lg rounded-bl-lg" to={LinkButton}>
        {textButton}
      </Link>
    </>
  )
}
