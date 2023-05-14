import { createStore } from 'vuex';
import IClassificationResponse from '../interface/IGetClassificationsResponse';
import IGetCompaniesResponse from '../interface/IGetCompaniesResponse';
import IGetProblemsResponse from '@/interface/IGetProblemsResponse';

export default createStore({
  state: {
    prepApiBaseURL: 'http://localhost:8081',
    classificationResponse: null,
    problemDetailsResponse: null,
    companiesResponse: null,
    problemsResponse: null,
  },
  getters: {
    getClassificationsURL(state): string {
      return `${state.prepApiBaseURL}/problems/classification`;
    },

    getCompaniesURL(state): string {
      return `${state.prepApiBaseURL}/problems/company`;
    },
    getClassificationResponse(state): null | IClassificationResponse {
      if (state.classificationResponse == null) {
        return state.classificationResponse;
      }
      return state.classificationResponse as IClassificationResponse;
    },
    getCompaniesResponse(state): null | IGetCompaniesResponse {
      if (state.companiesResponse == null) {
        return state.companiesResponse;
      }
      return state.companiesResponse as IGetCompaniesResponse;
    },
    getProblemsResponse(state): null | IGetProblemsResponse {
      if (state.problemsResponse == null) {
        return state.problemsResponse;
      }
      return state.problemsResponse as IGetProblemsResponse;
    },
  },
  mutations: {
    SET_CLASSIFICATION_RESPONSE(state, resp) {
      state.classificationResponse = resp;
    },
    SET_COMPANIES_RESPONSE(state, resp) {
      state.companiesResponse = resp;
    },
    SET_PROBLEMS_RESPONSE(state, resp) {
      state.problemsResponse = resp;
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
    async fetchProblemsByClassifications(context, classification: string) {
      const url = `${context.getters.getClassificationsURL}/${classification}`;
      return fetch(url, {
        mode: 'cors',
      }).then((response) => response.json())
        .then((data) => {
          console.log(data);
          context.commit('SET_PROBLEMS_RESPONSE', data);
        })
        .catch((error) => console.log(error));
    },
    async fetchCompanies(context) {
      const url = `${context.getters.getCompaniesURL}`;
      return fetch(url, {
        mode: 'cors',
      }).then((response) => response.json())
        .then((data) => {
          context.commit('SET_COMPANIES_RESPONSE', data);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
  },

  modules: {
  },
});
