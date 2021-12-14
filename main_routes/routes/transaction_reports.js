const express = require('express');
const router = express.Router();

const {
    allTransactions,
    downloadTransactions,
    PopularBook,
    HighestPaying,
    Chart 
} = require('../controllers/transactions_and_report');

router.get('/',allTransactions);
router.get('/download',downloadTransactions);
router.get('/popular',PopularBook);
router.get('/highest',HighestPaying);
router.get('/chart',Chart);
module.exports = router;