import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../Domain/User/IUserRepository";
import AppResult from "../Utils/AppResult";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreateUserDTO from "./CreateUserDTO";
import FetchAllUsersDTO from "./FetchAllUsersDTO";
import UpdateUserDTO from "./UpdateUserDTO";
import FetchUserByIdDTO from "./FetchUserByIdDTO";
import RemoveUserDTO from "./RemoveUserDTO";
import UserEntity from "../../Domain/User/UserEntity";

@injectable()
class UserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<AppResult> {
    try {
      createUserDTO.hasAccess();
      const user: UserEntity = createUserDTO.user;
      await this.userRepository.addUser(user.toObject());
      return AppResult.success({message: "User created successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchAllUsers(fetchAllUsersDTO: FetchAllUsersDTO): Promise<AppResult> {
    try {
      const {paginationOptions} = fetchAllUsersDTO;
      fetchAllUsersDTO.hasAccess();
      const response: PaginatedData<UserEntity> = await this.userRepository.fetchAllUsers(paginationOptions);
      return AppResult.success({data: response.getPaginatedData()})
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<AppResult> {
    try {
      updateUserDTO.hasAccess();
      const user: UserEntity = updateUserDTO.user;
      await this.userRepository.update(user.toObject());
      return AppResult.success({message: "User updated successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchUserById(fetchUserByIdDTO: FetchUserByIdDTO): Promise<AppResult> {
    try {
      const {userId} = fetchUserByIdDTO;
      fetchUserByIdDTO.hasAccess();
      const response: UserEntity = await this.userRepository.fetchById(userId);
      return AppResult.success({data: response});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async removeUser(removeUserDTO: RemoveUserDTO): Promise<AppResult> {
    try {
      removeUserDTO.hasAccess();
      await this.userRepository.remove(removeUserDTO.userId);
      return AppResult.success({message: "User deleted Successfully"})
    } catch (err) {
      return AppResult.fail(err.message)
    }
  }
}

export default UserService


