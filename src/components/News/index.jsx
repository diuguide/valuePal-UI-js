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
    fontSize: "20px",
    fontWeight: 800
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
            <tbody>
              <tr>
                <th></th>
                <th></th>
              </tr>  
              {newsData.data.data.main.stream.map((el, index) => {
                
                if (el.content.thumbnail) {
                  console.log(index)
                  return (
                    <tr key={index}>
                       <td style={styleLink}>{el.content.title}{el.content.clickThroughUrl && <div><a target="_blank" href={el.content.clickThroughUrl.url}>Read more...</a></div>}</td>
                       <td></td>
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
