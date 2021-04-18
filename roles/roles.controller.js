const express = require('express');
const router = express.Router();
const roleService = require('./role.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.post('/find', getAllFilteredDatas);
router.get('/:id', getById);
router.post('/updateStatusForRoles', bulkStatusUpdate);
router.put('/:id', update);
router.post('/deleteRoles', bulkDelete);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    roleService.create(req.body.role)
      .then(role => res.json(role))
      .catch(err => next(err));
}

function getAll(req, res, next) {
    roleService.getAll()
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function getAllFilteredDatas(req, res, next) {
    roleService.getAllFilteredDatas(req.body)
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function getById(req, res, next) {
    roleService.getById(req.params.id)
        .then(role => role ? res.json(role) : res.sendStatus(404))
        .catch(err => next(err));
}

function bulkStatusUpdate(req, res, next) {
    roleService.bulkStatusUpdate(req.body)
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body.role)
        .then(role => res.json(role))
        .catch(err => next(err));
}

function bulkDelete(req, res, next) {
    roleService.bulkDelete(req.body)
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({message: 'Role deleted successfully' }))
        .catch(err => next(err));
}