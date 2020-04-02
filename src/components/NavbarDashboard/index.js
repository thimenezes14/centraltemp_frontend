import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { BotaoMenu } from './style';
import { FaSignOutAlt, FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa';

import {logout} from '../../services/auth';

export default function NavbarDashboard(props) {

    const sair = () => {
        logout();
        props.history.push('/perfis');
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Brand><span><strong><FaChalkboardTeacher size={30}/> DASHBOARD</strong></span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <BotaoMenu variant="primary" onClick={() => window.location.reload()}><FaUserAlt /> {props.perfil.nome} </BotaoMenu>
                        <BotaoMenu variant="danger" onClick={sair}  ><FaSignOutAlt /> SAIR</BotaoMenu>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}