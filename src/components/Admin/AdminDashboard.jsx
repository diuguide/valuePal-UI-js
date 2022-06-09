import { Row, Col } from "react-bootstrap";
import { adminState } from "../../slice/data/adminData";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const AdminDashboard = () => {
  const admin = useSelector(adminState);

  return <Row>{admin.dataLoaded ? <Col>test loaded</Col> : <Loader />}</Row>;
};

export default AdminDashboard;
