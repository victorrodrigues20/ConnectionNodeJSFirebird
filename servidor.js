const http = require("http");
const express = require("express");
var Firebird = require('node-firebird');

const app = express();

var options = {};

options.host = 'localhost'; // '127.0.0.1';
//options.port = 3050;
options.database = 'C:\\DB\\TESTE2.FDB.FDB';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database
options.pageSize = 4096;        // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop

let resultados = [];

app.get("/", function(req, res) {

    Firebird.attach(options, function(err, db) {

        if (err)
            throw err;
    
        // db = DATABASE
        db.query('SELECT * FROM USUARIO', function(err, result) {
            // IMPORTANT: close the connection
            db.detach();
            
            console.log(result);

            let pagina = "<h1>Resultado</h1><br>";
            result.map(function(item) {
                //console.log(item);
                pagina += `${item.CODIGO} - ${item.NOME}<br>`;
            })

            res.send(pagina);
            
            // Imprimir apenas primeiro registro
            //res.send("<h1>Resultado</h1><br>"+result[0].CODIGO+" - "+result[0].NOME);
        });
    
    });    
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));