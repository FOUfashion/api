import Comment from '../models/comment';

class CommentCtrl {

  async get(request, reply) {
    const comment = await Comment.get(request.params.id).getJoin().run();
    reply(comment);
  }

  async create(request, reply) {
    const comment = await new Comment({
      body: request.payload.body,
      postId: request.params.id,
      accountId: request.auth.credentials.account.id
    }).save();

    reply(comment).code(201);
  }

  async update(request, reply) {
    const comment = await Comment.get(request.params.id).run();

    if (request.payload.body) {
      comment.body = request.payload.body;
    }

    reply(await comment.save());
  }

  async delete(request, reply) {
    const comment = await Comment.get(request.params.id).run();
    await comment.deleteAll();
    reply().code(204);
  }

}

export default CommentCtrl;
