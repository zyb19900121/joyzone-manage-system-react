import { queryCompanyList, removeCompany, addCompany } from "@/services/config";

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
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeCompany, payload.id);

      let response = yield call(queryCompanyList, {
        ...payload.pagination
      });

      if (!response.list.length && payload.pagination.current > 1) {
        payload.pagination.current--;
        response = yield call(queryCompanyList, {
          ...payload.pagination
        });
      }
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
			yield call(addCompany, payload.company);
			
      let response = yield call(queryCompanyList, {
        ...payload.pagination
      });
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
