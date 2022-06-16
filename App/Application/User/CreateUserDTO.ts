import BaseDTO from "../Utils/BaseDTO";
import UserEntity from "../../Domain/Entities/User/UserEntity";

class CreateUserDTO extends BaseDTO {
  public userId: string;
  public user: UserEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.userId = UserEntity.generateId();
    this.user = UserEntity.createFromInput(params);
  }

}

export default CreateUserDTO;