const express = require('express');
const app = express();
const tableRouter = require('./routes/table.routes');

const PORT = 3001;


app.use(express.json());
app.use('/api', tableRouter);

app.listen(PORT, () => console.log(`Use PORT: ${PORT}`));