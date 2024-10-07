import { BrowserRouter,Routes,Route } from "react-router-dom";
import { BodyProvider } from "./Context/BodyContext";
import StartPage from "./Views/StartPage";
import Result from "./Views/Result";


function App() {
  

  return (
    <BrowserRouter>
       <BodyProvider>
      <Routes >
        <Route path="/" element = {<StartPage/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    
    </BodyProvider>
    </BrowserRouter>
 
     
   
   
  )
}

export default App
