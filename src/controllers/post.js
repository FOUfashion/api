import Post from '../models/post';

class PostCtrl {

  async get(request, reply) {
    const post = await Post.get(request.params.id).getJoin().run();
    reply(post);
  }

  async create(request, reply) {
    const post = await new Post({
      accountId: request.auth.credentials.account.id,
      body: request.payload.body
    }).save();

    reply(post).code(201);
  }

  async update(request, reply) {
    const post = await Post.get(request.params.id).run();

    if (request.payload.body) {
      post.body = request.payload.body;
    }

    reply(await post.save());
  }

  async delete(request, reply) {
    const post = await Post.get(request.params.id).run();
    await post.deleteAll();
    reply().code(204);
  }

}

export default PostCtrl;
