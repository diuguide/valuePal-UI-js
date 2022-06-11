import { Row, Col } from "react-bootstrap";
import { adminState } from "../../slice/data/adminData";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const UserTable = () => {
  const admin = useSelector(adminState);

  return (
    <Row>
      {admin.dataLoaded ? (
        <Col>
          <Row>
            <Col>
              <Table hover>
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    backgroundColor: "white",
                  }}
                >
                  <tr>
                    <th>Ticker</th>
                    <th>Quantity</th>
                    <th>Current Price</th>
                    <th>Purchase Price (Avg)</th>
                    <th></th>
                    <th>Change</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      ) : (
        <Loader />
      )}
    </Row>
  );
};

export default UserTable;
