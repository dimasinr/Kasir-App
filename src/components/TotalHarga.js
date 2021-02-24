import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils'
import { API_URL } from '../utils/contants';

export default class TotalHarga extends Component {
    submitTotalBayar = (totalHarga) => {
        const pesanan = {
            total_bayar: totalHarga,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    };

    render() {
        const totalHarga = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
          }, 0);

        return (
            <>
            {/* Website */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total Harga : <strong className="float-right mr-2">Rp. {numberWithCommas(totalHarga)}</strong> </h5>
                    <Button variant="primary" block className="mb-4" onClick={ () => this.submitTotalBayar(totalHarga)}>
                        <strong>Pesan</strong>
                    </Button>
                    </Col>
                </Row>

            </div>

            {/* Mobile-device */}

            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total Harga : <strong className="float-right mr-2">Rp. {numberWithCommas(totalHarga)}</strong> </h5>
                    <Button variant="primary" block className="mb-4" onClick={ () => this.submitTotalBayar(totalHarga)}>
                        <strong>Pesan</strong>
                    </Button>
                    </Col>
                </Row>

            </div>

            </>
        );
    }
}
