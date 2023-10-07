import axios from 'axios';

export const getData = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (e) {}
};
