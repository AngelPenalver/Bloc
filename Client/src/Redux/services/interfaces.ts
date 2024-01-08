export interface UserAttributesData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  
  export interface UserData {
    token: string;
    status: "idle" | "loading" | "succeeded" | "rejected";
    status_deleteCode: "idle" | "loading" | "succeeded" | "rejected";
    status_deleteAccount: "idle" | "loading" | "succeeded" | "rejected";
    status_mailForgotPassword: "idle" | "loading" | "succeeded" | "rejected";
    status_ForgotPassword: "idle" | "loading" | "succeeded" | "rejected";
    isAuthenticated: boolean;
    error: string | undefined | null | unknown;
    userId: string | null;
    userData: UserAttributesData | null;

  }
  
  export interface changePasswordAttribute {
    userId: string;
    newPassword: string;
    oldPassword: string;
  }
  
  export interface deleteAccountAttribute {
    userId: string;
    verificationCode: string;
  }
  export interface deleteSendCodeAttribute {
    userId: string;
  }
  export interface InputData {
    email: string;
    password: string;
  }
  
  export interface DataSendMailForgotPassword {
    email: string;
  }
  
  export interface DataForgotPassword {
    email: string;
    verificationCode: string;
    newPassword: string;
  }