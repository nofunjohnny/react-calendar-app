import _ from 'lodash';
import {normalize} from 'normalizr';
import localStorageApi from './localStorage';

const api = {
  buildEndpoint: (endpoint) => `react-calendar-app/${endpoint}`,
  // created a new entity
  post: ({endpoint, data, schema}) => {
    // TOOD: throw instead of reject?
    if (!_.isString(endpoint)) {
      return Promise.reject({error: 'endpoint must be specified'});
    }
    if (!_.isPlainObject(data)) {
      return Promise.reject({error: 'data must be a plain object'});
    }

    const prefixedEndpoint = api.buildEndpoint(endpoint);
    const newItem = localStorageApi.addItemToCollection(prefixedEndpoint, data);

    return Promise.resolve({response: normalize(newItem, schema)});
  },

  put: ({endpoint, data, schema}) => {
    // TOOD: throw instead of reject?
    if (!_.isString(endpoint)) {
      return Promise.reject({error: 'endpoint must be specified'});
    }
    if (!_.isPlainObject(data) || !data.id) {
      return Promise.reject({error: 'data must be a plain object and have the id field'});
    }

    const prefixedEndpoint = api.buildEndpoint(endpoint);
    const item = localStorageApi.updateItemInCollection(prefixedEndpoint, data);
    if (!item) {
      return Promise.reject({error: `Item ${data.id} not found in ${endpoint}`});
    }

    return Promise.resolve({response: normalize(item, schema)});
  },

  get: ({endpoint, schema, query}) => {
    if (!_.isString(endpoint)) {
      return Promise.reject({error: 'endpoint must be specified'});
    }

    const prefixedEndpoint = api.buildEndpoint(endpoint);
    let dataFromLs;
    if (query && query.id) {
      dataFromLs = localStorageApi.fetchById(prefixedEndpoint, query.id);
      if (!dataFromLs) {
        return Promise.reject({error: `Item ${query.id} not found in ${endpoint}`});
      }
    } else {
      dataFromLs = localStorageApi.fetchCollection(prefixedEndpoint);
    }
    return Promise.resolve({response: normalize(dataFromLs, schema)});
  },
};

export default api;