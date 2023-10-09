import prisma from "@/lib/prisma";
import Image from "next/image";
import CupomModal from "./modal";
import CupomButton from "./modal";

export default async function NewProduct({
  params: { guid },
  searchParams: { code },
}: {
  params: { guid: string };
  searchParams: { code: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      guid,
    },
    include: {
      ProductImage: true,
      ProductStock: true,
    },
  });

  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
            <Image
              className="w-full h-full object-cover"
              height={500}
              width={500}
              src={`data:image/jpeg;base64, ${product?.ProductImage[0]?.blob.toString(
                "base64"
              )}`}
              alt={`Image for ${product?.name}`}
            />
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold mb-2 justify-center">
            {product?.name}
          </h2>
          <div className="flex flex-row gap-2">
            <h3
              className={`text-4xl font-bold mb-2 ${
                product.code === code ? "" : "line-through"
              }`}
            >
              R$ {product?.discount}
            </h3>
            <h3
              className={`text-2xl font-bold mb-2 ${
                product.code !== code ? "" : "line-through"
              }`}
            >
              R$ {product?.price}
            </h3>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-700">Select Size:</span>
            <div className="flex items-center mt-2">
              {product?.ProductStock.map((stock, index) => (
                <div key={stock.id}>
                  <input
                    type="radio"
                    name={`selectStock`}
                    id={stock.id.toString()}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={stock.id.toString()}
                    className="cursor-pointer bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 peer-checked:bg-gray-500"
                  >
                    {stock.size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mt-2">{product?.description}</p>
          </div>
          <div className="flex -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <CupomButton productCode={product.code} />
            </div>
            <div className="w-1/2 px-2">
              <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
