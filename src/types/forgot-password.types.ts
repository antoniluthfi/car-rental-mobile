export interface IParamForgotPasswordRequest {
    email: string;
}

export interface IResultForgotPasswordRequest {
    token: string;
    session: string;
}