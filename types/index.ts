export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    colors: {color:string,count:number}[],
    sex: string;
    slug: string;
    images: {url:string}[];
    description: string;
    size: {size:string,count:number}[];
}

export type Menu = {
    title: string,
    path: string
}