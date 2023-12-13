export interface UserInterface {
    id:number
    name?: string;
    email: string;
    password: string;
    code?:string;
    role?:number;
    expiration?:string;
    token: string;
    auth: boolean;
}

export interface RouteInterface {
    component?: string;
    checker?: string;
}