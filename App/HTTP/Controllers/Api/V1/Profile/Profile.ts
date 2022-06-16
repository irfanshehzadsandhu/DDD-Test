import {inject, injectable} from "tsyringe";
import HttpResp from "../../../../../Application/Utils/HttpResp";
import ProfileService from "../../../../../Application/Profile/ProfileService";
import CreateProfileDTO from "../../../../../Application/Profile/CreateProfileDTO";
import FetchAllProfilesDTO from "../../../../../Application/Profile/FetchAllProfilesDTO";
import UpdateProfileDTO from "../../../../../Application/Profile/UpdateProfileDTO";
import FetchProfileByIdDTO from "../../../../../Application/Profile/FetchProfileByIdDTO";
import RemoveProfileDTO from "../../../../../Application/Profile/RemoveProfileDTO";
import container from "../../../../../Infrastructure/IocContainer/container";

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