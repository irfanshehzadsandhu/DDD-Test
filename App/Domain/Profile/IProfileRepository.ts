import ProfileEntity from "./ProfileEntity";
import PaginationData from "../../../Infrastructure/Utils/PaginationData";
import PaginationOptions from "../../../Infrastructure/Utils/PaginationOptions";

export interface IProfileRepository {
  addProfile(profile: ProfileEntity): Promise<void>;

  fetchById(profileId: string): Promise<ProfileEntity>;

  fetchAllProfiles(options: PaginationOptions): Promise<PaginationData<ProfileEntity>>;

  update(profile: ProfileEntity): Promise<void>;

  remove(profileId: string): Promise<void>;
}