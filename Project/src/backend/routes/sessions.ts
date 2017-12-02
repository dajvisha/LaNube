import { Router } from 'express';
import { SessionController } from '../controllers/sessions';
import { UserController } from '../controllers/users';

var router: Router = Router();

var session = new SessionController();
var users = new UserController();

router
    .post('/login', session.login)
    .delete('/logout', session.logout)
    .get('/profile', users.currentUser)

module.exports = router;