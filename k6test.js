import http from 'k6/http';
import { sleep, check } from 'k6';

export default function Homepage() {
  const params = {
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en;q=0.9',
  };

  // 01. Go to the homepage
  let responses = http.batch([
    ['GET', 'http://localhost:5173/', params],
  ]);
  check(responses, {
    'Homepage loaded': (r) => console.log(r),
  });
}

//   sleep(4);

//   // 02. View products
//   responses = http.batch([
//     ['GET', 'https://mywebsite.com/products', params],
//   ]);
//   check(responses, {
//     'Products loaded': (r) => JSON.stringify(r).includes('Add to Cart'),
//   });

//   sleep(1);
// }