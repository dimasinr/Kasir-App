import { faMinus,faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Form,Modal,Button} from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const ModalKeranjang = ({
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah, 
    keterangan, 
    tambah, 
    kurang, 
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {
    if(keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama} &nbsp;
                        <h5>
                            <strong>
                                Rp. {numberWithCommas(keranjangDetail.product.harga)}
                            </strong>
                        </h5>
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Total Harga : </Form.Label>
            <p>
                <strong>
                    Rp. {numberWithCommas(totalHarga)}
                </strong>
            </p>
            </Form.Group>
           
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>jumlah : </Form.Label>
                <br/>
                <Button variant="primary" size="sm" onClick={ ()=> kurang() }>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
                 &nbsp;
                <strong>{jumlah}</strong>
                 &nbsp;
                <Button variant="primary" size="sm" onClick={ ()=> tambah() }>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Keterangan :</Form.Label>
                <Form.Control as="textarea" rows={3}
                 name="Keterangan" 
                 placeholder="Contoh : Pedas, Nasi Setengah"
                 value={keterangan}
                 onChange={(event) => changeHandler(event)}
                 />
            </Form.Group>
            <Button variant="primary" type="submit">
                Simpan
            </Button>
            </Form>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => hapusPesanan(keranjangDetail.id)}>
                      <FontAwesomeIcon icon={faTrash} />   Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
            );
    }else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Telah Habis
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>Kosong!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                     Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            );
    }
}

export default ModalKeranjang;