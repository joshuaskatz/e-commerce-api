import { ClothingCategories, StandardSizing, UserRoles } from "./enums";

export interface ResponseError {
  message: string;
}

export interface AuthPayload {
  userId: string;
  iat: number;
  exp: number;
}

export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  resetToken?: string | null;
  role?: UserRoles;
}

export interface ProductInterface {
  _id: string;
  brand: string;
  name: string;
  categories: [ClothingCategories];
  sizes: [StandardSizing | number];
  price: number;
  details: string;
  images: string;
}
