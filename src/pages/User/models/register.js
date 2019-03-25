import { getCaptcha, register, checkExist } from "@/services/api";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";

export default {
  namespace: "register",

  state: {
    status: undefined
  },

  effects: {
    *getCaptcha({ payload }, { call, put }) {
      // const response = yield call(fakeRegister, payload);
      const response = yield call(getCaptcha, payload);
      // yield put({
      //   type: 'registerHandle',
      //   payload: response,
      // });
    },
    *checkExist({ payload, callback }, { call, put }) {
      const response = yield call(checkExist, payload);
      if (callback) callback(response);
      yield put({
        type: "checkExistHandle",
        payload: response
      });
    },
    *submit({ payload }, { call, put }) {
      // const response = yield call(fakeRegister, payload);
      const response = yield call(register, payload);
      yield put({
        type: "registerHandle",
        payload: response
      });
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority("user");
      // reloadAuthorized();
      return {
        ...state,
        submitMsg: payload.msg,
        submit: payload.code == "200" ? "ok" : "error",
        status: payload.code == "200" ? "ok" : "error"
      };
    },
    checkExistHandle(state, { payload }) {
      return {
        ...state,
        isExist: payload.isExist
      };
    }
  }
};
