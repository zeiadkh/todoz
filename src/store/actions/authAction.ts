export const Login = (token?: string)=> ({type: "LOGIN_Success", payload: token})
export const Register = ()=> ({type: "Register_Success"})
export const Logout = ()=> ({type: "Logout"})