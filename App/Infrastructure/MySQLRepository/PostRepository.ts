import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import PostEntity from "../../Domain/Entities/Post/PostEntity";
import PaginationData from "../Utils/PaginationData";
import {IPostRepository} from "../../Domain/Entities/Post/IPostRepository";
import {injectable} from "tsyringe";

const Post = prisma.post;

@injectable()
class PostRepository implements IPostRepository {

  async addPost(post: PostEntity): Promise<void> {
    await Post.create({
      data: post
    });
  }

  async fetchAllPosts(paginationOptions): Promise<PaginationData<PostEntity>> {
    const count = await Post.count();
    const postObjs = await Post.findMany({
      skip: paginationOptions.offset(),
      take: paginationOptions.limit(),
    })
    const paginationData: PaginationData<PostEntity> = new PaginationData<PostEntity>(paginationOptions, count)
    postObjs.forEach(postObj => {
      const post = PostEntity.createFromDb(postObj);
      paginationData.addItem(post)
    });
    return paginationData;
  }

  async fetchById(postId: string): Promise<any> {
    const postObj = await Post.findUnique({
      where: {
        postId: postId,
      },
    })
    if (!postObj) {
      throw new Error("Invalid Post details");
    }
    return PostEntity.createFromDb(postObj);
  }

  async update(post: PostEntity): Promise<void> {
    await Post.update({
      where: {
        postId: post.postId,
      },
      data: post    })
  }

  async remove(postId: string): Promise<void> {
    await Post.delete({
      where: {
        postId: postId,
      },
    })
  }

}

export default PostRepository;

