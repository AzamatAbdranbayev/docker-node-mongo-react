import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetRadioList } from "../../store/actions/listFMAction/listFMActions";
import { Row, Col, Card } from "antd";
import { baseUrl, baseImg } from "../../axios-api";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";
const { Meta } = Card;
const ListFM = () => {
  const dispatch = useDispatch();
  const listFm = useSelector((state) => state.listFM.listFm);
  useEffect(() => {
    dispatch(fetchGetRadioList());
  }, [dispatch]);
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {listFm.map((element, index) => (
          <Col span={6} key={index} className="gutter-row">
            <Card
              hoverable
              style={{ maxWidth: "200px", margin: "15px" }}
              cover={
                <img
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = baseImg;
                  }}
                  alt="artists"
                  src={baseUrl + "/uploads/" + element.photo}
                />
              }
            >
              <Meta title={element.name} description={element.information} />
              <NavLink to={"/artist/" + element._id}>Show more...</NavLink>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListFM;
