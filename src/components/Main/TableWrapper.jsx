import { Row, Col } from "react-bootstrap";
import InnerNav from "../Nav/InnerNav";
import { useState } from "react";
import HoldingsTable from "../Wallet/HoldingsTable";

const TableWrapper = () => {
  const [tabSelect, setTabSelect] = useState("holding");

  const renderList = () => {
    switch (tabSelect) {
      case "holding":
        return <HoldingsTable />;
      case "order":
        console.log("oorders table render fired");
        break;
      case "analytics":
        console.log("analytics fired!");
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
      </Row>
      <Row>
        <Col>{renderList()}</Col>
      </Row>
    </>
  );
};

export default TableWrapper;
