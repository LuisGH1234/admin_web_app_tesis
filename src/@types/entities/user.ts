export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roleID: number;
    alreadyLoggedIn: boolean;
    exp: number;
}

export interface ILogin {
    token: string;
    user: IUser;
}
