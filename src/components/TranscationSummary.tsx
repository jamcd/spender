import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';

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
  const [earliestTransactionTime, setEarliestTransactionTime] = React.useState(
    moment
      .utc()
      .subtract(1, 'month')
      .format()
  );
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = createMonzoAxiosInstance(tokenType, accessToken);

  React.useEffect(() => {
    if (transactions.length) return;

    console.log(earliestTransactionTime);

    monzoAxios
      .get('/transactions', {
        params: { account_id: props.accountId, since: earliestTransactionTime, expand: ['merchant'] }
      })
      .then(({ data }) => {
        setTransactions(data.transactions.reverse());
        setIsLoading(false);
        // setLastRetreivedTransactionId(data.transactions[data.transactions.length - 1].id);
      });
  }, [accessToken, earliestTransactionTime, monzoAxios, props.accountId, tokenType, transactions]);

  return (
    <div className="transactions">
      <h4>Transactions</h4>
      <ListGroup>
        {!isLoading &&
          transactions.map(
            transaction =>
              transaction.merchant &&
              transaction.merchant.name && (
                <ListGroup.Item className="transaction" key={transaction.id}>
                  {transaction.merchant.name}
                </ListGroup.Item>
              )
          )}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
