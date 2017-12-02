import { Router } from 'express';
import { CategoryController } from '../controllers/categories';

var router: Router = Router();

var categories = new CategoryController();

router
    .get('/', categories.index)
    .post('/new', categories.create)
    .post('/:id/edit', categories.edit)
    .delete('/:id', categories.delete)

module.exports = router;