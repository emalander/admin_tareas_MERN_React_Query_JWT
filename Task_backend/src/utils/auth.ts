import bcrypt from 'bcrypt'

export const hashPassword = async (password:string) => {
  
  const salt = await bcrypt.genSalt(10) // mayor el numero más aleatorio y más lento
  return await bcrypt.hash(password, salt) 
}

export const checkPassword = async (enteredPassword:string, storeHash:string) => {
  return await bcrypt.compare(enteredPassword, storeHash)
}