export interface User {
  _id: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

export const EnumProfileFormMode = {
  VIEW: "view",
  EDIT: "edit",
};

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  state: string;
  city: string;
};
