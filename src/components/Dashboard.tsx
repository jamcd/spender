import React from 'react';
import createMonzoAxiosInstance from '../utils/createMonzoAxiosInstance';
import TranscationSummary from './TranscationSummary';
import Container from 'react-bootstrap/Container';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = (props: any) => {
  const [accessTokenConfig] = React.useState(sessionStorage.getItem('accessToken'));
  const [userName, setUserName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [accountDetails, setAccountDetails] = React.useState({
    id: '',
    sortCode: '',
    accountNumber: ''
  });
  const [sortCode, setSortCode] = React.useState();
  const [balanceDetails, setBalanceDetails] = React.useState({
    balance: 0,
    totalBalance: 0,
    currency: '',
    spendToday: 0
  });

  const { token_type: tokenType, access_token: accessToken } = JSON.parse(accessTokenConfig || '');
  const monzoAxios = createMonzoAxiosInstance(tokenType, accessToken);
  const convertBalanceToCurrency = (balance: number, currencyCode: string) => {
    return Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode
    }).format(balance);
  };

  React.useEffect(() => {
    if (userName) return;

    monzoAxios
      .get('/accounts')
      .then(({ data }) => {
        const primaryAccount = data.accounts.find((account: { closed: boolean }) => !account.closed);
        const { preferred_name: preferredName } = primaryAccount.owners[0];
        const { id, account_number: accountNumber, sort_code: sortCode } = primaryAccount;

        setUserName(preferredName);
        setAccountDetails({ id, accountNumber, sortCode });

        return monzoAxios.get('/balance', {
          params: { account_id: primaryAccount.id }
        });
      })
      .then(({ data }) => {
        const { balance, total_balance: totalBalance, currency, spend_today: spendToday } = data;
        setBalanceDetails({
          balance,
          totalBalance,
          currency,
          spendToday
        });
        setIsLoading(false);
      });
  }, [accessToken, monzoAxios, tokenType, userName]);

  return (
    <div className="dashboard">
      <Container fluid={true} className="dashboard__hero">
        <Row>
          <Col>
            {!isLoading && (
              <div className="dashboard__account-details" key="accountDetails">
                <p className="dashboard__account-title">Current Account</p>
                <p className="dashboard__account-credentials">
                  {accountDetails.sortCode} {accountDetails.accountNumber}
                </p>
                {/* <h3>Hello {userName}</h3> */}
                <h1 className="dashboard__account-balance">
                  {convertBalanceToCurrency(balanceDetails.balance / 100, balanceDetails.currency)}
                </h1>
                <p className="dashboard__todays-spend">
                  You have spent{' '}
                  {convertBalanceToCurrency(Math.abs(balanceDetails.spendToday) / 100, balanceDetails.currency)} today
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <TranscationSummary key="transactionSummary" accountId={accountDetails.id} style={{ maxWidth: '10rem' }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
