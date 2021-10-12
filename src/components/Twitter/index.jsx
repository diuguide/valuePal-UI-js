import { Row, Col } from "react-bootstrap";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterFeed = ({twitterHandle}) => {
    return(
        <Row>
            <Col>
            <TwitterTimelineEmbed 
            sourceType="profile"
            screenName={twitterHandle}
            options={{height: 400, width: 300}}
            />
            </Col>
        </Row>

    )
}

export default TwitterFeed;