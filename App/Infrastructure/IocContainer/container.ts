import {container} from "tsyringe";
import {IUserRepository} from "../../Domain/Entities/User/IUserRepository";
import UserRepository from "../MySQLRepository/UserRepository";
import UserService from "../../Application/User/UserService";
import {IPostRepository} from "../../Domain/Entities/Post/IPostRepository";
import PostRepository from "../MySQLRepository/PostRepository";
import {IProfileRepository} from "../../Domain/Entities/Profile/IProfileRepository";
import ProfileRepository from "../MySQLRepository/ProfileRepository";
import PostService from "../../Application/Post/PostService";
import ProfileService from "../../Application/Profile/ProfileService";

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IProfileRepository>('ProfileRepository', ProfileRepository);
container.registerSingleton<UserService>('UserService', UserService);
container.registerSingleton<PostService>('PostService', PostService);
container.registerSingleton<ProfileService>('ProfileService', ProfileService);

export default container