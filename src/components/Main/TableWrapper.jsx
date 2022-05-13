import { Row, Col } from "react-bootstrap";
import InnerNav from "../Nav/InnerNav";
import { useState } from "react";
import HoldingsTable from "../Wallet/HoldingsTable";
import OrdersTable from "../Wallet/OrdersTable";
import Wallet from "../Wallet/Wallet";

const TableWrapper = () => {
  const [tabSelect, setTabSelect] = useState("holding");

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
        <Col>
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
