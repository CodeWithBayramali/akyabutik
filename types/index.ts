export type Product = {
    id: String;
    name: String;
    price: Number;
    category: String;
    color:[],
    sex: String;
    slug: String;
    images: String[];
    description: String;
    size: {
        name: String;
        title: String;
    }[];
}

export type Menu = {
    title: string,
    path: string
}