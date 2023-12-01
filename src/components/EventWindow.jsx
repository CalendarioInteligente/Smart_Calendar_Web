import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "../api/axios";
import toIsoString from "../utils/locale-isostring";

const POST_EVENT_URL = '/api/agendamentos/'

const EventWindow = (props) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState();

  useState(() => {
    setHorario(toIsoString(new Date()).substr(11, 5));
  }, [])

  async function handleEvent(e) {
    e.preventDefault();

    // Concatena a data e o horario e envia para o restful
    const parsedDate = toIsoString(new Date(Date.parse(props.date + ' ' + horario)));

    const params = {
      titulo: titulo,
      descricao: descricao,
      data: parsedDate
    }

    try {
      const response = await axios.post(POST_EVENT_URL, JSON.stringify(params));

      setTitulo('')
      setDescricao('')
      props?.onClick()
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        // No server response
      } else if (err.response?.status === 400) {
        // Missing email or password
      } else if (err.response?.status === 401) {
        // Unauthorized
      } else {
        // Login failed
      }
    }
  }

  return (
      <form className="adicionar-evento-container">
        <label htmlFor="data">Data</label>
        <input type="date" name="data" id="data" className="calendar-input" value={props.date} required readOnly/>
        <label htmlFor="titulo">Titulo</label>
        <input type="text" name="titulo" id="titulo" required className="calendar-input" onChange={(e) => setTitulo(e.target.value)} autoComplete="off"/>
        <label htmlFor="descricao">Descrição</label>
        <input type="text" name="descricao" id="descricao" className="calendar-input" required onChange={(e) => setDescricao(e.target.value)} autoComplete="off"/>
        <label htmlFor="horario">Horario</label>
        <input type="time" name="horario" id="horario" className="calendar-input" required defaultValue={horario} onChange={(e) => setHorario(e.target.value)} />
        <br/><br/>
        <button className="small-button" style={{marginTop: 29, width: "100%", backgroundColor: "blue"}}>Adicionar</button>
        <Button style={{marginTop: 29}} onClick={handleEvent} className="bntLogin">Adicionar</Button>
      </form>
  )
}

export default EventWindow;