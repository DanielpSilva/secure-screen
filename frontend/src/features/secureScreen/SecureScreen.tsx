import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './style/SecureScreen.css';
import { TimeUtils } from '../../utils/TimeUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import useSocket from './api/WebsocketApi';
import { useAlert } from '../../providers/AlertContext';
import { AlertType } from '../../types/AlertType';

const SecureScreen: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const params = useMemo(
    () => ({
      session: location.state?.session,
      path: location.pathname,
    }),
    [location.state?.session, location.pathname]
  );

  const handleAccessGranted = useCallback(() => {
    showAlert('Acesso concedido', AlertType.Success);
  }, [showAlert]);

  const handleAccessDenied = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useSocket(handleAccessGranted, handleAccessDenied, params);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      fluid={true}
      className="secure-screen d-flex justify-content-center align-items-center"
    >
      <div className="exit-button-container">
        <Button className="btn-default" variant="danger" href="/home">
          Sair
        </Button>
      </div>
      <Row>
        <Col className="text-center">
          <div>Tempo acessando a tela segura</div>
          <h3>{TimeUtils.formatTime(seconds)}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default SecureScreen;
