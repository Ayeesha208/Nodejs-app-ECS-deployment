// const express = require('express');
// const app = express();
// const hostname = '127.0.0.1'; // Your server ip address
// const port = 3000;

// const version = '1.0.0';

// app.get('/', (req, res) => {
//     // set response content    
//     res.sendFile(__dirname + "/html/index.html"); 
//     console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

// })

// // Health check
// app.get('/health', (req, res) => {    
//     res.sendStatus(200);
//     console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);
// })

// app.listen(port, () => {
//     console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
// })

const express = require('express');
const path = require('path');

const app = express();

// ECS / Docker compatible
const PORT = process.env.PORT || 3000;
const version = '1.0.0';

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
    console.log(`[Version ${version}] Request => ${req.method} ${req.url}`);
});

// Health check (ALB MUST hit this)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// IMPORTANT: Bind to all interfaces for ECS
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Version ${version}] Server running on port ${PORT}`);
});
