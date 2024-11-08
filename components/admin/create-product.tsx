'use client'
import { Formik } from "formik";
import React, { useState } from "react";
import { productScheme } from "util/productSchema";
import { LuUpload } from "react-icons/lu";
import CurrencyInput from "react-currency-input-field";
import cat from "../../public/cat.json";
import cSize from "../../public/colorSize.json";
import { FaSquarePlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { createProductDispatch } from "../../redux/productSlice";
import FileResizer from "react-image-file-resizer";
import { AppDispatch } from "redux/store";
import { ColorSizeType, ProductFormDataType, ValuesType } from "types";

type ImageKey = keyof ImagesState;

interface ImagesState {
  img1: File | null;
  img2: File | null;
  img3: File | null;
}
interface ViewImageState {
  img1: string | null;
  img2: string | null;
  img3: string | null;
}

export default function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const [images, setImages] = useState<ImagesState>({
    img1: null,
    img2: null,
    img3: null,
  });
  const [viewImages,setViewImages] = useState<ViewImageState>({
    img1: null,
    img2: null,
    img3: null,
  })
  const [colorSize, setColorSize] = useState<ColorSizeType[]>([]);
  const [colorSizeInput, setColorSizeInput] = useState<ColorSizeType>({
    weight: "",
    colorName: "",
    colorTagName: "",
    count: 0,
  });

  const [catSubCategory, setCatSubCategory] = useState<{
    main: string | undefined;
    sub: string | undefined;
  }>({ main: "", sub: "" });
  const [subCategoryList, setSubCategoryList] = useState<
    { id: string; name: string; tag: string }[] | undefined
  >([]);

  const _handleSubmit = async (values: ValuesType) => {

    if(images.img1 === null || images.img2 === null || images.img3 === null) {
      return alert('Lütfen resim seçiniz !')
    }

    const formData = new FormData();
  
    const resizeAndAppendImages = async () => {
      const resizePromises = (Object.values(images) as (File | null)[]).map((file) => {
        if (file) {
          return new Promise<File>((resolve, reject) => {
            FileResizer.imageFileResizer(
              file,
              600, // genişlik
              800, // yükseklik
              'JPEG', // format
              80, // kalite
              0, // rotasyon
              (uri) => {
                if (uri instanceof File) {
                  formData.append('image', uri);
                  resolve(uri);
                } else {
                  reject(new Error('Image resizing failed'));
                }
              },
              'file' // çıktı tipi
            );
          });
        }
        return Promise.resolve(null);
      });
  
      await Promise.all(resizePromises);
    };

    await resizeAndAppendImages()
  
    const productData: ProductFormDataType = {
      name: values.name,
      price: parseFloat(values.price),
      stock: colorSize.reduce((total,item)=> { return total + item.count;},0),
      sex: values.sex,
      description: values.description,
      colorSize: colorSize,
      mainCategory: catSubCategory.main,
      subCategory: !catSubCategory.sub ? catSubCategory.main : catSubCategory.sub,
    }
  
    formData.append('productJson', JSON.stringify(productData));
  
    dispatch(createProductDispatch(formData));
  };

  const handleChangeColorSize = (e: React.FormEvent<HTMLSelectElement>) => {
    const [colorName, size, colorTagName] = e.currentTarget.value.split(",") as [string,string,string];
    // colorSizeInput'u güncelle
    setColorSizeInput((prev) => ({
      ...prev,
      colorName: colorName,
      colorTagName: colorTagName,
      weight: size,
    }));
  };

  // colorSizeInput'u colorSize listesine ekleyen fonksiyon
  const handleAddColorSize = () => {
    if(colorSizeInput.count !== 0) {
      setColorSize((prev) => [
        ...prev,
        colorSizeInput // colorSizeInput'u diziye ekler
      ]);
    }else {
      alert('Stok Adet Giriniz !')
    }
    
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imgKey: ImageKey
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = {
        ...viewImages,
        [imgKey]: URL.createObjectURL(file),
      } as ViewImageState;
      setViewImages(updatedImages);
      setImages((prevImages) => ({
        ...prevImages,
        [imgKey]: file, // Dosya nesnesini kaydediyoruz
      }));
    }
  };

  const changeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
    const findCategory = cat.find((c) => c.tag === e.currentTarget.value);
    setCatSubCategory({ ...catSubCategory, main: findCategory?.tag });
    setSubCategoryList(findCategory?.subCategories);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        stock: 0,
        sex: "",
        description: "",
      }}
      onSubmit={_handleSubmit}
      validationSchema={productScheme}
    >
      {({ values, handleChange,setFieldValue, handleSubmit }) => (
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-row justify-center space-x-10">
            {(["img1", "img2", "img3"] as (keyof ViewImageState)[]).map(
              (imgKey, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 border-2 border-dashed cursor-pointer border-gray-300 rounded-lg flex items-center justify-center"
                >
                  <label
                    htmlFor={`image-upload-${imgKey}`}
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                  >
                    {viewImages[imgKey] ? (
                      <img
                        src={viewImages[imgKey]}
                        alt={`Selected ${imgKey}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400">+</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`image-upload-${imgKey}`}
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, imgKey)}
                    className="hidden"
                  />
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 text-sm ">
            <span className="flex gap-y-2 flex-col">
              <label>Ürün Adı</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange("name")}
                className="border rounded-lg p-2 outline-none"
              />
            </span>

            <div className="flex relative gap-y-2 flex-col">
              <label>Fiyat</label>
              <CurrencyInput
                className="border p-2 rounded-lg outline-none"
                id="price"
                name="price"
                value={values.price}
                defaultValue={0}
                decimalsLimit={2}
                onChange={handleChange("price")}
              />
              <span className="absolute bottom-2 right-2">₺</span>
            </div>
          </div>

          <div className="flex flex-row gap-x-4 text-sm">
            <span className="flex flex-col w-2/4 gap-2">
              <label>Ana Kategori</label>
              <select
                onChange={(t) => changeCategory(t)}
                className="border p-2 text-gray-500 rounded-lg text-xs"
              >
                <option defaultChecked>Kategori Seç</option>
                {cat.map((item, index) => (
                  <option key={index} value={item.tag} className="text-gray-400">
                    {item.name}
                  </option>
                ))}
              </select>
            </span>

            <span className="flex flex-col w-2/4 gap-2">
              <label>Alt Kategori</label>
              <select
                disabled={catSubCategory.main === "Elbise"}
                onChange={(t) =>
                  setCatSubCategory({ ...catSubCategory, sub: t.target.value })
                }
                className="border p-2 text-gray-500 text-xs rounded-lg"
              >
                <option defaultChecked>Alt Kategori Seç</option>
                {subCategoryList?.map((item, index) => (
                  <option key={index} value={item.tag} className="text-gray-400">
                    {item.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="w-full flex flex-col text-sm gap-y-2">
            <label>Cinsiyet</label>
                <select onChange={(e)=> setFieldValue('sex',e.currentTarget.value)} className="p-2 border rounded-lg">
                  <option defaultChecked>Cinsiyet Seç</option>
                  <option value='men'>Erkek</option>
                  <option value='women'>Kadın</option>
                  <option value='unisex'>Unisex</option>
                </select>
          </div>
          <div className="flex flex-row gap-x-2">
            <select
              onChange={(t) => handleChangeColorSize(t)}
              className="border p-2 text-gray-500 text-sm rounded-lg w-3/4"
            >
              <option defaultChecked>Renk ve Beden Seçiniz</option>
              {cSize.map((item, index) => (
                <option key={index} value={`${item.tag},${item.size},${item.name}`}>
                  {item.name} - {item.size}
                </option>
              ))}
            </select>
            <input
            type="number"
              value={colorSizeInput?.count}
              required
              onChange={(t) =>
                setColorSizeInput({
                  ...colorSizeInput,
                  count: parseInt(t.currentTarget.value),
                })
              }
              className="border p-2 text-gray-500 text-sm rounded-lg w-1/4"
            />
            <FaSquarePlus
              onClick={() => handleAddColorSize()}
              size={36}
              className="text-blue-600 cursor-pointer"
            />
          </div>

          {colorSize.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-lg">
              <label className="uppercase">
                {item.colorName} - {item.weight} : {item.count}
              </label>
            </div>
          ))}

          <div className="w-full text-sm">
            <label>Açıklama</label>
            <textarea
              rows={7}
              name="description"
              value={values.description}
              onChange={handleChange("description")}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="p-2 border rounded-lg">
            Toplam Stok = {
              colorSize.reduce((total,item)=> {
                return total + item.count;
              },0)
            }
          </div>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="w-full hover:text-white hover:bg-green-400 transition-all border gap-x-2 flex justify-center mt-10 py-2 rounded-lg"
          >
            <LuUpload size={24} /> Kaydet
          </button>
        </div>
      )}
    </Formik>
  );
}
