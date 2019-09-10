import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Transaction from './Transaction';

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
  const [hasFetchedAllTransactions, setHasFetchedAllTransactions] = React.useState(false);
  const [earliestTransactionTime, setEarliestTransactionTime] = React.useState(
    moment
      .utc()
      .subtract(1, 'month')
      .format()
  );
  const [latestTransactionTime, setLatestTransactionTime] = React.useState('');
  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = createMonzoAxiosInstance(tokenType, accessToken);

  const fetchTransactions = () => {
    // setIsLoading(true);

    return monzoAxios
      .get('/transactions', {
        params: {
          account_id: props.accountId,
          since: earliestTransactionTime,
          before: latestTransactionTime,
          expand: ['merchant']
        }
      })
      .then(({ data }) => {
        setLatestTransactionTime(earliestTransactionTime);

        // if (!data.transactions.length) {
        //   console.log('got here');
        //   console.log(data);
        //   setHasFetchedAllTransactions(true);
        //   return;
        // }
        setEarliestTransactionTime(
          moment
            .utc(earliestTransactionTime)
            .subtract(1, 'month')
            .format()
        );
        setTransactions([...transactions, ...data.transactions.reverse()]);
        // setIsLoading(false);
      });
  };

  // React.useEffect(() => {
  //   if (transactions.length) return;

  //   console.log(earliestTransactionTime);

  //   monzoAxios
  //     .get('/transactions', {
  //       params: { account_id: props.accountId, since: earliestTransactionTime, expand: ['merchant'] }
  //     })
  //     .then(({ data }) => {
  //       setTransactions(data.transactions.reverse());
  //       setIsLoading(false);
  //       // setLastRetreivedTransactionId(data.transactions[data.transactions.length - 1].id);
  //     });
  // }, [accessToken, earliestTransactionTime, monzoAxios, props.accountId, tokenType, transactions]);

  return (
    <div className="transactions-summary d-flex flex-column align-items-center">
      <h4>Transactions</h4>
      <div className="transactions">
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchTransactions}
          hasMore={!hasFetchedAllTransactions}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          <ListGroup>
            {transactions.map(
              transaction =>
                transaction.merchant &&
                transaction.merchant.name && (
                  <ListGroup.Item key={transaction.id}>
                    <Transaction transaction={transaction} />
                  </ListGroup.Item>
                )
            )}
          </ListGroup>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Dashboard;
