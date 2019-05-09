import {
  queryGameList,
  getGameDetail,
  addGame,
  updateGame,
  uploadGameCover,
  removeGame
} from "@/services/game";

export default {
  namespace: "gallery",

  state: {
    galleryList: [],
    gameDetail: {}
  },

  effects: {
    *getGameList({ payload }, { call, put }) {
      const response = yield call(queryGameList, payload);
      yield put({
        type: "gameList",
        payload: response
      });
    }
  },

  reducers: {
    gameList(state, action) {
      return {
        ...state,
        gameList: action.payload
      };
    }
  }
};
