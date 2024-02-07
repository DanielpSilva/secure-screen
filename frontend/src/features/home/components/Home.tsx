import React from 'react';
import '../style/home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col className="home-card">
          <img
            src={process.env.PUBLIC_URL + '/lock.png'}
            alt="Logo da Empresa"
          />
        </Col>
        <Col className="home d-flex flex-column justify-content-between">
          <h1 className="pt-5">Bem vindo!</h1>
          <div>
            <Button variant="primary">Acessar tela segura</Button>
          </div>
          <div>
            <p className="text-muted mt-auto">
              A tela segura é acessada apenas por um usuário
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
