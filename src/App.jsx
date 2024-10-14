import { BrowserRouter,Routes,Route } from "react-router-dom";
import { BodyProvider } from "./Context/BodyContext";
import StartPage from "./Views/StartPage";
import Result from "./Views/Result";
import Foods from "./Views/Foods";
import TableView from './Views/TableView'


function App() {
  

  return (
    <BrowserRouter>
       <BodyProvider>
      <Routes >
        <Route path="/" element = {<StartPage/>}/>
        <Route path="/result"  element={<Result/>}/>
        <Route path="/foods"  element={<Foods/>}/>
        <Route path="/DataFoods"  element={<TableView/>}/>
        
      </Routes>
    
    </BodyProvider>
    </BrowserRouter>
 
     
   
   
  )
}

export default App
