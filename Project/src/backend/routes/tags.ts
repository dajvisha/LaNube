import { Router } from 'express';
import { TagController } from '../controllers/tags';

var router: Router = Router();

var tag = new TagController();

router
    .get('/', tag.search)
    .post('/new', tag.create)
    .post('/:id/edit', tag.edit)

module.exports = router;