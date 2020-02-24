const cors = require('cors')
const express = require('express')
const router = express.Router()
const { Material, validate } = require('../models/material/material')
const { Material_Type } = require('../models/material/material_type')
const { Material_Unit } = require('../models/material/material_unit') 
const handleError = require('../assistiveFunctions/handleError');
const handleSuccess = require('../assistiveFunctions/handleSuccess');


router.get('/', cors(), async (req, res) => {
    try{
        const materials = await Material.find()
            .populate('mat_type')
            .populate('mat_unit');

            res.status(200).send(JSON.stringify(materials));
    } catch(err){
        console.log(err);
        res.status(404).end();
    };
})

router.get('/:id', cors(), async (req, res) => {
    const material = await Material.findById(req.params.id)
        .populate('mat_type')
        .populate('mat_unit');

    res.status(200).send(JSON.stringify(material));
})

router.post('/', cors(), async (req, res) => {
    const {
        mat_code,
        mat_name,
        mat_type,
        mat_unit
    } = req.body;

    let insertedType_id = await Material_Type
        .findOne({ mat_type_description: mat_type })
        .distinct( '_id' );

    let insertedUnit_id = await Material_Unit
        .findOne({ mat_unit_code: mat_unit })
        .distinct( '_id' );

    insertedType_id = insertedType_id.join();
    insertedUnit_id = insertedUnit_id.join();

    const reqBody = {
        mat_code,
        mat_name,
        mat_type: insertedType_id,
        mat_unit: insertedUnit_id
    };

    const { error } = validate(reqBody);
    if(error) return res.status(400).send(error);

    let material = new Material(reqBody);

    material = await material.save();

    material.validate(err => {
        err ? handleError(err, res) : handleSuccess(res);
    });
});

module.exports = router;