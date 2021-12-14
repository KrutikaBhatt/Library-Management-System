const express = require('express');
const router = express.Router();

const{
    getBooks,
    insertBook,
    importBooksfromFrappe,
    getSingleBook,
    updateBook,
    deleteBook
} = require('../controllers/books');

router.get('/',getBooks);
router.post('/',insertBook);
router.post('/import',importBooksfromFrappe);
router.get('/:id',getSingleBook);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);

module.exports = router;