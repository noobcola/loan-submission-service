const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 8000, host: 'localhost'});

//Use a simple in-memory map as a database for this project
var database = {};

var plugins = [
    require('vision'),
    {
        register: require('./routes/api/loans.js'),
        options: {
            database: database
        }
    },
    {
        register: require('./routes/app/loans.js')
    }
];

server.register(plugins, (err) => {
    if (err) { throw err; }

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.start(function(err) {
        if (err) { throw err; }

        console.log('info', 'Server running at: ' + server.info.uri);
    });
});