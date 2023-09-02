import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ProductList({
  searchParams: { skip = "0", take = "2" },
}: {
  searchParams: { take: string; skip: string };
}) {
  const products = await prisma.product.findMany({
    take: Number(take),
    skip: Number(skip),
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.product.count();
  console.log(total)
  const currentPage = Math.ceil(Number(skip) / Number(take));
  const totalPages = Math.ceil(total / Number(take));
  let pages: (number|string)[] = new Array(Math.ceil(total / Number(take))).fill(0).map((_, i) => i + 1);
  pages = [...pages.slice(0, 3), ...(totalPages > 6 ? ['...'] : [] ), ...pages.slice(3).slice(-3)];
  console.log(pages)
  return (
    <>
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">id</th>
              <th className="py-3 pr-6">nome</th>
              <th className="py-3 pr-6">descrição</th>
              <th className="py-3 pr-6">data</th>
              <th className="py-3 pr-6">status</th>
              <th className="py-3 pr-6">estoque</th>
              <th className="py-3 pr-6">preço</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {products.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.description}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.createdAt.toLocaleString()}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.isActive
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {item.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.stock}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  R${(item.price / 100).toFixed(2)}
                </td>
                <td className="text-right whitespace-nowrap">
                  <Link
                    href={`/admin/product/${item.id}`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
        <div className="hidden justify-between text-sm md:flex">
          <div>SHOWING 1-10 OF 120</div>
          <div className="flex items-center gap-12" aria-label="Pagination">
            <a href="javascript:void(0)" className="hover:text-indigo-600">
              Previous
            </a>
            <ul className="flex items-center gap-1">
              {pages.map((item, idx) => (
                <li key={item}>
                  {item == "..." ? (
                    <div>{item}</div>
                  ) : (
                    <a
                      // href="javascript:void(0)"
                      aria-current={currentPage == item ? "page" : false}
                      className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${
                        currentPage == item
                          ? "bg-indigo-600 text-white font-medium"
                          : ""
                      }`}
                    >
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <a  className="hover:text-indigo-600">
              Next
            </a>
          </div>
        </div>
        {/* On mobile version */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
          <a
            href="javascript:void(0)"
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Previous
          </a>
          <div className="font-medium">SHOWING 1-10 OF 120</div>
          <a
            href="javascript:void(0)"
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </div>
    </>
  );
}
