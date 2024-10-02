import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "sex",
      title: "Cinsiyet",
      type: "string",
    },
    {
      name: "color",
      title: "Color",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Health", value: "health" },
          { title: "Education", value: "education" },
          { title: "Finance", value: "finance" },
          { title: "Lifestyle", value: "lifestyle" },
        ],
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "size",
      title: "Size",
      type: "object",
      fields: [
        { name: "xs", type: "string", title: "XS" },
        { name: "sm", type: "string", title: "SM" },
        { name: "md", type: "string", title: "MD" },
        { name: "lg", type: "string", title: "LG" },
        { name: "xl", type: "string", title: "XL" },
        { name: "xxl", type: "string", title: "XXL" },
        { name: "xxxl", type: "string", title: "XXXL" },
      ],
    },
  ],
});
