import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchGetArtistInfo } from "../../store/actions/listFMAction/listFMActions";
import { Row, Col, Card, Typography } from "antd";
import "antd/dist/antd.css";
import { baseUrl, baseImg } from "../../axios-api";

const { Title } = Typography;
const { Meta } = Card;

const ArtistInfo = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.listFM.artistInfoAlbum);
  useEffect(() => {
    dispatch(fetchGetArtistInfo(id.id));
  }, [dispatch]);
  return (
    <>
      {albums.length === 0 ? (
        <div>no data</div>
      ) : (
        <>
          <Title mark level={2}>
            {albums[0].artist.name}
          </Title>
          <Row gutter={16}>
            {albums.map((element, index) => (
              <Col span={6} key={index}>
                <Card
                  className="gutter-row"
                  hoverable
                  style={{ maxWidth: "200px", margin: "15px" }}
                  cover={
                    <img
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = baseImg;
                      }}
                      alt="albums"
                      src={baseUrl + "/uploads/" + element.photo}
                    />
                  }
                >
                  <Meta
                    title={element.name}
                    description={"год выпуска : " + element.yearIssue}
                  />
                  <NavLink to={"/tracks/" + element._id}>Show more</NavLink>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ArtistInfo;
