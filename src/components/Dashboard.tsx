import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';
import TranscationSummary from './TranscationSummary';

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(sessionStorage.getItem('accessToken'));
  const [userName, setUserName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [accountId, setAccountId] = React.useState();
  const [balanceDetails, setBalanceDetails] = React.useState({
    balance: 0,
    totalBalance: 0,
    currency: '',
    spendToday: 0
  });
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
        setAccountId(primaryAccount.id);

        return monzoAxios.get('/balance', { params: { account_id: primaryAccount.id } });
      })
      .then(({ data }) => {
        const { balance, total_balance: totalBalance, currency, spend_today: spendToday } = data;
        setBalanceDetails({ balance, totalBalance, currency, spendToday });
        setIsLoading(false);
      });
  }, [accessToken, accountId, monzoAxios, tokenType, userName]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {!isLoading && [
        <div className="user-details" key="userDetails">
          <h2>Hello {userName}</h2>
          <h3>Your balance is {convertBalanceToCurrency(balanceDetails.balance / 100, balanceDetails.currency)}</h3>
          <p>
            You have spent{' '}
            {convertBalanceToCurrency(Math.abs(balanceDetails.spendToday) / 100, balanceDetails.currency)} today
          </p>
        </div>,
        <TranscationSummary key="transactionSummary" accountId={accountId} />
      ]}
    </div>
  );
};

export default Dashboard;
