import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTrackHistory } from "../../store/actions/listFMAction/listFMActions";
import { push } from "connected-react-router";
import { List, Card } from "antd";
const TrackHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userLogin);
  useEffect(() => {
    user
      ? dispatch(fetchGetTrackHistory(user.token))
      : dispatch(push("/login"));
  }, [dispatch]);
  const trackHistory = useSelector((state) => state.listFM.trackHistory);
  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
        dataSource={trackHistory}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.trackID.album.artist.name}>
              <p>Name: {item.trackID.name}</p>
              <p>Date:{item.datetime}</p>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default TrackHistory;
