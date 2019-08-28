import React from "react";
import userOauthDetails from "../userOauthDetails";

const MonzoLogin = () => {
  const { clientId } = userOauthDetails;
  const redirectUri = "http://localhost:3000/oauth/callback";
  const monzoAuthUrl = "https://auth.monzo.com";

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
