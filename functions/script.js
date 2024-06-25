import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 25,
  duration: '5s',
};

export default function() {
  const body = JSON.stringify({name: 'ok'})
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('https://createdocument-ux35si6vfq-uc.a.run.app', body, params);
  sleep(1);
}
