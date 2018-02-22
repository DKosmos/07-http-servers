#Vanilla HTTP server

- Accepts telnet GET and POST commands
- Use HTTPie to test the following commands
- `http GET :3000/cowsay?text={words}`
  - Will return ascii image of cow saying {words}
- `http GET :3000`
  - Will return ascii image of cow saying 'hello from my server!'
- `http POST :3000/cowsay text={words}`
  - Will return ascii image of cow saying {words}