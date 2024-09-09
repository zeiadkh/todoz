import Cookies from 'js-cookie';
const initialState = {
    token: null
}
const authReducer = (state = initialState, action: {type: string, payload?: {token: string}})=>{
    // console.log(action.type, "payload")
    // console.log(action.type)
    if (action.type === "LOGIN_Success"){
        // console.log("from here", action.type)
        return {state: action.type, payload: action.payload}
    }
    if(action.type === "Logout"){
        // console.log("logout action reducer", action.type)
        Cookies.remove("token")
        return {state: action.type}
    }
    return state
}
export default authReducer

    
