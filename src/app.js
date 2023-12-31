const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/model');
const { getProfile } = require('./middleware/getProfile');

const contractsRoutes = require('./routes/contracts.routes');
const jobsRoutes = require('./routes/job.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */
// app.get('/contracts/:id',getProfile ,async (req, res) =>{
//     const {Contract} = req.app.get('models')
//     const {id} = req.params
//     const contract = await Contract.findOne({where: {id}})
//     if(!contract) return res.status(404).end()
//     res.json(contract)
// })

app.use('/contracts', contractsRoutes);
app.use('/jobs', jobsRoutes);
app.use('/clients', clientRoutes);
app.use('/admin', adminRoutes);
module.exports = app;
