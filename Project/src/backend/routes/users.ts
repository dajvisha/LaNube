import { Router } from 'express';
import { UserController } from '../controllers/users';

var router: Router = Router();

var users = new UserController();

router
    .get('/', users.index)
    .get('/:id', users.get)
    .post('/new', users.create)
    .post('/:id/edit', users.edit)
    .delete('/:id', users.delete)

module.exports = router;