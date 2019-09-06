import React from 'react';
import axios from 'axios';

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(localStorage.getItem('accessToken'));
  const [userName, setUserName] = React.useState('');
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');

  React.useEffect(() => {
    axios
      .get('https://api.monzo.com/accounts', {
        headers: { Authorization: `${tokenType} ${accessToken}` }
      })
      .then(({ data }) => {
        const primaryAccount = data.accounts.find((account: { closed: boolean }) => !account.closed);
        const primaryAccountId = primaryAccount.id;
        const {
          // preferred_first_name: preferredFirstName,
          preferred_name: preferredName
          // user_id: userId,
        } = primaryAccount.owners[0];

        setUserName(preferredName);

        // localStorage.setItem('accessToken', JSON.stringify(data));
      });
  }, [accessToken, tokenType]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Hello {userName}</p>
    </div>
  );
};

export default Dashboard;
