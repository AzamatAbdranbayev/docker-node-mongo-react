import {
  ERROR_FETCH,
  GET_ARTIST_INFO_ALBUM,
  GET_LIST_FM_RADIO_LIST,
  GET_TRACKS_INFO_ALBUM,
  GET_TRACK_HISTORY,
  TRACK_HISTORY_FAIL,
} from "./listFMActionTypes";
import axios from "../../../axios-api";

export const getListFmRadioList = (value) => ({
  type: GET_LIST_FM_RADIO_LIST,
  value,
});
export const errorFetch = (value) => ({ type: ERROR_FETCH, value });
export const getArtistInfoAlbum = (value) => ({
  type: GET_ARTIST_INFO_ALBUM,
  value,
});

export const getTracksInfoAlbum = (value) => ({
  type: GET_TRACKS_INFO_ALBUM,
  value,
});

export const fetchGetRadioList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/artists");
      dispatch(getListFmRadioList(response.data));
    } catch (e) {
      dispatch(errorFetch(e));
    }
  };
};
export const fetchGetArtistInfo = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/albums?artist=" + id);
      dispatch(getArtistInfoAlbum(response.data));
    } catch (e) {
      dispatch(errorFetch(e));
    }
  };
};
export const fetchGetTracksInfo = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/tracks?album=" + id);
      dispatch(getTracksInfoAlbum(response.data));
    } catch (e) {
      dispatch(errorFetch(e));
    }
  };
};

export const getTrackHistory = (value) => ({
  type: GET_TRACK_HISTORY,
  value,
});
export const TrackHistoryFail = (value) => ({
  type: TRACK_HISTORY_FAIL,
  value,
});
export const fetchPostTrackHistory = (trackId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/track_history",
        { trackID: trackId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (e) {
      dispatch(TrackHistoryFail(e));
    }
  };
};
export const fetchGetTrackHistory = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/track_history", {
        headers: { Authorization: token },
      });
      dispatch(getTrackHistory(response.data));
    } catch (e) {
      dispatch(TrackHistoryFail(e));
    }
  };
};
