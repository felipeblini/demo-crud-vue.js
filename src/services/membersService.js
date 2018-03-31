import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { apiurl } from '../config/constants';

const getMembers = () => {
  return axios({
    url: `${apiurl}/members`,
    adapter: jsonpAdapter
  });
}

export default { getMembers }