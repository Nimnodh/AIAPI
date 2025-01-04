import { useSelector } from "react-redux"
import { Data } from "./Types/types"
import { useEffect } from "react"

function App() {
  
  const state = useSelector((state:any):Data => state.data.data)
  useEffect(() => {
    if(state.is_login){
      console.log(state.is_login);
      
      console.log("Logged in");
    }else{
      window.location.href = "login/"
    }
  },[state])
    
  return (
    <>
    Home
    </>
  )
}

export default App
