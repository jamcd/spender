import express, { Request, Response } from 'express';
// import bodyParser from 'body';
import path from 'path';
// import request from 'request';
const app = express();

const oauthDetails = {
  client_id: 'oauth2client_00009m5R2PdrLUx1KvI6JF',
  client_secret: 'mnzpub./RqSU1B1h1ZbdnqrXfPDpXP0eYD426RV4VTe0+sLFOcQQwd51L3EybNMVuT326HKppPcWh6ER8mOZ+IS2KKz',
  redirect_uri: 'http://localhost:3000/oauth/callback'
};

// let accessToken = null;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req: Request, res: Response) {
  const { client_id, redirect_uri } = oauthDetails;
  const monzoAuthUrl = 'https://auth.monzo.com';
  res.type('html');
  res.send(`
    <h1>Hello</h1>
    <form action="${monzoAuthUrl}">
      <input type="hidden" name="client_id" value="${client_id}" />
      <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
      <input type="hidden" name="response_type" value="code" />
      <button>Sign in</button>
    </form>
  `);
});

// app.get("/oauth/callback", (req: Request, res: Response) => {
//   const { client_id, client_secret, redirect_uri } = oauthDetails;
//   const { code } = req.query;
//   const monzoAuthUrl = `https://api.monzo.com/oauth2/token`;

//   // Initiate request to retrieve access token
//   request.post(
//     {
//       url: monzoAuthUrl,
//       form: {
//         grant_type: "authorization_code",
//         client_id,
//         client_secret,
//         redirect_uri,
//         code
//       }
//     },
//     (err, response, body) => {
//       accessToken = JSON.parse(body); // Populate accessToken variable with token response
//       res.redirect("/accounts"); // Send user to their accounts
//     }
//   );
// });

app.get('/ping', function(req: Request, res: Response) {
  return res.send('pong');
});

app.get('/*', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
