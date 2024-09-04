const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// function Methods
function sum(params) {
    return params[0] + params[1];
}
// function Methods
function minus(params) {
    return params[0] - params[1];
}
// function Methods
function multiply(params) {
    return params[0] * params[1];
}

// rpc method to Handle JSON-rpc
app.post('/rpc/methods', (req, res) => {
    const { jsonrpc, method, params, id } = req.body;

    if (jsonrpc !== '2.0' || !method || !Array.isArray(params)) {
        return res.status(400).json({
            jsonrpc: '2.0',
            error: { message: 'Invalid Request' },
            id: id || null,
        });
    }

    let result;
    try {
        if (method === 'add') {
            result = sum(params);
        } else if (method === 'minus') {
            result = minus(params);
        } else if (method === 'multiply') {
            result = multiply(params);
        } else {
            throw new Error('Method not found');
        }

        res.json({
            jsonrpc: '2.0',
            result: result,
            id: id,
        });
    } catch (error) {
        res.json({
            jsonrpc: '2.0',
            error: { message: error.message },
            id: id,
        });
    }
});


app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
