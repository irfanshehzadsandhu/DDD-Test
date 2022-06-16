import {container} from "tsyringe";
//interface
import {IProfileRepository} from "../../Domain/Profile/IProfileRepository";
import {IPostRepository} from "../../Domain/Post/IPostRepository";
import {IUserRepository} from "../../Domain/User/IUserRepository";
//component
import ProfileRepository from "../MySQLRepository/ProfileRepository";
import PostRepository from "../MySQLRepository/PostRepository";
import UserRepository from "../MySQLRepository/UserRepository";
//utilizer
import ProfileService from "../../Application/Profile/ProfileService";
import PostService from "../../Application/Post/PostService";
import UserService from "../../Application/User/UserService";

//i-binding
container.registerSingleton<IProfileRepository>('ProfileRepository', ProfileRepository);
container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
//s-binding
container.registerSingleton<ProfileService>('ProfileService', ProfileService);
container.registerSingleton<PostService>('PostService', PostService);
container.registerSingleton<UserService>('UserService', UserService);

export default container;