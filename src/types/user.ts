export type ParamEditUser = {
  name: string;
  photo_ktp: string;
  photo_license: string;
  photo_profile: string;
  password: string;
};

export type ParamChangePassword = {
  old_password: string;
  new_password: string;
  pass_confirmation: string;
};

export type ParamUploadFile = {
  file: any;
  name: 'photo_ktp' | 'photo_license' | 'photo_profile';
}