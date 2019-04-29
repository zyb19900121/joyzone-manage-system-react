import {
  queryGameList,
  getGameDetail,
  addGame,
  updateGame,
  uploadGameCover,
  removeGame
} from "@/services/game";

export default {
  namespace: "game",

  state: {
    gameList: [],
    gameDetail: {}
  },

  effects: {
    *getGameList({ payload }, { call, put }) {
      const response = yield call(queryGameList, payload);
      yield put({
        type: "gameList",
        payload: response
      });
    },
    *getGameDetail({ payload }, { call, put }) {
      const response = yield call(getGameDetail, payload.id);
      yield put({
        type: "gameDetail",
        payload: response
      });
    },

    *clearGameDetail({ payload }, { call, put }) {
      yield put({
        type: "gameDetail",
        payload
      });
    },

    *remove({ payload, callback }, { call, put }) {
      yield call(removeGame, payload.id);

      let response = yield call(queryGameList, {
        ...payload.pagination
      });

      if (!response.list.length && payload.pagination.current > 1) {
        payload.pagination.current--;
        response = yield call(queryGameList, {
          ...payload.pagination
        });
      }
      yield put({
        type: "gameList",
        payload: response
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      yield call(addGame, payload);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      yield call(updateGame, payload.game);
      if (callback) callback();
    },
    *upload({ payload, callback }, { call, put }) {
      let response = yield call(uploadGameCover, payload);
      if (callback) callback(response);
    }
  },

  reducers: {
    gameList(state, action) {
      return {
        ...state,
        gameList: action.payload
      };
    },

    gameDetail(state, action) {
      return {
        ...state,
        gameDetail: action.payload
      };
    }
  }
};
