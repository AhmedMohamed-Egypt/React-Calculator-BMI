import { useEffect } from "react"
import { NavLink } from "react-router-dom"



function Header() {
    useEffect(()=>{
        document.body.classList.add('home')
    },[])
    return (
         <div className="flex justify-between items-center headerComponent">
        <a href="#" className="headerComponent__logo">
            <img className="rounded-full" src="./logo-removebg-preview.png" alt="" />
        </a>
        <ul className="flex justify-between items-center">
            <li>
            <NavLink to='/' className="text-xl font-medium text-white" >Home</NavLink>
            </li>
           <li className="ml-[25px]">
           <NavLink to="/StartPage" className="text-xl font-medium text-white" >Macro Calculator</NavLink>
           </li>
           
    
        </ul>
         </div>
    )
}

export default Header
