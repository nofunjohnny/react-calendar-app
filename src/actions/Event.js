import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  create: createRequestTypes('EVENT/CREATE'),
  update: createRequestTypes('EVENT/UPDATE'),
  fetchAll: createRequestTypes('EVENT/FETCH_ALL'),
  fetch: createRequestTypes('EVENT/FETCH'),
};
export const CREATE_EVENT = '@EVENT/CREATE';
export const UPDATE_EVENT = '@EVENT/UPDATE';
export const FETCH_EVENT = '@EVENT/FETCH';
export const FETCH_ALL_EVENTS = '@EVENTS/FETCH_ALL';

export const actionCreators = {
  create: {
    request: () => action(actionTypes.create.REQUEST, {}),
    success: (id, response) => action(actionTypes.create.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.create.FAILURE, {error}),
  },
  update: {
    request: (id) => action(actionTypes.update.REQUEST, {id}),
    success: (id, response) => action(actionTypes.update.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.update.FAILURE, {error}),
  },
  fetchAll: {
    request: () => action(actionTypes.fetchAll.REQUEST, {}),
    success: (id, response) => action(actionTypes.fetchAll.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetchAll.FAILURE, {error}),
  },
  fetch: {
    request: (id) => action(actionTypes.fetch.REQUEST, {id}),
    success: (id, response) => action(actionTypes.fetch.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetch.FAILURE, {error}),
  },
};

export const createEvent = (data, redirectToCalendar = true) => {
  return action(CREATE_EVENT, {data, redirectToCalendar});
};

export const updateEvent = (data) => {
  return action(UPDATE_EVENT, {data});
};

export const fetchAllEvents = () => {
  return action(FETCH_ALL_EVENTS);
};

export const fetchEvent = (id) => {
  return action(FETCH_EVENT, {id});
};