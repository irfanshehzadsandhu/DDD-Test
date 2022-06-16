import {inject, injectable} from "tsyringe";
import {IPostRepository} from "../../Domain/Post/IPostRepository";
import HttpResp from "../Utils/HttpResp";
import HttpStatusCode from "../Utils/HttpStatusCode";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreatePostDTO from "./CreatePostDTO";
import FetchAllPostsDTO from "./FetchAllPostsDTO";
import UpdatePostDTO from "./UpdatePostDTO";
import FetchPostByIdDTO from "./FetchPostByIdDTO";
import RemovePostDTO from "./RemovePostDTO";
import PostEntity from "../../Domain/Post/PostEntity";

@injectable()
class PostService {
  constructor(@inject("PostRepository") private postRepository: IPostRepository) {
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<HttpResp> {
    try {
      createPostDTO.hasAccess();
      const post: PostEntity = createPostDTO.post;
      await this.postRepository.addPost(post.toObject());
      return HttpResp.create(HttpStatusCode.OK, {message: "Post created successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchAllPosts(fetchAllPostsDTO: FetchAllPostsDTO): Promise<HttpResp> {
    try {
      const {paginationOptions} = fetchAllPostsDTO;
      fetchAllPostsDTO.hasAccess();
      const response: PaginatedData<PostEntity> = await this.postRepository.fetchAllPosts(paginationOptions);
      return HttpResp.create(HttpStatusCode.OK, {data: response.getPaginatedData()})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<HttpResp> {
    try {
      updatePostDTO.hasAccess();
      const post: PostEntity = updatePostDTO.post;
      await this.postRepository.update(post.toObject());
      return HttpResp.create(HttpStatusCode.OK, {message: "Post updated successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchPostById(fetchPostByIdDTO: FetchPostByIdDTO): Promise<HttpResp> {
    try {
      const {postId} = fetchPostByIdDTO;
      fetchPostByIdDTO.hasAccess();
      const response: PostEntity = await this.postRepository.fetchById(postId);
      return HttpResp.create(HttpStatusCode.OK, {data: response});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async removePost(removePostDTO: RemovePostDTO): Promise<HttpResp> {
    try {
      removePostDTO.hasAccess();
      await this.postRepository.remove(removePostDTO.postId);
      return HttpResp.create(HttpStatusCode.OK, {message: "Post deleted Successfully"})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message})
    }
  }
}

export default PostService


