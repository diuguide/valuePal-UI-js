import { Button, Modal, Row, Col } from "react-bootstrap";
import MiniTicker from "../TickerSearch/MiniTicker";
import TickerResults from "../TickerSearch/TickerResults";
import PurchasePanelWrapper from "./PurchasePanelWrapper";

const OrderModal = ({ show, setShow, data, index, walletData }) => {
  const handleClose = () => setShow(false);
  const rowStyle = {
    modal: {width:"80%"},
  };
  return (
    <>
      <Modal
        style={rowStyle.modal}
        dialogClassName="modal-90w"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <MiniTicker index={index} />
            </Col>
          </Row>
          <Row></Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderModal;
