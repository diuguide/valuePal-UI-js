import { Button, Modal } from "react-bootstrap";

const OrderModal = ({ show, setShow, data, walletData }) => {
  const handleClose = () => setShow(false);
  console.log("inner wallet data: ", walletData.holding.holdings[data]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data != null
            ? walletData.holding.holdings[data].ticker
            : "Loading..."}
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
