import { BodyProvider } from "./Context/BodyContext";
import StartPage from "./Views/StartPage";


function App() {
  

  return (
  
    <BodyProvider>
    <StartPage/>
    </BodyProvider>
     
   
   
  )
}

export default App
