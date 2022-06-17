import {inject, injectable} from "tsyringe";
import {IProfileRepository} from "../../Domain/Profile/IProfileRepository";
import AppResult from "../Utils/AppResult";
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

  async createProfile(createProfileDTO: CreateProfileDTO): Promise<AppResult> {
    try {
      createProfileDTO.hasAccess();
      const profile: ProfileEntity = createProfileDTO.profile;
      await this.profileRepository.addProfile(profile.toObject());
      return AppResult.success({message: "Profile created successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchAllProfiles(fetchAllProfilesDTO: FetchAllProfilesDTO): Promise<AppResult> {
    try {
      const {paginationOptions} = fetchAllProfilesDTO;
      fetchAllProfilesDTO.hasAccess();
      const response: PaginatedData<ProfileEntity> = await this.profileRepository.fetchAllProfiles(paginationOptions);
      return AppResult.success({data: response.getPaginatedData()});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO): Promise<AppResult> {
    try {
      updateProfileDTO.hasAccess();
      const profile: ProfileEntity = updateProfileDTO.profile;
      await this.profileRepository.update(profile.toObject());
      return AppResult.success({message: "Profile updated successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchProfileById(fetchProfileByIdDTO: FetchProfileByIdDTO): Promise<AppResult> {
    try {
      const {profileId} = fetchProfileByIdDTO;
      fetchProfileByIdDTO.hasAccess();
      const response: ProfileEntity = await this.profileRepository.fetchById(profileId);
      return AppResult.success({data: response});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async removeProfile(removeProfileDTO: RemoveProfileDTO): Promise<AppResult> {
    try {
      removeProfileDTO.hasAccess();
      await this.profileRepository.remove(removeProfileDTO.profileId);
      return AppResult.success({message: "Profile deleted Successfully"})
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }
}

export default ProfileService


