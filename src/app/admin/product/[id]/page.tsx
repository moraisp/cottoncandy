import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/utils/submit";
import { Prisma } from "@prisma/client";
import Stock from "./stock";
import set from "lodash/set";

export default async function NewProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  async function edit(formData: FormData) {
    "use server";
    const images = formData.getAll("image") as File[];
    const data = {} as any;
    
    formData.forEach(function (value, key) {
      set(data, key, value);
    });
    console.log(data);

    const productImages: Prisma.ProductImageCreateManyProductInput[] =
      await Promise.all(
        images.filter(x => x.size).map(async (image) => ({
          blob: Buffer.from(await image.arrayBuffer()),
        }))
      );

      const createProductStocks: Prisma.ProductStockCreateManyProductInput[] = data.stock.filter((x: any) => x.key).map(
        (stock: any) =>
          ({
            size: stock.size,
            quantity: Number(stock.quantity),
            soldQuantity: 0,
          } satisfies Prisma.ProductStockCreateManyProductInput)
      );

      const updateProductStocks: Prisma.ProductStockCreateManyProductInput[] = data.stock.filter((x: any) => x.id && !x.delete).map(
        (stock: any) =>
          ({
            id: Number(stock.id),
            size: stock.size,
            quantity: Number(stock.quantity),
            soldQuantity: 0,
          } satisfies Prisma.ProductStockCreateManyProductInput)
      );
      

    await prisma.$transaction([...updateProductStocks.map(stock => {
      return prisma.productStock.update({
        where: {
          id: Number(stock.id),
        },
        data: stock
      })
    }), prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        code: data.code,
        price: Number(data.price),
        description: data.description,
        ProductStock: {
          createMany: {
            data: createProductStocks
          },
          deleteMany: {
            id: { in: data.stock.filter((x: any) => x.id && x.delete).map((x: any) => Number(x.id)) }
          }
        },
        ProductImage: {
          deleteMany: {
            id: { in: formData.getAll("remove-image").map((id) => Number(id)) },
          },
          createMany: {
            data: productImages,
          },
        },
      },
    })]);
    redirect("/admin/product");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      ProductImage: true,
      ProductStock: true,
    },
  });

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Produto {id}
            </h3>
          </div>
        </div>
        <form action={edit} className="space-y-5">
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Nome</label>
              <input
                name="name"
                type="text"
                defaultValue={product?.name}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Preço</label>
              <input
                name="price"
                min="0.00" max="10000.00" step="0.01"
                type="number"
                defaultValue={product?.price}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
         
          </div>
          <div>
            <label className="font-medium">Descrição</label>
            <textarea
              name="description"
              defaultValue={product?.description ?? ""}
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
          <div>
              <label className="font-medium">Estoque</label>
              <Stock initialStocks={product?.ProductStock ?? []}/>
            </div>
          <div>
            <label className="font-medium">Imagem</label>
            <div className="items-start gap-1 md:flex">
              {product?.ProductImage.map((image) => (
                <div className="relative" key={image.id.toString()}>
                  <input
                    type="checkbox"
                    id={image.id.toString()}
                    className="peer hidden"
                    name="remove-image"
                    value={image.id.toString()}
                  />
                   <label htmlFor={image.id.toString()} className="top-1 right-1 absolute text-center cursor-pointer px-3 py-2 text-white bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150 peer-checked:hidden">Remover</label>
                  <Image
                    src={`data:image/jpeg;base64, ${image.blob.toString(
                      "base64"
                    )}`}
                    className="peer-checked:hidden"
                    alt={image.id.toString()}
                    width={150}
                    height={150}
                  />
                </div>
              ))}
            </div>
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
