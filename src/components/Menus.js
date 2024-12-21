import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  // Fallback untuk setiap property menu yang bisa jadi undefined
  const categoryName = menu.category?.nama?.toLowerCase() || "default-category";
  const menuName = menu.nama || "Nama Tidak Tersedia";
  const menuCode = menu.kode || "Kode Tidak Tersedia";
  const menuPrice = numberWithCommas(menu.harga || 0); // Menggunakan 0 sebagai harga fallback

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={`assets/images/${categoryName}/${menu.gambar}`} // Path gambar lokal
        />
        <Card.Body>
          <Card.Title>
            {menuName} <strong>({menuCode})</strong>
          </Card.Title>
          <Card.Text>Rp. {menuPrice}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
