import BaseDTO from "../Utils/BaseDTO";
import ProfileEntity from "../../Domain/Entities/Profile/ProfileEntity";

class CreateProfileDTO extends BaseDTO {
  public profileId: string;
  public profile: ProfileEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.profileId = ProfileEntity.generateId();
    this.profile = ProfileEntity.createFromInput(params);
  }

}

export default CreateProfileDTO;