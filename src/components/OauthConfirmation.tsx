import React from 'react';
import qs from 'qs';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';
import userOauthDetails from '../userOauthDetails';
import { withRouter } from 'react-router-dom';

const OauthConfirmation = (props: any) => {
  const [oauthCode, setOauthCode] = React.useState('');
  const [accessToken] = React.useState(sessionStorage.getItem('accessToken') || '');
  const { clientId, clientSecret } = userOauthDetails;
  const urlQueryParams = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const monzoAxios = createMonzoAxiosInstance();

  React.useEffect(() => {
    setOauthCode(urlQueryParams.code);

    if (accessToken.length) {
      props.history.push('/dashboard');
      return;
    }

    monzoAxios
      .post(
        '/oauth2/token',
        qs.stringify({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: 'http://localhost:3000/oauth/callback',
          code: oauthCode
        })
      )
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        sessionStorage.setItem('accessToken', JSON.stringify(data));
        props.history.push('/dashboard');
      });
  }, [accessToken, clientId, clientSecret, monzoAxios, oauthCode, props.history, urlQueryParams.code]);

  return <p>Thank you for logging in. Redirecting you to the Spender dashboard.</p>;
};

export default withRouter(OauthConfirmation);
