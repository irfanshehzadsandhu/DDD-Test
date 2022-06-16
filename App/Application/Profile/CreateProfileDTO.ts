import BaseDTO from "../Utils/BaseDTO";
import ProfileEntity from "../../Domain/Profile/ProfileEntity";

class CreateProfileDTO extends BaseDTO {
  public profileId: string;
  public profile: ProfileEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.profileId = ProfileEntity.generateId();
    this.profile = ProfileEntity.create(params);
  }

}

export default CreateProfileDTO;