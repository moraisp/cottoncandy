"use client";
import { Prisma } from "@prisma/client";
import { useState } from "react";

export default function Stock({ initialStocks }: { initialStocks: any[] }) {
  const [stocks, setStocks] = useState<any[]>(initialStocks);
  console.log(stocks);
  return (
    <div className="p-4 border-gray-300  border-l-2 ">
  
      {stocks.map((stock: any, index: number) => (
        <div  className={`flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row ${stock.delete ? 'hidden' : ''}`} key={(stock.id) || 0 + (stock.key || 0)}>
          <input type="hidden" name={`stock[${index}].id`} defaultValue={stock.id} />
          <input type="hidden" name={`stock[${index}].key`} defaultValue={stock.key} />
          <div>
            <label className="font-medium">Tamanho</label>
            <input
              name={`stock[${index}].size`}
              type="text"
              defaultValue={stock.size}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Quantidade</label>
            <input
              name={`stock[${index}].quantity`}
              type="number"
              defaultValue={stock.quantity}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <input onChange={() => {
              if (stock.id) {
                setStocks(stocks.map((stk) => stk.id === stock.id ? { ...stk, delete: true } : stk));
              } else {
                setStocks(stocks.filter((stk) => stk.key !== stock.key));
              }
            }} type="checkbox" name={`stock[${index}].delete`} id={`stock[${index}].delete`} className="peer hidden" />
          <label htmlFor={`stock[${index}].delete`} className="cursor-pointer self-end text-center w-full px-3 py-2 text-white bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">Remover</label>
        </div>
      ))}
      <button className="mt-2 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" onClick={() => setStocks([...stocks, { key: stocks.length + Math.random() }])}>Add stock</button>

    </div>
  );
}
