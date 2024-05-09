import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({title}) => {
  return (
    <div className="h-[60px] bg-blue-100 border-b-2 border-gray-300 grid b sticky top-0 " style={{zIndex:"1"}}>
    <div className="flex justify-around items-center">
      <div>
        <h1 className="text-md md:text-xl ml-2 text-blue-400" style={{fontWeight:"600"}}>{title}</h1>
      </div>
      <div className="flex justify-evenly items-center font-semibold">
      
                <Link to='/' className="block p-2 hover:bg-gray-100">
                Home
                </Link>
                <Link to={'/Create'} className="block p-2 hover:bg-gray-100">
                 Form
                </Link>
              </div>
      
    </div>
  </div>
  )
}

export default Navbar