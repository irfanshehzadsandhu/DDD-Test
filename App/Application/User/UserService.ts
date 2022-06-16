import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../Domain/Entities/User/IUserRepository";
import HttpResp from "../Utils/HttpResp";
import HttpStatusCode from "../Utils/HttpStatusCode";
import PaginationData from "../../Infrastructure/Utils/PaginationData";
import CreateUserDTO from "./CreateUserDTO";
import FetchAllUsersDTO from "./FetchAllUsersDTO";
import UpdateUserDTO from "./UpdateUserDTO";
import FetchUserByIdDTO from "./FetchUserByIdDTO";
import RemoveUserDTO from "./RemoveUserDTO";
import UserEntity from "../../Domain/Entities/User/UserEntity";
import UserRepository from "../../Infrastructure/MySQLRepository/UserRepository";

@injectable()
class UserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<HttpResp> {
    try {
      createUserDTO.hasAccess();
      const user: UserEntity = createUserDTO.user;
      await this.userRepository.addUser(user.toObject());
      return HttpResp.create(HttpStatusCode.OK, {status: "success", message: "User created successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchAllUsers(fetchAllUsersDTO: FetchAllUsersDTO): Promise<HttpResp> {
    try {
      const {paginationOptions} = fetchAllUsersDTO;
      fetchAllUsersDTO.hasAccess();
      const response: PaginationData<UserEntity> = await this.userRepository.fetchAllUsers(paginationOptions);
      return HttpResp.create(HttpStatusCode.OK, {status: "success", data: response.getPaginatedData()})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<HttpResp> {
    try {
      updateUserDTO.hasAccess();
      const user: UserEntity = updateUserDTO.user;
      await this.userRepository.update(user.toObject());
      return HttpResp.create(HttpStatusCode.OK, {status: "success", message: "User updated successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchUserById(fetchUserByIdDTO: FetchUserByIdDTO): Promise<HttpResp> {
    try {
      const {userId} = fetchUserByIdDTO;
      fetchUserByIdDTO.hasAccess();
      const response: UserEntity = await this.userRepository.fetchById(userId);
      return HttpResp.create(HttpStatusCode.OK, {status: "success", data: response});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async removeUser(removeUserDTO: RemoveUserDTO): Promise<HttpResp> {
    try {
      removeUserDTO.hasAccess();
      await this.userRepository.remove(removeUserDTO.userId);
      return HttpResp.create(HttpStatusCode.OK, {status: "success", message: "User deleted Successfully"})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message})
    }
  }
}

export default UserService


