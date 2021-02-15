import axios from 'axios';
const environment = process.env.ENV || 'development';

// environment !== 'development'
//   ? console.log('development mode')
//   : console.log('something else');

// // for testing BE on localhost
// const ApiUrl =
//   environment !== 'development'
//     ? process.env.REACT_APP_API_HEROKU
//     : process.env.REACT_APP_API_URI;

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken
    ?.value;
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://family-pomise-spokane.herokuapp.com',
    //baseURL: ApiUrl,
  });
};
