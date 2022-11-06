const db = require('../database/db');

class TableController {

    async getTableDataReceipt(req, res) {
        const tableReceipt = await db.query(` SELECT *
                                              FROM getting_contents_receipt()
                                              LIMIT 33`);
        res.json(tableReceipt.rows);
    }

    async getTableDataSales(req, res) {
        const tableSales = await db.query(` SELECT *
                                            FROM sales_list()
                                            LIMIT 33`);
        res.json(tableSales.rows);

    }

    async getTableSelectedReceipt(req, res) {
        const id = req.params.id
        const tableSelectedReceipt = await db.query(`SELECT *
                                                     FROM getting_contents_receipt(${id})`);
        res.json(tableSelectedReceipt.rows);
    }
}


module.exports = new TableController();