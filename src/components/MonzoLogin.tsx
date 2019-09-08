import React from 'react';
import userOauthDetails from '../userOauthDetails';

// TODO: Should be sending an unguessable string in a form field called 'state' for extra security. When Monzo
// redirects back to the app it will send a 'state' value back which needs to match the value that we originally
// supplied. This will need to be stored in a DB or other persistent layer.

// TODO: Handle security better. Either store creds on the server instead of client, or find another solution

const MonzoLogin = () => {
  const { clientId } = userOauthDetails;
  const redirectUri = 'http://localhost:3000/oauth/callback';
  const monzoAuthUrl = 'https://auth.monzo.com';

  React.useEffect(() => {
    sessionStorage.removeItem('accessToken');
  });

  return (
    <form action={monzoAuthUrl}>
      <input type="hidden" name="client_id" value={clientId} />
      <input type="hidden" name="redirect_uri" value={redirectUri} />
      <input type="hidden" name="response_type" value="code" />
      <button>Sign in</button>
    </form>
  );
};

export default MonzoLogin;
