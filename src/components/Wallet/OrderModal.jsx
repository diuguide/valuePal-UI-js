import { Button, Modal } from "react-bootstrap";

import TickerResults from "../TickerSearch/Results";

const OrderModal = ({ show, setShow, data, walletData }) => {
  const handleClose = () => setShow(false);
  const rowStyle = {
    modal: {
      width: "80%",
      height: "50vh",
    },
  };
  return (
    <>
      <Modal
        style={rowStyle.modal}
        className="w-80"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <TickerResults />
          </div>
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
