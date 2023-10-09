import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ProductList({
  searchParams: { skip: skipStr = "0", take: takeStr = "10" },
}: {
  searchParams: { take: string; skip: string };
}) {
  const take = Number(takeStr);
  const skip = Number(skipStr);
  const products = await prisma.product.findMany({
    take: take,
    skip: skip,
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.product.count();

  const currentPage = skip > 0 ? Math.ceil(skip / take) + 1 : 1;
  const totalPages = Math.ceil(total / take);
  let pages: (number | string)[] = new Array(Math.ceil(total / take))
    .fill(0)
    .map((_, i) => i + 1);
  pages = [
    ...pages.slice(0, 3),
    ...(totalPages > 6 ? ["..."] : []),
    ...pages.slice(3).slice(-3),
  ];

  return (
    <>
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">id</th>
              <th className="py-3 pr-6">nome</th>
              <th className="py-3 pr-6">código</th>
              <th className="py-3 pr-6">preço</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {products.map((item, idx: number) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.code}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  R${(item.price).toFixed(2)}
                </td>
                <td className="text-right whitespace-nowrap">
                  <Link
                    href={`/admin/product/${item.id}/edit`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/admin/product/${item.id}/view`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Vizualizar
                  </Link>
                  <button
                    type="button"
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Vizualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
        <div className="hidden justify-between text-sm md:flex">
          <div>
            {skip}-{take + skip} de {total}
          </div>
          <div className="flex items-center gap-12" aria-label="Pagination">
            {currentPage > 1 ? (
              <Link
                href={{
                  query: {
                    skip: skip - take,
                  },
                }}
              >
                Anterior
              </Link>
            ) : null}
            <ul className="flex items-center gap-1">
              {pages.map((item, idx) => (
                <li key={item}>
                  {item == "..." ? (
                    <div>{item}</div>
                  ) : (
                    <Link
                      href={{ query: { skip: take * (Number(item) - 1) } }}
                      aria-current={currentPage == item ? "page" : false}
                      className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${
                        currentPage == item
                          ? "bg-indigo-600 text-white font-medium"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={{
                query: {
                  skip: skip + take,
                },
              }}
              className="hover:text-indigo-600"
            >
              Próximo
            </Link>
          </div>
        </div>
        {/* On mobile version */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
          {currentPage > 1 ? (
            <Link
              href={{
                query: {
                  skip: skip - take,
                },
              }}
            >
              Anterior
            </Link>
          ) : null}
          <div className="font-medium">SHOWING 1-10 OF 120</div>
          <Link
            href={{
              query: {
                skip: skip + take,
              },
            }}
            className="hover:text-indigo-600"
          >
            Próximo
          </Link>
        </div>
      </div>
    </>
  );
}
