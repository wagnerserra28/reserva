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
  
  const salaNova = { id, descricao: params.descricao, quantidadeCadeiras: params.quantidadeCadeiras, ativo: true };
  db.salas.push(salaNova);

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function edit(id, params) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  const index = db.salas.findIndex((s) => s.id == id);

  if(index < 0) {
    throw new Error('Sala não encontrada');
  }

  const sala = db.salas[index];
  sala.descricao = params.descricao;
  sala.quantidadeCadeiras = params.quantidadeCadeiras;

  db.salas[index] = sala;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function get() {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  return db.salas;
}

function getById(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  const sala = db.salas.find((s) => s.id == id);
  if(!sala) {
    throw new Error('Sala não encontrada');
  }

  return sala;
}

function inactive(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  const index = db.salas.findIndex((s) => s.id == id);

  if(index < 0) {
    throw new Error('Sala não encontrada');
  }

  db.salas[index].ativo = !db.salas[index].ativo;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);
}


function validate(params) {
  if (!params.descricao || typeof params.descricao !== 'string') {
    throw new Error('Descrição inválida');
  }
  if (!Number.isInteger(params.quantidadeCadeiras) || params.quantidadeCadeiras <= 0) {
    throw new Error('Quantidade de cadeiras inválida');
  }
}