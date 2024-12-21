import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Home, Sukses } from './pages';
import TambahProduk from './pages/TambahProduk'; 
import AboutUs from './pages/AboutUs';
import DeleteProduk from './pages/DeleteProduk'; // Halaman Delete

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sukses" exact component={Sukses} />
            <Route path="/tambah-produk" exact component={TambahProduk} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/delete-produk" exact component={DeleteProduk} /> {/* Rute baru */}
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}
