import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 150,
  // iterations: 25000,
  duration: "5m",
  rps: 100000
  // stages: [
  //   { duration: "10s", target: 20 },
  //   { duration: "20s", target: 10  },
  //   { duration: "10s", target: 0 },
  // ]
};

export default function() {
  const low = 100;
  const high = 10000000;
  const num = Math.floor(Math.random() * (high - low + 1)) + low;
  // let res = http.get(`http://localhost:3002/api/watches/${num}/summary`);
  let res = http.get(`http://ec2-18-218-217-78.us-east-2.compute.amazonaws.com:3002/api/watches/${num}/summary`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
};