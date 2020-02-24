const cors = require('cors');
const express = require('express');
const router = express.Router();
const { BusinessUnit, validate } = require('../models/businessUnit/businessUnit');
const handleError = require('../assistiveFunctions/handleError');
const handleSuccess = require('../assistiveFunctions/handleSuccess');

router.get('/', cors(), async (req, res) => {
    const businessUnits = await BusinessUnit.find()
        .populate('BusinessUnit_Type');

    res.status(200).send(JSON.stringify(businessUnits));
})

router.get('/:id', cors(), async (req, res) => {
    const businessUnit = await BusinessUnit.findById(req.params.id);

    res.status(200).send(JSON.stringify(businessUnit));
})

router.post('/', cors(), async (req, res) => {
    const {
        bu_code,
        bu_name,
        bu_type,
        bu_country,
        bu_address_street,
        bu_address_city,
        bu_address_postcode
    } = req.body;

    let insertedType_id = await BusinessUnit_Type
        .findOne({ bu_type_description: bu_type })
        .distinct( '_id' );

    insertedType_id = insertedType_id.join();

    const reqBody = {
        bu_code,
        bu_name,
        bu_type: insertedType_id,
        bu_country,
        bu_address_street,
        bu_address_city,
        bu_address_postcode
    };

    const { error } = validate(reqBody);
    if(error) return res.status(400).send(error);

    let businessUnit = new BusinessUnit(reqBody);

    businessUnit = await businessUnit.save();

    businessUnit.validate(err => {
        err ? handleError(err, res) : handleSuccess(res);
    });
});

module.exports = router;