import {injectable,inject} from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import HttpResp from "../../../../../App/Application/Utils/HttpResp";
import PostService from "../../../../../App/Application/Post/PostService";
import CreatePostDTO from "../../../../../App/Application/Post/CreatePostDTO";
import FetchAllPostsDTO from "../../../../../App/Application/Post/FetchAllPostsDTO";
import UpdatePostDTO from "../../../../../App/Application/Post/UpdatePostDTO";
import FetchPostByIdDTO from "../../../../../App/Application/Post/FetchPostByIdDTO";
import RemovePostDTO from "../../../../../App/Application/Post/RemovePostDTO";

container.resolve(PostService);

@injectable()
class PostController {

  constructor(@inject("PostService") private postService: PostService) {
  }

  createPost = async (request, response) => {
    const input = new CreatePostDTO(request);
    const httpResponse = await this.postService.createPost(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchAllPosts = async (request, response) => {
    const input = new FetchAllPostsDTO(request);
    const httpResponse = await this.postService.fetchAllPosts(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  updatePost = async (request, response) => {
    const input = new UpdatePostDTO(request);
    const httpResponse = await this.postService.updatePost(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchPostById = async (request, response) => {
    const input = new FetchPostByIdDTO(request);
    const httpResponse = await this.postService.fetchPostById(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  removePost = async (request, response) => {
    const input = new RemovePostDTO(request);
    const httpResponse = await this.postService.removePost(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

}

export default PostController