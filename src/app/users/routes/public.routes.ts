import { Router } from 'express';
import UsersController from '../controller/users.controller';

const route = Router();

route.post('/',UsersController.CreateOne);

export default route;

