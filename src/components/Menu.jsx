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
        <Link to="/insumo">
          Insumo
        </Link>
        <Link to="/paciente">
          Paciente
        </Link>
        <Link to="/financeiro">
          Financeiro
        </Link>
        <Link to="/hospital">
          Hospital
        </Link>
      </nav>
    </header>
  )
}