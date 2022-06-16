import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import ProfileEntity from "../../Domain/Entities/Profile/ProfileEntity";
import PaginationData from "../Utils/PaginationData";
import {IProfileRepository} from "../../Domain/Entities/Profile/IProfileRepository";
import {injectable} from "tsyringe";

const Profile = prisma.profile;

@injectable()
class ProfileRepository implements IProfileRepository {

  async addProfile(profile: ProfileEntity): Promise<void> {
    await Profile.create({
      data: profile
    });
  }

  async fetchAllProfiles(paginationOptions): Promise<PaginationData<ProfileEntity>> {
    const count = await Profile.count();
    const profileObjs = await Profile.findMany({
      skip: paginationOptions.offset(),
      take: paginationOptions.limit(),
    })
    const paginationData: PaginationData<ProfileEntity> = new PaginationData<ProfileEntity>(paginationOptions, count)
    profileObjs.forEach(profileObj => {
      const profile = ProfileEntity.createFromDb(profileObj);
      paginationData.addItem(profile)
    });
    return paginationData;
  }

  async fetchById(profileId: string): Promise<any> {
    const profileObj = await Profile.findUnique({
      where: {
        profileId: profileId,
      },
    })
    if (!profileObj) {
      throw new Error("Invalid Profile details");
    }
    return ProfileEntity.createFromDb(profileObj);
  }

  async update(profile: ProfileEntity): Promise<void> {
    await Profile.update({
      where: {
        profileId: profile.profileId,
      },
      data: profile    })
  }

  async remove(profileId: string): Promise<void> {
    await Profile.delete({
      where: {
        profileId: profileId,
      },
    })
  }

}

export default ProfileRepository;

