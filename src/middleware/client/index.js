const socket = new WebSocket('ws://localhost:8081');

socket.addEventListener('open', function (ev) {
  socket.send(JSON.stringify({
    message: 'test',
    user: {
      mentions: []
    }
  }));
});

socket.addEventListener('message', function (ev) {
  const response = JSON.parse(ev.data);
  // eslint-disable-next-line no-console -- Debugging
  console.log('Message from server', response);
});
