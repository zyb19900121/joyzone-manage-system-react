import { queryTypeList, removeType } from "@/services/config";

export default {
  namespace: "type",

  state: {
    data: {
      list: []
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTypeList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },

    *remove({ payload, callback }, { call, put }) {
      yield call(removeType, payload.id);

      let response = yield call(queryTypeList, {
        ...payload.pagination
      });

      if (!response.list.length && payload.pagination.current > 1) {
        payload.pagination.current--;
        response = yield call(queryTypeList, {
          ...payload.pagination
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
