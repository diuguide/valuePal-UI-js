import { Button, Modal, Row, Col } from "react-bootstrap";
import TickerResults from "../TickerSearch/TickerResults";
import PurchasePanelWrapper from "./PurchasePanelWrapper";

const OrderModal = ({ show, setShow, data, walletData }) => {
  const handleClose = () => setShow(false);
  const rowStyle = {
    modal: {},
  };
  return (
    <>
      <Modal
        style={rowStyle.modal}
        dialogClassName="modal-200w"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <TickerResults />
            </Col>
          </Row>
          <Row>
            <PurchasePanelWrapper />
          </Row>
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
