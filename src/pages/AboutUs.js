import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaClipboardList, FaCashRegister, FaChartLine } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Tentang Kami</h1>
          <p>Selamat datang di Kasir App, sistem kasir yang paling mudah dan efisien untuk bisnis Anda!</p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-lg">
            <Card.Body>
              <FaClipboardList size={50} color="#007bff" />
              <Card.Title className="mt-3">Mudah & Mudah Digunakan</Card.Title>
              <Card.Text>
                Kasir App memungkinkan Anda untuk mengelola penjualan dengan cepat dan efisien hanya dengan beberapa klik.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-lg">
            <Card.Body>
              <FaCashRegister size={50} color="#28a745" />
              <Card.Title className="mt-3">Fitur Lengkap</Card.Title>
              <Card.Text>
                Mulai dari melacak inventaris hingga menghasilkan laporan penjualan, Kasir App mencakup semua kebutuhan bisnis Anda.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-lg">
            <Card.Body>
              <FaChartLine size={50} color="#dc3545" />
              <Card.Title className="mt-3">Analisis Kuat</Card.Title>
              <Card.Text>
                Dapatkan wawasan tentang kinerja penjualan Anda dengan analisis dan laporan kuat dari Kasir App.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h2>Visi Kami</h2>
          <p>Kami bertujuan untuk memberikan solusi yang kuat namun sederhana bagi bisnis kecil dan menengah untuk menyederhanakan penjualan dan operasional mereka.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
