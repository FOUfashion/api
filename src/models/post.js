import thinky, {type, r} from '../helpers/thinky';

const Post = thinky.createModel('Post', {
  id: type.string(),
  accountId: type.string().required(),
  body: type.string().required(),
  createdAt: type.date().default(r.now())
});

export default Post;
