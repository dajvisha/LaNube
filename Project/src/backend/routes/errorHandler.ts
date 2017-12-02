import { Router } from 'express';

var router: Router = Router();

router.use(function (err, __, res, _) {
    if (err) {
        /* We log the error internaly */
        console.log(err);

        /* Finaly respond to the request */
        res.status(err.statusCode || 500).json(err.message);
    }
});

module.exports = router;