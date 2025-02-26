export interface IUser {
    id?: number | string,
    password?: string,
    email?: string,
    username?: string,
    fullName?: string,
    likes:number;
    profilePicture?: string,
    status?: string,
    reviewsCount?: number,
    adCount?: number,
    gender?: string,
    image?: string,
    accessToken?: string,
    refreshToken?:string,
    firstName?: string,
    lastName?: string
}
