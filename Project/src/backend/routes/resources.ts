import { Router } from 'express';
import { ResourceController } from '../controllers/resources';

var router: Router = Router();

var resources = new ResourceController();

router
    .get('/', resources.index)
    .post('/:id/edit', resources.edit)
    .post('/new', resources.create)
    .delete('/:id', resources.delete)

module.exports = router;