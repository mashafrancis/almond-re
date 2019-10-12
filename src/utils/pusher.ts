import * as Pusher from 'pusher-js';

export const pusher = new Pusher('e33acdd6256d35e8e26b', {
  cluster: 'ap2',
  forceTLS: true,
});
