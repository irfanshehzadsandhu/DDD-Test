import {injectable,inject} from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import HttpResp from "../../../../../App/Application/Utils/HttpResp";
import ProfileService from "../../../../../App/Application/Profile/ProfileService";
import CreateProfileDTO from "../../../../../App/Application/Profile/CreateProfileDTO";
import FetchAllProfilesDTO from "../../../../../App/Application/Profile/FetchAllProfilesDTO";
import UpdateProfileDTO from "../../../../../App/Application/Profile/UpdateProfileDTO";
import FetchProfileByIdDTO from "../../../../../App/Application/Profile/FetchProfileByIdDTO";
import RemoveProfileDTO from "../../../../../App/Application/Profile/RemoveProfileDTO";

container.resolve(ProfileService);

@injectable()
class ProfileController {

  constructor(@inject("ProfileService") private profileService: ProfileService) {
  }

  createProfile = async (request, response) => {
    const input = new CreateProfileDTO(request);
    const httpResponse = await this.profileService.createProfile(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchAllProfiles = async (request, response) => {
    const input = new FetchAllProfilesDTO(request);
    const httpResponse = await this.profileService.fetchAllProfiles(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  updateProfile = async (request, response) => {
    const input = new UpdateProfileDTO(request);
    const httpResponse = await this.profileService.updateProfile(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  fetchProfileById = async (request, response) => {
    const input = new FetchProfileByIdDTO(request);
    const httpResponse = await this.profileService.fetchProfileById(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

  removeProfile = async (request, response) => {
    const input = new RemoveProfileDTO(request);
    const httpResponse = await this.profileService.removeProfile(input);
    HttpResp.convertToExpress(response, httpResponse);
  }

}

export default ProfileController