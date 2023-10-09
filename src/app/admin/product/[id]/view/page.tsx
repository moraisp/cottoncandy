import prisma from "@/lib/prisma";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default async function NewProduct({
  params: { id },
}: {
  params: { id: string };
}) {
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
              <Link href={`/product/${product?.guid}`}>
                {id} - {product?.name}
              </Link>
            </h3>
          </div>
        </div>
        <div className="py-2 border-b-2 border-gray-200/75 border-solid">
          <div>
            <label className="text-gray-500 font-medium">Nome</label>
            <label className="w-full mt-2 px-3 py-2">{product?.name}</label>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Preço</label>
            <label className="w-full mt-2 px-3 py-2">R$ {product?.price}</label>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Descrição</label>
            <label className="w-full mt-2 px-3 py-2">
              {product?.description}
            </label>
          </div>
        </div>
        <div className="py-2 border-b-2 border-gray-200/75 border-solid">
          <label className="text-gray-500 font-medium">Estoque</label>
          <div className=" shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">tamanho</th>
                  <th className="py-3 px-6">quantidade</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {product?.ProductStock.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <label className="text-gray-500 font-medium">Imagem</label>
          <div className="items-start gap-1 flex">
            {product?.ProductImage.map((image) => (
              <div key={image.id.toString()}>
                <Image
                  src={`data:image/jpeg;base64, ${image.blob.toString(
                    "base64"
                  )}`}
                  alt={image.id.toString()}
                  width={150}
                  height={150}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
