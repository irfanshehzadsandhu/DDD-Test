
import BaseEntity from "../BaseEntity";
class ProfileEntity extends BaseEntity {
   public profileId: string;               
    public bio: string;               
    public userId: string;       
 
   constructor(profileId: string, bio: string, userId: string) {
     super();   
     this.profileId = profileId;   
     this.bio = bio;   
     this.userId = userId;   
   }

   static createFromInput(obj): ProfileEntity {
     const profile  = new ProfileEntity(obj.profileId, obj.bio, obj.userId);
     return profile; 
   }
   
   static createFromDb(obj): ProfileEntity {
     const profile  = new ProfileEntity(obj.profileId, obj.bio, obj.userId);
     profile.setDates(obj.createdAt, obj.updatedAt);
     return profile; 
   }


}
export default ProfileEntity;