import React from 'react';
import axios from 'axios';

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(localStorage.getItem('accessToken'));
  const [userName, setUserName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [balanceDetails, setBalanceDetails] = React.useState({
    balance: 0,
    totalBalance: 0,
    currency: '',
    spendToday: 0
  });
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = axios.create({
    baseURL: 'https://api.monzo.com',
    headers: { Authorization: `${tokenType} ${accessToken}` }
  });

  React.useEffect(() => {
    if (userName) return;

    monzoAxios
      .get('/accounts')
      .then(({ data }) => {
        const primaryAccount = data.accounts.find((account: { closed: boolean }) => !account.closed);
        const { preferred_name: preferredName } = primaryAccount.owners[0];

        setUserName(preferredName);

        return monzoAxios.get('/balance', { params: { account_id: primaryAccount.id } });
      })
      .then(({ data }) => {
        const { balance, total_balance: totalBalance, currency, spend_today: spendToday } = data;
        setBalanceDetails({ balance, totalBalance, currency, spendToday });
        setIsLoading(false);
      });
  }, [accessToken, monzoAxios, tokenType, userName]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {!isLoading && (
        <div className="userDetails">
          <p>Hello {userName}</p>
          <p>Your balance is £{(balanceDetails.balance / 100).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
