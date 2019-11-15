import { Images } from './images.model';
export class User {

    phone: string;
    password: string;
    newPassword: string;
    otp: string;
    image: Images;
    firstName: string;
    lastName: string;
    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.phone = obj.phone;
        this.password = obj.password;
        this.newPassword = obj.newPassword;
        this.image = obj.image;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
    }
}