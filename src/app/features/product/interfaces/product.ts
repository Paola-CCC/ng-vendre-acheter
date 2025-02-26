import { IUser } from "@core/interfaces/user";

export interface IProduct {
  id: number | string;
  price: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  brands?: string;
  reduction?: number;
  imgs_url: string[];
  comments?: IComments[];
  seller: IUser,
}

export interface IComments {
  id: string | number,
  body: string,
  postId: string | number,
  likes: number,
  date?: string,
  user: IUser
}

export interface ICategory {
  id?: number | string;
  title?: string,
  label?: string,
  imgSrc?: string,
  slug?: string
}

export interface ICriterias {
  categories: ICategory[],
  brands: string[],
  reduction: number[]
}

export interface ISavingOptions {
  id: number | string,
  description: string,
  reduction: number
}