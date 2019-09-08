import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(sessionStorage.getItem('accessToken'));
  const [userName, setUserName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [balanceDetails, setBalanceDetails] = React.useState({
    balance: 0,
    totalBalance: 0,
    currency: '',
    spendToday: 0
  });
  const [balanceFormatted, setBalanceFormatted] = React.useState('');
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = createMonzoAxiosInstance(tokenType, accessToken);
  const convertBalanceToCurrency = (balance: number, currencyCode: string) => {
    return Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(balance);
  };

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
          <h2>Hello {userName}</h2>
          <h3>Your balance is {convertBalanceToCurrency(balanceDetails.balance / 100, balanceDetails.currency)}</h3>
          <p>You have spent {convertBalanceToCurrency(Math.abs(balanceDetails.spendToday) / 100, balanceDetails.currency)} today</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
