const http = require('http');

const ADMIN_USER = {
    username: 'admin',
    password: 'admin',
};
const routes = {
    'get:/contact': (request, response) => {
        response.write('<h1>contact us page</h1>');
        response.end();
    },

    'post:/login': async (request, response) => {
        // * Response is an iterator

        for await (const chunk of request) {
            const user = JSON.parse(chunk);
            if (
                user.username !== ADMIN_USER.username ||
                user.password !== ADMIN_USER.password
            ) {
                response.writeHead(401);
                response.write('login failed!');
                return response.end();
            }
        }
        response.write('succeeded login!');
        return response.end();
    },

    default: (request, response) => {
        response.write('<h1>Hello World</h1>');
        return response.end();
    },
};

const handler = (request, response) => {
    const { url, method } = request;
    const routeKey = `${method.toLowerCase()}:${url}`;
    const selectedRoute = routes[routeKey] || routes.default;

    response.writeHead(200, { 'Content-Type': 'text/html' });

    return selectedRoute(request, response);
};

const app = http
    .createServer(handler)
    .listen(3333, () => console.log('app running at port ', 3333));

module.exports = app;
