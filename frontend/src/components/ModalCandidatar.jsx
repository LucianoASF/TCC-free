import React, { useEffect, useState } from 'react';
import axios from '../axios.config';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalCandidatar = ({ show, setShow, titulo, id }) => {
  const [jaSeCandidatou, setJaSeCandidatou] = useState(false);
  const [jaSeCandidatouTime, setJaSeCandidatouTime] = useState(false);
  const [times, setTimes] = useState([]);
  const [timeSelecionado, setTimeSelecionado] = useState('');

  useEffect(() => {
    const verifica = async () => {
      const res = await axios.get(
        `/usuarios/desenvolvedor/pedidos-softwares/${id}/verifica-candidatura`,
      );
      if (res.data.verdadeiro) setJaSeCandidatou(true);
    };
    verifica();
  }, [id]);

  useEffect(() => {
    const carregaTimes = async () => {
      const res = await axios.get('/usuarios/desenvolvedor/times/admin');
      setTimes(res.data);
    };
    carregaTimes();
  }, []);

  useEffect(() => {
    const verificaSeTimeJaSeCandidatou = async () => {
      if (Number(timeSelecionado) !== 0) {
        const res = await axios.get(
          `/usuarios/desenvolvedor/pedidos-softwares/${id}/time/${timeSelecionado}/verifica-candidatura`,
        );
        setJaSeCandidatouTime(res.data.verdadeiro);
      }
    };
    verificaSeTimeJaSeCandidatou();
  }, [timeSelecionado, id]);

  const candidatar = async () => {
    try {
      await axios.post(`/usuarios/desenvolvedor/pedidos-softwares/${id}`);
      toast.success('Candidatura feita com sucesso');
      setJaSeCandidatou(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const candidatarTime = async () => {
    try {
      await axios.post(
        `/usuarios/desenvolvedor/pedidos-softwares/${id}/time/${timeSelecionado}`,
      );
      toast.success('Candidatura feita com sucesso');
      setTimeSelecionado('');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Candidatar para: {titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={6}>
            <p>Candidatura Individual</p>
          </Col>
          <Col>
            {jaSeCandidatou ? (
              <Button disabled variant="primary">
                Você já se candidatou
              </Button>
            ) : (
              <Button onClick={candidatar} variant="primary">
                Candidatar
              </Button>
            )}
          </Col>
        </Row>
        <hr />
        <p>Candidatura por time</p>
        <Row>
          <Col xs={6}>
            <select
              value={timeSelecionado}
              onChange={(e) => setTimeSelecionado(e.target.value)}
            >
              <option value="">Selecione um time...</option>
              {times.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            {!timeSelecionado && (
              <Button variant="primary" disabled>
                Selecione um time
              </Button>
            )}
            {jaSeCandidatouTime && timeSelecionado && (
              <Button variant="primary" disabled>
                Já se candidatou
              </Button>
            )}
            {!jaSeCandidatouTime && timeSelecionado && (
              <Button variant="primary" onClick={candidatarTime}>
                Candidatar
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCandidatar;
