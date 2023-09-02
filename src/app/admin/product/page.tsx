
import Link from 'next/link';
import ProductList from './product.list';
import { useSearchParams } from 'next/navigation';

export default function Admin({ searchParams }: { searchParams: any }) {

  return (
    <main>
       <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Produtos
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link href="/admin/product/new"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Adicionar
                    </Link>
                </div>
            </div>
            <ProductList searchParams={searchParams}/>
        </div>


    </main>
  )
}
