export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  colorSize: { weight: string; colorName: string; colorTagName:string; count: number }[];
  sex: string;
  images: string[];
  description: string;
};

export type ProductFormDataType = {
  name: string;
  price: number;
  stock: number;
  sex: string;
  description: string;
  colorSize: ColorSizeType[];
  mainCategory: string | undefined;
  subCategory: string | undefined;
};

export type ValuesType = {
    name: string;
    price: string;
    stock: number;
    sex: string,
    description: string;
}

export type ColorSizeType = {
  weight: string;
  colorName: string;
  colorTagName: string;
  count: number;
};

export type Contact = {
  nameSurname: string;
  email: string;
  mobilePhoneNumber: string;
};

export type CartProduct = {
  product: Product;
  quantity: number;
  color: string;
  colorTagName: string;
  size: string;
};

export type OrderValuesType = {
  nameSurname: string,
  addressDetails: string,
  apartment: string,
  postalCode: string,
  email: string,
  phoneNumber: string
}

export type OrderProduct = {
  orderProducts: {
    productId: string;
    productName: string;
    imageUrl: string;
    color: string;
    size: string;
    quantity: number
  }[];
  totalPrice: number;
  nameSurname: string;
  address: {
    city: string;
    state: string;
    apartment: string;
    zipCode: string;
    addressDetails: string
  };
  phoneNumber: string;
  email: string;
  status: string;
  createdAt: string;
  id: string;
}

export type RequestOptions = {
  id?: string;
  controller: string;
  action?: string;
  params?: object;
};

export type Menu = {
  title: string;
  path: string;
};
