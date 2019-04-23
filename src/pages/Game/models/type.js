import { queryTypeList } from "@/services/config";

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
