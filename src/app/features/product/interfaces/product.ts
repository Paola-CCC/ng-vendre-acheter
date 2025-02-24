export interface IProduct {
  id: number | string;
  price: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  brands: string;
  reduction?: number;
  imgs_url: string[];
}

export interface ICategory {
    id?: number | string;
    title?: string,
    label?: string,
    imgSrc?: string,
    slug?: string
} 

export interface ICriterias {
    categories:ICategory[],
    brands:string[],
    reduction: number[]
} 

export interface ISavingOptions {
  id: number | string,
  description: string,
  reduction: number
}