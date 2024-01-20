/* Datos del objeto Usuario */


export interface User{
   
   
    id?: number,
    name?: string,
    email: string,
    password?:string,
    password_confirmation?:string,
    api_token?:string,
    avatar:string
    givenName?: string,
    primera_vez?: number,
    familyName?: any;
    role_id?:any;
    seguidor?: boolean;
    FollowsCurrentUser?: number;
    description?: string,
    user_location?: string,
    user_flag?:string,
    IsCurrentUser?: boolean;
}