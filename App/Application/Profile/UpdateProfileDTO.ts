import BaseDTO from "../Utils/BaseDTO";
import ProfileEntity from "../../Domain/Profile/ProfileEntity";

class UpdateProfileDTO extends BaseDTO {
  public profile: ProfileEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.profileId = request.params.profileId
    this.profile = ProfileEntity.create(params)
  }
}

export default UpdateProfileDTO;