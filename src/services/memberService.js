import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import { apiurl } from "../config/constants";

console.log({ apiurl });

const getMembers = () => {
  console.log("getting members", "url: " + `${apiurl}/members`);
  return axios({
    url: `${apiurl}/members`,
    adapter: jsonpAdapter
  });
};

const getEventRSVP = eventId => {
  return axios({
    url: `${apiurl}/events/${eventId}/rsvps`,
    adapter: jsonpAdapter
  });
};

export default {
  getMembers,
  getEventRSVP
};
