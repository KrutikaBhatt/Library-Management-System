const express = require('express');
const router = express.Router();

const {getMembers,
    addMember,
    getSingleMember,
    Issue,
    Return,
    updateMember,
    deleteMember} = require('../controllers/members');

router.get('/',getMembers);
router.get('/:id',getSingleMember);
router.post('/',addMember);
router.post('/issue/:id',Issue);
router.post('/return/:id',Return);
router.put('/:id',updateMember);
router.delete('/:id',deleteMember);

module.exports = router;