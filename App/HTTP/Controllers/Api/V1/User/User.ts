import {inject, injectable} from "tsyringe";
import container from "../../../../../Infrastructure/IocContainer/container";
import HttpResp from "../../../../../Application/Utils/HttpResp";
import UserService from "../../../../../Application/User/UserService";
import CreateUserDTO from "../../../../../Application/User/CreateUserDTO";
import FetchAllUsersDTO from "../../../../../Application/User/FetchAllUsersDTO";
import UpdateUserDTO from "../../../../../Application/User/UpdateUserDTO";
import FetchUserByIdDTO from "../../../../../Application/User/FetchUserByIdDTO";
import RemoveUserDTO from "../../../../../Application/User/RemoveUserDTO";

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