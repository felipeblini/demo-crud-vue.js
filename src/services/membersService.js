import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { apiurl } from '../config/constants';

const getMembers = () => {
  return axios({
    url: `${apiurl}/members`,
    adapter: jsonpAdapter
  });
}

const getEventRSVP = eventId => {
  return axios({
    url: `${apiurl}/events/${eventId}/rsvps`,
    adapter: jsonpAdapter
  });
}

export default { getMembers, getEventRSVP }