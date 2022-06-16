import {inject, injectable} from "tsyringe";
import {IProfileRepository} from "../../Domain/Profile/IProfileRepository";
import HttpResp from "../Utils/HttpResp";
import HttpStatusCode from "../Utils/HttpStatusCode";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreateProfileDTO from "./CreateProfileDTO";
import FetchAllProfilesDTO from "./FetchAllProfilesDTO";
import UpdateProfileDTO from "./UpdateProfileDTO";
import FetchProfileByIdDTO from "./FetchProfileByIdDTO";
import RemoveProfileDTO from "./RemoveProfileDTO";
import ProfileEntity from "../../Domain/Profile/ProfileEntity";

@injectable()
class ProfileService {
  constructor(@inject("ProfileRepository") private profileRepository: IProfileRepository) {
  }

  async createProfile(createProfileDTO: CreateProfileDTO): Promise<HttpResp> {
    try {
      createProfileDTO.hasAccess();
      const profile: ProfileEntity = createProfileDTO.profile;
      await this.profileRepository.addProfile(profile.toObject());
      return HttpResp.create(HttpStatusCode.OK, {message: "Profile created successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchAllProfiles(fetchAllProfilesDTO: FetchAllProfilesDTO): Promise<HttpResp> {
    try {
      const {paginationOptions} = fetchAllProfilesDTO;
      fetchAllProfilesDTO.hasAccess();
      const response: PaginatedData<ProfileEntity> = await this.profileRepository.fetchAllProfiles(paginationOptions);
      return HttpResp.create(HttpStatusCode.OK, {data: response.getPaginatedData()})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO): Promise<HttpResp> {
    try {
      updateProfileDTO.hasAccess();
      const profile: ProfileEntity = updateProfileDTO.profile;
      await this.profileRepository.update(profile.toObject());
      return HttpResp.create(HttpStatusCode.OK, {message: "Profile updated successfully"});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async fetchProfileById(fetchProfileByIdDTO: FetchProfileByIdDTO): Promise<HttpResp> {
    try {
      const {profileId} = fetchProfileByIdDTO;
      fetchProfileByIdDTO.hasAccess();
      const response: ProfileEntity = await this.profileRepository.fetchById(profileId);
      return HttpResp.create(HttpStatusCode.OK, {data: response});
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message});
    }
  }

  async removeProfile(removeProfileDTO: RemoveProfileDTO): Promise<HttpResp> {
    try {
      removeProfileDTO.hasAccess();
      await this.profileRepository.remove(removeProfileDTO.profileId);
      return HttpResp.create(HttpStatusCode.OK, {message: "Profile deleted Successfully"})
    } catch (err) {
      return HttpResp.create(HttpStatusCode.ERROR, {status: "error", message: err.message})
    }
  }
}

export default ProfileService


