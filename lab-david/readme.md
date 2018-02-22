#Vanilla HTTP server

- Accepts telnet GET and POST commands
- `telnet GET :3000/cowsay?text={words}`
  - Will return ascii image of cow saying {words}
- `telnet GET :3000`
  - Will return ascii image of cow saying 'hello from my server!'
- `telnet POST :3000/cowsay text={words}`
  - Will return ascii image of cow saying {words}