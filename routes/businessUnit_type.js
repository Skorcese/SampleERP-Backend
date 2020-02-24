const cors = require('cors');
const express = require('express');
const router = express.Router();
const { BusinessUnit_Type, validate } = require('../models/businessUnit/businessUnit_type');
const handleError = require('../assistiveFunctions/handleError');
const handleSuccess = require('../assistiveFunctions/handleSuccess');

router.get('/', cors(), async (req, res) => {
    const type = await BusinessUnit_Type.find();

    res.status(200).send(JSON.stringify(type));
})

router.post('/', cors(), async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error);

    const {
        bu_type_id,
        bu_type_description
    } = req.body;

    let type = new BusinessUnit_Type({
        bu_type_id,
        bu_type_description
    });

    type = await type.save();

    type.validate(err => {
        err ? handleError(err, res) : handleSuccess(res);
    });
})

module.exports = router;