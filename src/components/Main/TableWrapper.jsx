import { Row, Col } from "react-bootstrap";
import InnerNav from "../Nav/InnerNav";
import { useState } from "react";
import HoldingsTable from "../Wallet/HoldingsTable";
import OrdersTable from "../Wallet/OrdersTable";
import Wallet from "../Wallet/Wallet";
import { useSelector } from "react-redux";
import { walletState } from "../../slice/wallet/walletSlice";

const TableWrapper = () => {
  const [tabSelect, setTabSelect] = useState("holding");
  const wallet = useSelector(walletState);
  const renderList = () => {
    switch (tabSelect) {
      case "holding":
        return <HoldingsTable />;
      case "order":
        return <OrdersTable />;
      case "analytics":
        break;
      default:
        return <HoldingsTable />;
    }
  };



  return (
    <>
      <Row>
        <Col>
          <InnerNav page={setTabSelect} />
        </Col>
        <Col className="d-block">
           <Wallet />
        </Col>
      </Row>
      <Row>
        <Col>{renderList()}</Col>
      </Row>
    </>
  );
};

export default TableWrapper;
