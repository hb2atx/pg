const db = require("../db");
const { router } = require("./app");

const express = require("express");
const ExpressError = require("../expressError")



router.get("/companies", async(req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: results.rows })
    } catch(e) {
        return next(e);
    }
})


router.get("/companies/[code]", async(req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code])
        if (results.rows.length === 0) {
            throw new ExpressError(`Cant find company with code of ${ code }`, 404)
        }
        return res.send({ comapany: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})


router.post("/companies", async(req, res, next) => {
    try {
        const { code, name, description } = req.body;

        const result = await db.query(
            `INSERT INTO companies( code, name, description)
            VALUES ($1, $2)
            RETURNING code, name, description`,
            [code, name,description]
        );

        return res.status(201).json(result.rows[0]);
    }
    catch(e) {
        return next(e);
    }
})

router.put("/companies/[code]", async(req, res, next) => {
    try {
        const { code, name, description } = req.body;

        const result = await db.query(
            `UPDATE companies SET name = $1, description = $2
            WHERE code = $3
            RETURNING code, name, description`,
            [code, name, description, req.params.code]
        );
        return res.json(result.rows[0]);
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/companies/[code]", async(req, res, next) => {
    try {
        const result = await db.query(
            `DELETE FROM companies WHERE code = $1`,
            [req.params.id]
        );
        return res.json({ message: "Deleted" });
    }

    catch(e) {
        return next(e);
    }
});


module.exports = router;



