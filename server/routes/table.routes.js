const Router = require('express');
const router = new Router();
const tableController = require('../controller/table.controller');

router.get('/table/receipt', tableController.getTableDataReceipt);
router.get('/table/sales', tableController.getTableDataSales);
router.get('/table/:id', tableController.getTableSelectedReceipt);


module.exports = router;
