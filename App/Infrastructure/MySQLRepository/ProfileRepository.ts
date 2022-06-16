import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import ProfileEntity from "../../Domain/Profile/ProfileEntity";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import {IProfileRepository} from "../../Domain/Profile/IProfileRepository";
import {injectable} from "tsyringe";

const Profile = prisma.profile;

@injectable()
class ProfileRepository implements IProfileRepository {

  async addProfile(profile: ProfileEntity): Promise<void> {
    await Profile.create({
      data: profile
    });
  }

  async fetchAllProfiles(paginationOptions): Promise<PaginatedData<ProfileEntity>> {
    const count = await Profile.count();
    const profileObjs = await Profile.findMany({
      skip: paginationOptions.offset(),
      take: paginationOptions.limit(),
    })
    const paginatedData: PaginatedData<ProfileEntity> = new PaginatedData<ProfileEntity>(paginationOptions, count)
    profileObjs.forEach(profileObj => {
      const profile = ProfileEntity.create(profileObj);
      paginatedData.addItem(profile)
    });
    return paginatedData;
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
    return ProfileEntity.create(profileObj);
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

