const salaService = require('./src/services/sala.service.js'); 
const clienteService = require('./src/services/cliente.service.js'); 
const reservaService = require('./src/services/reserva.service.js'); 
const cors = require('cors');
const express = require('express');

const server = express();
server.use(express.json());
server.options('*', cors());

// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
    console.log(`error ${error.message}`)
    next(error) // calling next middleware
}

// Error handling Middleware function reads the error message 
// and sends back a response in JSON format
const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')

    const status = error.status || 400
    response.status(status).send(error.message)
}

// Fallback Middleware function for returning 
// 404 error for undefined paths
const invalidPathHandler = (request, response, next) => {
    response.status(404)
    response.send('invalid path')
}

server.get('/api/salas', (req, res, next) => {
    try {
        const salas = salaService.get();
        res.json(salas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/salas/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const salas = salaService.getById(id);
        res.json(salas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.put('/api/salas/:id/editar', (req, res, next) => {
    try {
        const id = req.params.id;
        const sala = req.body;
        const salas = salaService.edit(id, sala);
        res.json(salas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.patch('/api/salas/:id/inativar', (req, res, next) => {
    try {
        const id = req.params.id;
        salaService.inactive(id);
        res.status(200).send();
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});


server.post('/api/salas', (req, res, next) => {
    try {
        const sala = req.body;
        const id = salaService.create(sala);
        res.status(200).json(id);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.post('/api/clientes', (req, res, next) => {
    try {
        const cliente = req.body;
        const id = clienteService.create(cliente);
        res.status(200).json(id);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.put('/api/clientes/:id/editar', (req, res, next) => {
    try {
        const id = req.params.id;
        const cliente = req.body;
        const clientes = clienteService.edit(id, cliente);
        res.json(clientes);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/clientes', (req, res, next) => {
    try {
        const clientes = clienteService.get();
        res.json(clientes);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/clientes/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const clientes = clienteService.getById(id);
        res.json(clientes);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.patch('/api/clientes/:id/inativar', (req, res, next) => {
    try {
        const id = req.params.id;
        clienteService.inactive(id);
        res.status(200).send();
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.post('/api/reservas', (req, res, next) => {
    try {
        const reserva = req.body;
        const id = reservaService.create(reserva);
        res.status(200).json(id);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.put('/api/reservas/:id/editar', (req, res, next) => {
    try {
        const id = req.params.id;
        const reserva = req.body;
        const reservas = reservaService.edit(id, reserva);
        res.json(reservas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/reservas', (req, res, next) => {
    try {
        const reservas = reservaService.get();
        res.json(reservas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/reservas/pesquisa', (req, res, next) => {
    try {
        const term = req.query.term;
        const reservas = reservaService.getSearch(term);
        res.json(reservas);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.get('/api/reservas/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const reserva = reservaService.getById(id);
        res.json(reserva);
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

server.patch('/api/reservas/:id/inativar', (req, res, next) => {
    try {
        const id = req.params.id;
        reservaService.inactive(id);
        res.status(200).send();
    } catch (error) {
        next(error); // calling next error handling middleware
    }
});

// Attach the first Error handling Middleware
// function defined above (which logs the error)
server.use(errorLogger);

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
server.use(errorResponder);

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
server.use(invalidPathHandler);


server.listen(4000, () => {
    console.log('Servidor funcionando na porta 4000');
})