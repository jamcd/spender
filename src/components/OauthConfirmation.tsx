import React from 'react';
import qs from 'qs';

const OauthConfirmation = (props: any) => {
  const [oauthCode, setOauthCode] = React.useState('');

  React.useEffect(() => {
    setOauthCode(qs.parse(props.location.search).code);
  }, [props.location.search]);

  return <p>{oauthCode} Thank you for logging in. Redirecting you to the Spender dashboard.</p>;
};

export default OauthConfirmation;
