import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import Post from 'App/Models/Post'
import { PostFactory } from 'Database/factories'

export default class PostSeederSeeder extends BaseSeeder {
  public async run() {
    await PostFactory.createMany(3)
  }
}
