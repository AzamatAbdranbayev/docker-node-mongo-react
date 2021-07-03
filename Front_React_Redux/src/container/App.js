import React from "react";
import Layout from "../components/Layout/Layout";
import ListFM from "./ListFM/ListFM";
import { Route, Switch } from "react-router-dom";
import ArtistInfo from "./ArtistInfo/ArtistInfo";
import TracksInfo from "./TracksInfo/TracksInfo";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import Register from "./Register/Register";
import Login from "./Login/Login";
import TrackHistory from "./TrackHistory/TrackHistory";
const App = () => {
  const errorType = useSelector((state) => state.listFM.errors);
  const error = () => {
    Modal.error({ title: "ERROR", content: errorType.message });
  };
  return (
    <>
      <Layout>
        <Switch>
          {errorType ? error() : null}
          <Route path="/" exact component={ListFM} />
          <Route path="/artist/:id" component={ArtistInfo} />
          <Route path="/tracks/:id" component={TracksInfo} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/trackHistory" component={TrackHistory} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
