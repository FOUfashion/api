import Comment from '../models/comment';

class CommentCtrl {

  async get(request, reply) {
    reply(await Comment.get(request.params.id).getJoin().run());
  }

  async create(request, reply) {
    const comment = await new Comment({
      body: request.payload.body,
      postId: request.payload.postId
    }).save();

    reply(comment).code(201);
  }

  async update(request, reply) {
    const comment = await Comment.get(request.params.id).run();

    if (request.payload.body) {
      post.body = request.payload.body;
    }

    reply(await comment.save());
  }

  async delete(request, reply) {
    const comment = await Comment.get(request.params.id).run();
    await comment.deleteAll();
    reply().status(204);
  }

}

export default CommentCtrl;
