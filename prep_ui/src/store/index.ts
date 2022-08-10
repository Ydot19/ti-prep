import { createStore } from 'vuex';
import IClassificationResponse from '../interface/IGetClassificationResponse';

export default createStore({
  state: {
    prepApiBaseURL: 'http://localhost:8081',
    classificationResponse: null,
  },
  getters: {
    getClassificationsURL(state): string {
      return `${state.prepApiBaseURL}/problems/classification`;
    },
    getClassificationResponse(state): null | IClassificationResponse {
      if (state.classificationResponse == null) {
        return state.classificationResponse;
      }
      return state.classificationResponse as IClassificationResponse;
    },
  },
  mutations: {
    SET_CLASSIFICATION_RESPONSE(state, resp) {
      state.classificationResponse = resp;
    },
  },
  actions: {
    async fetchClassifications(context) {
      const url = context.getters.getClassificationsURL;
      return fetch(url, {
        mode: 'cors',
      }).then((response) => response.json())
        .then((data) => {
          context.commit('SET_CLASSIFICATION_RESPONSE', data);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
  },
  modules: {
  },
});
