import { queryGalleryList } from "@/services/gallery";

export default {
  namespace: "gallery",

  state: {
    galleryList: [],
    gameDetail: {}
  },

  effects: {
    *getGalleryList({ payload }, { call, put }) {
      const response = yield call(queryGalleryList, payload);
      yield put({
        type: "galleryList",
        payload: response
      });
    }
  },

  reducers: {
    galleryList(state, action) {
      return {
        ...state,
        galleryList: action.payload
      };
    }
  }
};
