import './menu.css'

import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { auth } from '../firebase/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Menu(){

  async function handleLogout(){
    await signOut(auth)
  }

  return(
    <header className="admin-header">
      <nav className='nav-header'>
        <button onClick={handleLogout}>
          <BiLogOut size={28} color='#DB2629'/>
        </button>
        <Link to="/admin">
          CheckLists
        </Link>
        <Link to="/motoristas">
          Motoristas
        </Link>
        <Link to="/veiculos">
          Veículos
        </Link>
      </nav>
    </header>
  )
}