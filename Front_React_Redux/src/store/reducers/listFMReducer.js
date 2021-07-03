import {
  ERROR_FETCH,
  GET_LIST_FM_RADIO_LIST,
  GET_ARTIST_INFO_ALBUM,
  GET_TRACKS_INFO_ALBUM,
  GET_TRACK_HISTORY,
  TRACK_HISTORY_FAIL,
} from "../actions/listFMAction/listFMActionTypes";

const initialState = {
  listFm: [],
  errors: null,
  artistInfoAlbum: [],
  tracks: [],
  trackHistory: [],
  errorsTrackHistory: null,
};

const listFmReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_FM_RADIO_LIST:
      return { ...state, listFm: action.value };
    case ERROR_FETCH:
      return { ...state, errors: action.value };
    case GET_ARTIST_INFO_ALBUM:
      return { ...state, artistInfoAlbum: action.value };
    case GET_TRACKS_INFO_ALBUM:
      return { ...state, tracks: action.value };
    case GET_TRACK_HISTORY:
      return { ...state, trackHistory: action.value };
    case TRACK_HISTORY_FAIL:
      return { ...state, errorsTrackHistory: action.value };
    default:
      return state;
  }
};

export default listFmReducer;
