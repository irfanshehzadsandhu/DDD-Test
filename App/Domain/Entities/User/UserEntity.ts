
import BaseEntity from "../BaseEntity";
class UserEntity extends BaseEntity {
   public userId: string;               
    public email: string;               
    public name: string;       
 
   constructor(userId: string, email: string, name: string) {
     super();   
     this.userId = userId;   
     this.email = email;   
     this.name = name;   
   }

   static createFromInput(obj): UserEntity {
     const user  = new UserEntity(obj.userId, obj.email, obj.name);
     return user; 
   }
   
   static createFromDb(obj): UserEntity {
     const user  = new UserEntity(obj.userId, obj.email, obj.name);
     user.setDates(obj.createdAt, obj.updatedAt);
     return user; 
   }


}
export default UserEntity;