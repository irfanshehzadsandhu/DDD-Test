import AppError from "../../../HTTP/Errors/AppError";

class BaseDTO {
  //public role: RoleType;
  //public allowedRoles: Array<RoleType> = [Roles.SuperAdmin];
  public allowedRoles = []
  constructor(request) {
    //this.role = request.user ? request.user.role : '';
  }

  hasAccess() {
    // if (!this.allowedRoles.includes(this.role)) {
    //   throw new AppError("You are not authorized to perform this action.", 400);
    // }
  }

}

export default BaseDTO;