const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();

const material = require('./routes/material');
const material_unit = require('./routes/material_unit');
const material_type = require('./routes/material_type');

const businessUnit = require('./routes/businessUnit');
const businessUnit_type = require('./routes/businessUnit_type');

const connStr = `mongodb://localhost/${config.get('db')}`;

if (!config.get('jwtPrivateKey')) {
  console.log('ERROR - jwtPrivateKey: Private key has not been set.');
  process.exit(1);
};

mongoose
  .connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ----- ROUTES -----
app.use('/api/material/unit', material_unit);
app.use('/api/material/type', material_type);
app.use('/api/material', material);
app.use('/api/businessunit', businessUnit);
app.use('/api/businessunit/type', businessUnit_type);

// require('./startup/prod')(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port: ${port}...`));
