import {Col, Row, Container} from 'react-bootstrap';
import {Hasil, ListCategory, Menus} from '../components';
import React, { Component } from 'react';
import {API_URL} from '../utils/contants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state ={
      menus: [],
      categoriYangDipilih: 'Makanan',
      keranjangs: [],
    }
  }

  componentDidMount() {
    axios
    .get(API_URL+"products?category.nama"+this.state.categoriYangDipilih)
      .then(res => {
        console.log("Response : ", res);
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log("Error", error);
    })

    this.getListKeranjang();

  }

  // componentDidUpdate(prevState){
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //     axios
  //   .get(API_URL+"keranjangs")
  //     .then(res => {
  //     const keranjangs = res.data;
  //     this.setState({ keranjangs });
  //   })
  //   .catch(error => {
  //     console.log("Error", error);
  //   })

  //   }
  // }

  getListKeranjang = () => {

    axios
    .get(API_URL+"keranjangs")
      .then(res => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    })
    .catch(error => {
      console.log("Error", error);
    })


  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: []
    })

    axios
    .get(API_URL+"products?category.nama="+value)
      .then(res => {
        console.log("Response : ", res);
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log("Error", error);
    })

  }

  masukKeranjang = (value) => {

    axios
    .get(API_URL+"keranjangs?product.id="+value.id)
      .then(res => {
       if(res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        }
    
        axios
        .post(API_URL+"keranjangs", keranjang)
          .then(res => {
            this.getListKeranjang();
            swal({
              title: keranjang.product.nama,
              text: "Sukses Masuk kedalam Keranjang ",
              icon: "success",
              button: false,
              timer: 1500,
            });
        })
        .catch(error => {
          console.log("Error", error);
        });
       }else{
        const keranjang = {
          jumlah: res.data[0].jumlah+1,
          total_harga: res.data[0].total_harga+value.harga,
          product: value,
        };
        axios
        .put(API_URL+"keranjangs/"+res.data[0].id, keranjang)
          .then(res => {
            swal({
              title: keranjang.product.nama,
              text: "Sukses Masuk kedalam Keranjang ",
              icon: "danger",
              button: false,
              timer: 1500
            });
        })
        .catch(error => {
          console.log("Error", error);
        })

       }
    })
    .catch(error => {
      console.log("Error", error);
    })

    const keranjang = {
      jumlah: 1,
      total_harga: value.harga,
      product: value,
    }

    axios
    .post(API_URL+"keranjangs", keranjang)
      .then(res => {
        swal({
          title: keranjang.product.nama,
          text: "Sukses Masuk kedalam Keranjang ",
          icon: "success",
          button: false,
        });
    })
    .catch(error => {
      console.log("Error", error);
    })
  }

  render() {
    const { menus,categoriYangDipilih,keranjangs } = this.state
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
          <ListCategory changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
          <Col>
            <h5><strong>Daftar Product</strong></h5>
              <hr/>
              <Row className="overflow-auto menu">
                {menus && menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
          </Col>
          <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
        </Row>
        </Container>
      </div>
    );
  }
}

// export default App;