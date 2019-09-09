import React from 'react';
import userOauthDetails from '../userOauthDetails';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import monzoLogo from '../monzo.png';

// TODO: Should be sending an unguessable string in a form field called 'state' for extra security. When Monzo
// redirects back to the app it will send a 'state' value back which needs to match the value that we originally
// supplied. This will need to be stored in a DB or other persistent layer.

// TODO: Handle security better. Either store creds on the server instead of client, or find another solution

const MonzoLogin = () => {
  const { clientId } = userOauthDetails;
  const redirectUri = 'http://localhost:3000/oauth/callback';
  const monzoAuthUrl = 'https://auth.monzo.com';

  React.useEffect(() => {
    sessionStorage.removeItem('accessToken');
  });

  return (
    <div className="login">
      <Container className="d-flex h-100 flex-column justify-content-center align-items-center">
        <Row>
          <Col>
            <form action={monzoAuthUrl}>
              <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={monzoLogo} />
                <Card.Body>
                  <Card.Title>Log in to your Monzo account</Card.Title>
                  <Card.Text className="mb-3 pb-3">
                    Allow access to your Monzo account to see your current balance, transactions and more
                  </Card.Text>
                  <Button type="submit" variant="primary">
                    Log in to Monzo
                  </Button>
                </Card.Body>
              </Card>
              <input type="hidden" name="client_id" value={clientId} />
              <input type="hidden" name="redirect_uri" value={redirectUri} />
              <input type="hidden" name="response_type" value="code" />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MonzoLogin;
