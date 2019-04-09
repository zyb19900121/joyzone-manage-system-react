import { queryCommentList, removeComment } from "@/services/api";

export default {
  namespace: "comment",

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCommentList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeComment, payload.id);

      let response = yield call(queryCommentList, {
        ...payload.pagination,
        startDate: payload.startDate,
        endDate: payload.endDate,
        gameId: payload.gameId
      });

      if (!response.list.length && payload.pagination.current > 1) {
        payload.pagination.current--;
        response = yield call(queryCommentList, {
          ...payload.pagination,
          startDate: payload.startDate,
          endDate: payload.endDate,
          gameId: payload.gameId
        });
      }
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
