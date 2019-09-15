import { Router } from 'express';
import PostsController from '../controller/posts.controller';
import PostValidator from '../validate/post.validate';

const route = Router();

route.post('/', PostValidator.CreatePost, PostsController.CreateOne);
route.put('/:id', PostValidator.UpdateOne, PostsController.UpdataOne);
route.delete('/:id', PostsController.DeleteOne);


export default route;
