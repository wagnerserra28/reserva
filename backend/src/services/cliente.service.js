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
  
  const clienteNovo = { id, nome: params.nome, ativo: true, dataCadastro: new Date().toLocaleString("pt-BR", {timeZone: "America/Cuiaba"}) };
  db.clientes.push(clienteNovo);

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function edit(id, params) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  const index = db.clientes.findIndex((s) => s.id == id);

  if(index < 0) {
    throw new Error('Cliente não encontrado!');
  }

  const cliente = db.clientes[index];
  cliente.nome = params.nome;

  db.clientes[index] = cliente;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);

  return id;
}

function get() {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  return db.clientes;
}

function getById(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);
  const cliente = db.clientes.find((s) => s.id == id);
  if(!cliente) {
    throw new Error('Cliente não encontrado!');
  }

  return cliente;
}

function inactive(id) {
  var json = fs.readFileSync(pathDb, 'utf8');
  var db = JSON.parse(json);

  const index = db.clientes.findIndex((s) => s.id == id);

  if(index < 0) {
    throw new Error('Cliente não encontrado!');
  }

  db.clientes[index].ativo = !db.clientes[index].ativo;

  var json = JSON.stringify(db);
  fs.writeFileSync(pathDb, json);
}


function validate(params) {
  if (!params.nome || typeof params.nome !== 'string') {
    throw new Error('Nome inválido');
  }
}