const cors = require('cors');
const express = require('express');
const router = express.Router();
const { Material_Unit, validate } = require('../models/material/material_unit');
const handleError = require('../assistiveFunctions/handleError');
const handleSuccess = require('../assistiveFunctions/handleSuccess');

router.get('/', cors(), async (req, res) => {
    try{
        const units = await Material_Unit.find();

        res.status(200).send(JSON.stringify(units));
    } catch(err){
        console.log(err);
        res.status(404).end();
    }
})

router.post('/', cors(), async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error);

    const {
        mat_unit_code,
        mat_unit_name
    } = req.body;

    let unit = new Material_Unit({
        mat_unit_code,
        mat_unit_name
    });

    unit = await unit.save();

    unit.validate(err => {
        err ? handleError(err, res) : handleSuccess(res);
    });
})

module.exports = router;