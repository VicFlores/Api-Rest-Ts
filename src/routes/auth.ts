import { Router } from 'express'
import { profile, signin, signup } from '../controllers/authControllers';
import { tokenValidation } from '../middlewares/verifyToken'

const router: Router = Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get ('/profile',tokenValidation , profile)

export default router
