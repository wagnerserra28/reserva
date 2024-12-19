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
  validate(params);

  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
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
  var reservas = db.reservas;
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


function validate(params) {
  // if (!params.nome || typeof params.nome !== 'string') {
  //   throw new Error('Nome inválido');
  // }
}