import React, { Component } from 'react';
import {Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/contants';

class Sukses extends Component {

    componentDidMount() {
        axios
        .get(API_URL+"keranjangs")
          .then(res => {
          const keranjangs = res.data;
          keranjangs.map(function(item){
              return axios
              .delete(API_URL+"keranjangs/"+item.id)
              .then((res) => console.log(res))
              .catch((error) => console.log(error))
          })
        })
        .catch(error => {
          console.log("Error", error);
        })
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <Image className="resp" src="../assets/images/confirmed.svg" />
                <h4><strong>Sukses Memesan</strong></h4>
                <div className="text-secondary mb-3">
                <h5> Terimakasih Telah Memesan</h5>
                <span className="mt-2">Silahkan Klik Tombol dibawah ini Untuk Kembali</span>
                </div>
            <Button variant="primary" as={Link} to="/">
                Kembali
            </Button>
            
            </div>
        );
    }
}

export default Sukses;