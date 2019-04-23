import { queryCompanyList } from "@/services/config";

export default {
  namespace: "company",

  state: {
    data: {
      list: []
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCompanyList, payload);
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
