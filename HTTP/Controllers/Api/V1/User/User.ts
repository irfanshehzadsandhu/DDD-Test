import {injectable,inject} from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import HttpResp from "../../../../../App/Application/Utils/HttpResp";
import UserService from "../../../../../App/Application/User/UserService";
import CreateUserDTO from "../../../../../App/Application/User/CreateUserDTO";
import FetchAllUsersDTO from "../../../../../App/Application/User/FetchAllUsersDTO";
import UpdateUserDTO from "../../../../../App/Application/User/UpdateUserDTO";
import FetchUserByIdDTO from "../../../../../App/Application/User/FetchUserByIdDTO";
import RemoveUserDTO from "../../../../../App/Application/User/RemoveUserDTO";

container.resolve(UserService);

@injectable()
class UserController {

  constructor(@inject("UserService") private userService: UserService) {
  }

  createUser = async (request, response) => {
    const input = new CreateUserDTO(request);
    const httpResponse = await this.userService.createUser(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchAllUsers = async (request, response) => {
    const input = new FetchAllUsersDTO(request);
    const httpResponse = await this.userService.fetchAllUsers(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  updateUser = async (request, response) => {
    const input = new UpdateUserDTO(request);
    const httpResponse = await this.userService.updateUser(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchUserById = async (request, response) => {
    const input = new FetchUserByIdDTO(request);
    const httpResponse = await this.userService.fetchUserById(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  removeUser = async (request, response) => {
    const input = new RemoveUserDTO(request);
    const httpResponse = await this.userService.removeUser(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

}

export default UserController