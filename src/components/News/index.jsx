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

  return (
    <Row>
      {newsData.dataLoaded && (
        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>Get The Latest News from YahooFinance!</th>
                <th>Date of Story</th>
              </tr>
            </thead>
            <tbody>
              {newsData.data.data.main.stream.map((el, index) => {
                if (el.content.clickThroughUrl) {
                  return (
                    <tr>
                      <a
                        target="_blank"
                        style={styleLink}
                        href={
                          el.content.clickThroughUrl
                            ? el.content.clickThroughUrl.url
                            : undefined
                        }
                      >
                        <td>{el.content.title}</td>
                      </a>
                      <td>{el.content.pubDate}</td>
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
