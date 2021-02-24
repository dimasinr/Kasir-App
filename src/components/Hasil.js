import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row, } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalHarga from "./TotalHarga";
import { API_URL } from "../utils/contants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
          this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan!",
          text:
            "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
      
    const {keranjangs} = this.props;
    return (
        <Col md={3} mt="2">
            <h5>
                <strong>Hasil Pemesanan</strong>
                </h5>
            <hr/>
            {keranjangs.length !== 0 && (
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush" className="mb-4 bot">
                {keranjangs.map((menuKeranjang) =>(
                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                <Row>
                    <Col>
                        <Badge variant="primary">
                            {menuKeranjang.jumlah}
                        </Badge>
                    </Col>
                    <Col>
                        {menuKeranjang.product.nama}
                        Rp.{numberWithCommas(menuKeranjang.product.harga)}
                    </Col>
                    <Col>
                    <strong className="float-light">Rp.{numberWithCommas(menuKeranjang.total_harga)}</strong>
                    </Col>
                </Row>
            </ListGroup.Item>
                
                ))}

                <ModalKeranjang 
                handleClose={this.handleClose} 
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
                />        
            </ListGroup>
            </Card>
            )}
            <TotalHarga keranjangs={keranjangs} {...this.props} />
        </Col>
    );

  }
}