import { Router } from 'express';
import PostsController from '../controller/posts.controller';
import PostValidator from '../validate/post.validate';

const route = Router()
route.get('/', PostValidator.GetAll, PostsController.Get);
route.get('/:id/post', PostsController.GetOne);
route.get('/filter', PostsController.CatagoriesFilter);
route.get('/count', PostsController.PostCount);


export default route;
