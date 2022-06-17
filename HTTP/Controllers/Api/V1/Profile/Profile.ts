import {injectable,inject} from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import ProfileService from "../../../../../App/Application/Profile/ProfileService";
import CreateProfileDTO from "../../../../../App/Application/Profile/CreateProfileDTO";
import FetchAllProfilesDTO from "../../../../../App/Application/Profile/FetchAllProfilesDTO";
import UpdateProfileDTO from "../../../../../App/Application/Profile/UpdateProfileDTO";
import FetchProfileByIdDTO from "../../../../../App/Application/Profile/FetchProfileByIdDTO";
import RemoveProfileDTO from "../../../../../App/Application/Profile/RemoveProfileDTO";
import AppResultAdaptor from "../../../../../App/Infrastructure/Utils/AppResultAdaptor";

container.resolve(ProfileService);

@injectable()
class ProfileController {

  constructor(@inject("ProfileService") private profileService: ProfileService) {
  }

  createProfile = async (request, response) => {
    const input = new CreateProfileDTO(request);
    const appResult = await this.profileService.createProfile(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  fetchAllProfiles = async (request, response) => {
    const input = new FetchAllProfilesDTO(request);
    const appResult = await this.profileService.fetchAllProfiles(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  updateProfile = async (request, response) => {
    const input = new UpdateProfileDTO(request);
    const appResult = await this.profileService.updateProfile(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  fetchProfileById = async (request, response) => {
    const input = new FetchProfileByIdDTO(request);
    const appResult = await this.profileService.fetchProfileById(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  removeProfile = async (request, response) => {
    const input = new RemoveProfileDTO(request);
    const appResult = await this.profileService.removeProfile(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

}

export default ProfileController