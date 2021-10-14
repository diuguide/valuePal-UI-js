import { Row, Col, Table } from "react-bootstrap";
import { newsDataState, yahooNewsFeed } from "../../slice/data/newsDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(newsDataState);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(yahooNewsFeed());
  };

  const styleLink = {
    textDecoration: "none",
  };
  const styleContainer = {
      height: "50vh",
      overflow: "scroll"
  }

  return (
    <Row style={styleContainer}>
      {newsData.dataLoaded && (
        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>Get The Latest News from YahooFinance!</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {newsData.data.data.main.stream.map((el, index) => {
                if (el.content.thumbnail) {
                  return (
                    <tr key={index}>
                       <td>{el.content.title}</td>
                       <td><img src={el.content.thumbnail.resolutions[1].url} alt="thumbnail image"></img></td>
                     </tr>
                  );
                }
                return;
              })}
            </tbody>
          </Table>
        </Col>
      )}
    </Row>
  );
};

export default NewsFeed;
