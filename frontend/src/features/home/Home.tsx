import React, { useEffect, useState } from 'react';
import './style/Home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import createNewSession from './api/CreateNewSession';
import { Session } from './types/Session';
import checkActiveSecureScreenAccess from './api/CheckActiveSecureScreenAccess';
import { useNavigate } from 'react-router-dom';
import { CheckActiveSecureScreenAccessType } from './types/CheckActiveSecureScreen';
import { useAlert } from '../../providers/AlertContext';
import { AlertType } from '../../types/AlertType';
const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await createNewSession();
        setSession(res?.data);
      } catch (error) {
        showAlert('Erro ao criar sessão!', AlertType.Error);
      }
    };

    fetchSession();
  }, [showAlert]);

  const onCheckIfExistsActiveSecureScreenAcess = async () => {
    setLoading(true);
    const payload: CheckActiveSecureScreenAccessType = {
      path: '/secure-screen',
    };

    checkActiveSecureScreenAccess(payload)
      .then((isActive) => {
        if (!isActive) {
          navigate(payload.path, { state: { session: session?.id } });
        } else {
          showAlert('Já existe um usuário ativo!', AlertType.Warning);
        }
      })
      .catch(() =>
        showAlert(
          'Erro ao verificar se a tela segura está disponível!',
          AlertType.Error
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col className="home-card">
          <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Lock" />
        </Col>
        <Col className="home d-flex flex-column justify-content-between">
          <h1 className="pt-5">Bem vindo!</h1>
          <div>
            <Button
              variant="primary"
              onClick={onCheckIfExistsActiveSecureScreenAcess}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Acessar tela segura'}
            </Button>
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
