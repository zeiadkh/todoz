const themeReducer = (state = "dark", action: {type: string})=>{
    switch(action.type){
        case "DARK":
            return state = "dark"
        case "LIGHT": 
            return state = "light"
        default: return state
    }
}
export default themeReducer