import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';

interface Transaction {
  id: string;
  amount: number;
  created: string;
  description: string;
  category: string;
  merchant: {
    name: string | null;
  };
}

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(sessionStorage.getItem('accessToken'));
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [lastRetreivedTransactionId, setLastRetreivedTransactionId] = React.useState('');
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = createMonzoAxiosInstance(tokenType, accessToken);

  React.useEffect(() => {
    if (transactions.length) return;

    monzoAxios
      .get('/transactions', { params: { account_id: props.accountId, limit: 20, expand: ['merchant'] } })
      .then(({ data }) => {
        setTransactions(data.transactions);
        setIsLoading(false);
        setLastRetreivedTransactionId(data.transactions[data.transactions.length - 1].id);
      });
  }, [accessToken, monzoAxios, props.accountId, setLastRetreivedTransactionId, tokenType, transactions]);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      {!isLoading &&
        transactions.map(transaction => (
          <div className="transaction" key={transaction.id}>
            {transaction.merchant && transaction.merchant.name}
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
