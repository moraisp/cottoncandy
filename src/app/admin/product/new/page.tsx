import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/utils/submit";
import { Prisma } from "@prisma/client";
import Stock from "./stock";
import set from "lodash/set";

export default function NewProduct() {
  async function create(formData: FormData) {
    "use server";
    const data = {} as any;
    formData.forEach(function (value, key) {
      set(data, key, value);
    });
    console.log(data);
    const images = formData.getAll("image") as File[];

    const productImages: Prisma.ProductImageCreateManyProductInput[] =
      await Promise.all(
        images
          .filter((x) => x.size)
          .map(
            async (image) =>
              ({
                blob: Buffer.from(await image.arrayBuffer()),
              } satisfies Prisma.ProductImageCreateManyProductInput)
          )
      );

    const productStocks: Prisma.ProductStockCreateManyProductInput[] =
      data.stock.map(
        (stock: any) =>
          ({
            size: stock.size,
            quantity: Number(stock.quantity),
            soldQuantity: 0,
          } satisfies Prisma.ProductStockCreateManyProductInput)
      );

    await prisma.product.create({
      data: {
        name: data.name,
        code: data.code,
        price: Number(data.price),
        description: data.description,
        ProductStock: {
          createMany: {
            data: productStocks,
          },
        },
        ProductImage: {
          createMany: {
            data: productImages,
          },
        },
      },
    });
    redirect("/admin/product");
  }

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Novo Produto
            </h3>
          </div>
        </div>
        <form action={create} className="space-y-5">
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Nome</label>
              <input
                name="name"
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Código</label>
              <input
                name="code"
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Preço</label>
              <input
                name="price"
                type="number"
                step={0.01}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="font-medium">Descrição</label>
            <textarea
              name="description"
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
          <div>
            <label className="font-medium">Estoque</label>
            <Stock />
          </div>
          <div>
            <label className="font-medium">Imagem</label>
            <input
              name="image"
              type="file"
              multiple
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <SubmitButton></SubmitButton>
        </form>
      </div>
    </main>
  );
}
