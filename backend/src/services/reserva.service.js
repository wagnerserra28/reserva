const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const pathDb = './src/data/db.json';

module.exports =
{
  create,
  edit,
  get,
  getById,
  inactive
}

function create(params) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  validarReservaExistente(params, db.reservas);

  const id = uuidv4();
  
  const reservaNova = { 
    id, 
    clienteId: params.clienteId, 
    salaId: params.salaId, 
    dataInicio: params.dataInicio,
    dataFim: params.dataFim,
    timeInicio: params.timeInicio,
    timeFim: params.timeFim,
    ativo: true, 
    dataCadastro: new Date().toLocaleString("pt-BR", {timeZone: "America/Cuiaba"}) 
  };
  db.reservas.push(reservaNova);

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function edit(id, params) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  validarReservaExistente(params, db.reservas);

  const index = db.reservas.findIndex((s) => s.id == id);

  if(index < 0) {
    throw new Error('Reserva não encontrada!');
  }

  const reserva = db.reservas[index];
  reserva.clienteId = params.clienteId;
  reserva.salaId = params.salaId;
  reserva.dataInicio = params.dataInicio;
  reserva.dataFim = params.dataFim;
  reserva.timeInicio = params.timeInicio,
  reserva.timeFim = params.timeFim,

  db.reservas[index] = reserva;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function get() {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  var reservas = db.reservas.filter((r) => r.ativo == true);
  reservas.map(reserva => {
    reserva.cliente = db.clientes.find((c) => c.id == reserva.clienteId);
    reserva.sala = db.salas.find((s) => s.id == reserva.salaId);
  });

  return reservas;
}

function getById(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  const reserva = db.reservas.find((r) => r.id == id);
  if(!reserva) {
    throw new Error('Reserva não encontrada!');
  }

  return reserva;
}

function inactive(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  const index = db.reservas.findIndex((r) => r.id == id);

  if(index < 0) {
    throw new Error('Reserva não encontrada!');
  }

  db.reservas[index].ativo = !db.reservas[index].ativo;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);
}

function validarReservaExistente(params, reservas) {
  const reservasSala = reservas.filter(reserva => reserva.ativo == true && reserva.salaId === params.salaId);

  const timeInicio = new Date(params.dataInicio);
  timeInicio.setHours(params.timeInicio.hour, params.timeInicio.minute, 0, 0);

  const timeFim = new Date(params.dataFim);
  timeFim.setHours(params.timeFim.hour, params.timeFim.minute, 0, 0);

  const existeConflito = reservasSala.some(reserva => {
    const reservaInicio = new Date(reserva.dataInicio);
    reservaInicio.setHours(reserva.timeInicio.hour, reserva.timeInicio.minute, 0, 0);

    const reservaFim = new Date(reserva.dataFim);
    reservaFim.setHours(reserva.timeFim.hour, reserva.timeFim.minute, 0, 0);

    return (timeInicio < reservaFim && timeFim > reservaInicio);
  });

  if (existeConflito) {
    throw new Error("Já existe uma reserva para essa sala no mesmo horário.");
  }
}