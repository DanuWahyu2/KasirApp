import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kode: '',
      nama: '',
      harga: '',
      category: '',
      gambar: null, // Gambar yang dipilih
      categories: [], // Daftar kategori produk
      error: '',
      success: '',
    };
  }

  componentDidMount() {
    // Ambil data kategori dari backend (JSON Server)
    axios
      .get('http://localhost:5000/categories')
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        this.setState({ error: 'Gagal mengambil data kategori.' });
        console.error(error);
      });
  }

  // Handle perubahan input
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Handle perubahan gambar yang dipilih
  handleImageChange = (event) => {
    this.setState({ gambar: event.target.files[0] });
  };

  // Handle submit form untuk menambah produk
  handleSubmit = (event) => {
    event.preventDefault();

    const { kode, nama, harga, category, gambar, categories } = this.state;

    // Validasi form
    if (!kode || !nama || !harga || !category || !gambar) {
      this.setState({ error: 'Semua kolom harus diisi.' });
      return;
    }

    // Membuat FormData untuk meng-upload gambar ke Cloudinary
    const formData = new FormData();
    formData.append('file', gambar); // Menambahkan file gambar
    formData.append('upload_preset', 'your_upload_preset'); // Preset upload dari Cloudinary

    // Mengirim gambar ke Cloudinary
    axios
      .post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
      .then((response) => {
        const imageUrl = response.data.secure_url; // Mendapatkan URL gambar yang di-upload

        // Menambahkan data produk ke JSON Server
        const selectedCategory = categories.find((cat) => parseInt(cat.id, 10) === parseInt(category, 10));
        const newProduct = {
          kode,
          nama,
          harga: parseInt(harga, 10),
          category: {
            id: parseInt(category, 10),
            nama: selectedCategory?.nama || '',
          },
          gambar: imageUrl, // URL gambar yang sudah di-upload
        };

        // Kirim data produk ke JSON Server
        axios
          .post('http://localhost:5000/products', newProduct)
          .then((response) => {
            this.setState({
              success: 'Produk berhasil ditambahkan!',
              error: '', // Hapus pesan error jika berhasil
            });
            console.log('Produk berhasil ditambahkan:', response.data);
          })
          .catch((error) => {
            this.setState({ error: 'Gagal menambahkan produk.' });
            console.error('Gagal menambahkan produk:', error);
          });
      })
      .catch((error) => {
        this.setState({ error: 'Gagal meng-upload gambar.' });
        console.error('Error uploading image:', error);
      });
  };

  render() {
    const { kode, nama, harga, category, categories, error, success } = this.state;

    return (
      <div className="container">
        <h2 className="text-center">Tambah Produk Baru</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Kode Produk</label>
            <input
              type="text"
              name="kode"
              className="form-control"
              placeholder="Masukkan kode produk"
              value={kode}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Nama Produk</label>
            <input
              type="text"
              name="nama"
              className="form-control"
              placeholder="Masukkan nama produk"
              value={nama}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Harga Produk</label>
            <input
              type="number"
              name="harga"
              className="form-control"
              placeholder="Masukkan harga produk"
              value={harga}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Kategori Produk</label>
            <select
              name="category"
              className="form-control"
              value={category}
              onChange={this.handleInputChange}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload Gambar</label>
            <input
              type="file"
              className="form-control"
              onChange={this.handleImageChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
