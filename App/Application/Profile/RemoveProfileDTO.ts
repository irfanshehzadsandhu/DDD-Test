import BaseDTO from "../Utils/BaseDTO";

class RemoveProfileDTO extends BaseDTO {
  public profileId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = [];
    this.profileId = request.params.profileId;
  }
}

export default RemoveProfileDTO;