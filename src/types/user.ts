export type ParamEditUser = {
  name: string;
  photo_ktp: string;
  photo_license: string;
  password: string;
};

export type ParamChangePassword = {
  old_password: string;
  new_password: string;
  pass_confirmation: string;
};
