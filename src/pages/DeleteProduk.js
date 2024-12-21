import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button, Container, Alert } from 'react-bootstrap'; // Import komponen dari React-Bootstrap

const DeleteProduk = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mengambil data produk dari API
  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => {
        console.log(res.data);  // Cek data produk yang diterima
        setProducts(res.data);
      })
      .catch((error) => {
        setError('Terjadi kesalahan saat mengambil data produk.');
        console.error('Error:', error);
      });
  }, []);

  // Fungsi untuk menghapus produk berdasarkan ID
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          // Jika penghapusan berhasil, perbarui state untuk menghapus produk dari UI
          setProducts(products.filter((product) => product.id !== id));
          setSuccess('Produk berhasil dihapus');
          setTimeout(() => {
            setSuccess('');
          }, 3000); 
        } else {
          setError('Gagal menghapus produk');
        }
      })
      .catch((error) => {
        setError('Terjadi kesalahan saat menghapus produk.');
        console.error('Error saat menghapus produk:', error);
      });
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Hapus Produk</h1>

      {/* Menampilkan pesan error atau sukses */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {products.length === 0 ? (
          <Col xs={12}>
            <Alert variant="info">Tidak ada produk untuk dihapus.</Alert>
          </Col>
        ) : (
          products.map((product) => (
            <Col xs={12} md={4} key={product.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.nama}</Card.Title>
                  <Card.Text>Harga: Rp {product.harga}</Card.Text>
                  <Card.Text>Kategori: {product.category.nama}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                    block
                  >
                    Hapus
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default DeleteProduk;
