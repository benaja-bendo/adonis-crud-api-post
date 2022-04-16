import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from './../../Models/Post';

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const Posts = await Post.all();
    // const Posts = await Database
    //   .query()
    //   .select('*').from('posts')
    return response.json(Posts);
  }

  public async store({ request, response }: HttpContextContract) {
    const { title, content } = request.all();
    try {
      const post = await Post.create({ title, content });
      return response.json(post);
    } catch (error) {
      return response.status(404).json({ error: 'Post not found' });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params;
    const post = await Post.find(id);
    // const post = await Post.find(id);
    // const post = await Database
    //   .query()
    //   .select('*').from('posts')
    //   .where('id', id)
    //   .first();
    return response.json(post);
  }
  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params;
    const { title, content } = request.all();
    try {
      const post = await Post.findOrFail(id);
      post!.title = title;
      post!.content = content;
      await post!.save();
      return response.json(post);
    } catch (error) {
      return response.status(404).json({ error: 'Post not found' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    try {
      const post = await Post.findOrFail(id);
      await post!.delete();
      return response.json({ message: 'Post deleted' });
    } catch (error) {
      return response.status(404).json({ error: 'Post not found' });
    }
  }
}
