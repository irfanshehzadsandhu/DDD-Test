import BaseDTO from "../Utils/BaseDTO";
import PostEntity from "../../Domain/Entities/Post/PostEntity";

class UpdatePostDTO extends BaseDTO {
  public post: PostEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.postId = request.params.postId
    this.post = PostEntity.createFromInput(params)
  }
}

export default UpdatePostDTO;