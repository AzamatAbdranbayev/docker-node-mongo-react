import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  fetchGetTracksInfo,
  fetchPostTrackHistory,
} from "../../store/actions/listFMAction/listFMActions";
import { Row, Col, Card, Typography, Button } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;
const { Meta } = Card;

const TracksInfo = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userLogin);
  const tracks = useSelector((state) => state.listFM.tracks);
  useEffect(() => {
    dispatch(fetchGetTracksInfo(id.id));
  }, [dispatch]);
  return (
    <>
      {user ? (
        <>
          {tracks.length === 0 ? (
            <div>no data</div>
          ) : (
            <>
              <Title mark level={2}>
                ARTIST : {tracks[0].album.artist.name}
              </Title>
              <Title mark level={3}>
                ALBOM : {tracks[0].album.name}
              </Title>
              <Row gutter={16}>
                {tracks.map((element, index) => (
                  <Col className="gutter-row" span={6} key={index}>
                    <Card
                      hoverable
                      style={{ maxWidth: "200px", margin: "15px" }}
                    >
                      <Title mark level={5}>
                        № : {element.number}
                      </Title>
                      <Meta
                        title={element.name}
                        description={"длительность : " + element.duration}
                      />
                    </Card>
                    <Button
                      onClick={() =>
                        dispatch(fetchPostTrackHistory(element._id, user.token))
                      }
                      type="primary"
                    >
                      Add to History
                    </Button>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      ) : (
        <NavLink to="/login">You should to login in</NavLink>
      )}
    </>
  );
};

export default TracksInfo;
