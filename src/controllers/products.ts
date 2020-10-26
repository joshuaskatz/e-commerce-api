import { Response, Request } from "express";

import { Product, ProductDocument } from "../models/product";
import { UserDocument } from "../models/user";
import { ProductInterface, ResponseError } from "../types";

//Add filters: categories, size, brand, price, name
export const getProducts = (req: Request, res: Response) => {
  Product.find()
    .then(
      (
        products: ProductDocument[]
      ): Response<UserDocument[] | ResponseError> => {
        if (!products) {
          return res.send({
            message: "Could not find any products",
          });
        }
        return res.json(products);
      }
    )
    .catch((e) => console.log(e));
};

export const createProduct = async (req: Request, res: Response) => {
  const files = req.files as Array<any>;

  const images = files.map((file: Express.Multer.File) => {
    return file.id;
  });
  const product: ProductInterface = {
    ...req.body,
    images,
  };

  Product.create(product)
    .then(
      (product: ProductDocument | null): Response<ResponseError | null> => {
        if (!product) {
          return res.send({
            message: "Could not create product.",
          });
        }
        return res.json(product);
      }
    )
    .catch((e) => console.log(e));
};
