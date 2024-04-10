import { setupServer } from 'msw/node';

import { handlers } from '../handlers';

export const serverWorker = setupServer(...handlers);

serverWorker.events.on('request:start', ({ request }) => {
  console.log('MSW INTERCEPTED: ', request.method, request.url);
});

serverWorker.events.on('request:match', ({ request }) => {
  console.log('MSW MATCH: ', request.method, request.url);
});

serverWorker.events.on('request:unhandled', ({ request }) => {
  console.log('MSW UNHANDLED: ', request.method, request.url);
});

serverWorker.events.on('response:bypass', ({ request }) => {
  console.log('MSW BYPASS: ', request.method, request.url);
});

serverWorker.events.on('unhandledException', ({ request }) => {
  console.log('MSW UNHANDLED_EXCEPTION: ', request.method, request.url);
});
