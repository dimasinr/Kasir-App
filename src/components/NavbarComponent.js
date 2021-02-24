import React from 'react';
import {Nav, Navbar, NavDropdown,Container} from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/"><strong>Kasir App</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavbarComponent;