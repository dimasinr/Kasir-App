import React from 'react';
import {Nav, Navbar,Container} from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/"><strong className="text-center fn">Kasir App</strong></Navbar.Brand>
        </Container>
    </Navbar>
    );
};

export default NavbarComponent;