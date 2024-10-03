export type Product = {
    id: String;
    name: String;
    price: Number;
    category: String;
    colors: {color:String,count:Number}[],
    sex: String;
    slug: String;
    images: {url:String}[];
    description: String;
    size: {size:String,count:Number}[];
}

export type Menu = {
    title: String,
    path: String
}