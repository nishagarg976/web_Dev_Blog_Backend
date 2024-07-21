import express from 'express'
import { userRegister, userLogin, userLogout,getMyProfile ,getUserById} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

//register
router.post('/register', userRegister)


//login
router.post('/login', userLogin)

//logout
router.get('/logout', userLogout)

router.get('/myprofile',isAuthenticated, getMyProfile);

router.get('/:id',getUserById);


export default router;