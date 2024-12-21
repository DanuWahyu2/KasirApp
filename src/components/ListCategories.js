import React, { Component } from "react";
import { Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link dari React Router
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

// Fungsi untuk menampilkan icon sesuai kategori
const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };

    this._isMounted = false; // Flag untuk memeriksa apakah komponen masih terpasang
  }

  componentDidMount() {
    this._isMounted = true; // Menandakan komponen sudah terpasang

    // Mengambil data kategori dari API
    axios
      .get(API_URL + "categories")
      .then((res) => {
        if (this._isMounted) {
          const categories = res.data;
          this.setState({ categories });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false; // Menandakan komponen akan dibongkar
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;

    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)} // Fungsi untuk memilih kategori
                className={categoriYangDipilih === category.nama && "category-aktif"}
                style={{ cursor: 'pointer' }}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>

        {/* Tombol Tambah Produk menggunakan Link */}
        <Link to="/tambah-produk">
          <Button variant="primary" className="mt-3">
            Tambah Produk
          </Button>
        </Link>

        {/* Tambahkan Tombol Delete Produk */}
        <Link to="/delete-produk">
          <Button variant="danger" className="mt-2">
            Delete Produk
          </Button>
        </Link>
      </Col>
    );
  }
}
