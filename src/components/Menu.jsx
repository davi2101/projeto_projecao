import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div>

      <Navbar variant="dark" className="mb-3 menu" >
        <Container>
          <Navbar.Brand href="#home"><img
        src="https://sistemajk.nutrificabrasilia.com.br/images/logo-login@2x.png"
        width="200"
        height="45"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/paciente">PACIENTES  •  </Link>
            <Link className="nav-link" to="/insumo">INSUMOS  •  </Link>
            <Link className="nav-link" to="/financeiro">  FINANCEIRO  •  </Link>
            <Link className="nav-link" to="/hospital">  HOSPITAL </Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default Menu