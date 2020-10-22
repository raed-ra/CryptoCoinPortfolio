import React, { useState } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from './../utils/API'


function ModalAddCoin(props) {

  const [startDate, setStartDate] = useState(new Date())
  const [currency, setCurrency] = useState()
  const [buyPrice, setBuyPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [coin, setCoin] = useState()
  const [isLoading, setIsLoading] = useState(false);


  function validateForm() {
    return startDate!=="" && currency!=="" && buyPrice!=="" && quantity!=="" && coin!=="";
  }

  async function handleAddSubmit(event) {
    event.preventDefault();
    console.log(startDate)
    let payload={coin,quantity,buyPrice,currency,startDate}
    setIsLoading(true);
 
    try {
      console.log(payload);
      let response = await API.componentAddModal(payload)
      console.log("Posted transaction:" + response)
      props.submitted()
    } catch (e) {
      setIsLoading(false);
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header style={{ backgroundColor: "orange" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new coin to portfolio
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={handleAddSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCoin">
                <Form.Label>Coin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Coin"
                  value={coin}
                  onChange={e => setCoin(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Buy Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Buy Price"
                  value={buyPrice}
                  onChange={e => setBuyPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Currency of purchase value"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
              </Form.Group >
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Bought on</Form.Label>

                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </Form.Group>
            </Form.Row>

            <Button
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              ADD TO PORTFOLIO
        </Button>

            {/* <Button variant="primary" type="submit">
              
            </Button> */}
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "orange" }}>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddCoin




