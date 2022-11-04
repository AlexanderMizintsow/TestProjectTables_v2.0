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
        const tableSelectedReceipt = await db.query(`SELECT Drug."Drug",
                                                   Form."Form",
                                                   Fabr."Fabr",
                                                   NaklDataR."UQuantity",
                                                   NaklDataR."SumRoznWNDS",
                                                   NaklData."NDS",
                                                   NaklData."SrokG"
                                            FROM "Test_Drug" AS Drug
                                                     JOIN "Test_Registry" Registry ON Registry."DrugID" = Drug."DrugID"
                                                     JOIN "Test_Form" AS Form ON Registry."FormID" = Form."FormID"
                                                     JOIN "Test_Fabr" AS Fabr ON Fabr."FabrID" = Registry."FabrID"
                                                     JOIN "Test_NaklData" NaklData ON NaklData."RegID" = Registry."RegID"
                                                     JOIN "Test_NaklDataR" NaklDataR
                                                          ON NaklDataR."NaklDataID" = NaklData."NaklDataID"
                                                     JOIN "Test_NaklTitleR" NaklTitleR
                                                          ON NaklTitleR."NaklTitleRID" = NaklDataR."NaklTitleRID"
                                                     JOIN "Branch" ON "Branch"."BranchID" = NaklTitleR."BranchID"
                                            WHERE NaklDataR."Disable" = '0'
                                              AND NaklTitleR."Disable" = '0'
                                              AND NaklDataR."NaklTitleRID" = ${id}`);
        res.json(tableSelectedReceipt.rows);
    }
}


module.exports = new TableController();