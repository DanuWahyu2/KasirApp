import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { FaCoffee, FaHome, FaInfoCircle, FaPhoneAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="font-weight-bold" style={{ marginLeft: '-66px' }}>
          <FaCoffee className="mr-2" /> <strong>kasir</strong> app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="mr-2" />
              Home
            </Nav.Link>
            
            {/* About Us Link using Link from react-router-dom */}
            <Nav.Link as={Link} to="/about-us">
              <FaInfoCircle className="mr-2" />
              About Us
            </Nav.Link>

            {/* Dropdown for Contact */}
            <NavDropdown title={<><FaPhoneAlt className="mr-2" />Contact</>} id="basic-nav-dropdown">
              {/* WhatsApp link in Contact dropdown */}
              <NavDropdown.Item href="https://wa.me/6281234567890" target="_blank">
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </NavDropdown.Item>

              {/* Instagram link in Contact dropdown */}
              <NavDropdown.Item href="https://www.instagram.com/pelangicafe" target="_blank">
                <FaInstagram className="mr-2" />
                Instagram
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
