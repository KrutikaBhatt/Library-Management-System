import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useState } from "react";

const NavigationBar =()=> {
    return(
    <Navbar collapaseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Library Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
                <Nav>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/members">Members</Nav.Link>
                    <Nav.Link href="/transactions">Transactions</Nav.Link>
                    <Nav.Link href="/reports">Reports</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>

    </Navbar>
    );
}

export default NavigationBar;