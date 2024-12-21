import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { image } = this.state;

    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Misalnya, untuk Cloudinary

    axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
      .then(response => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
    );
  }
}

export default AddProduct;
