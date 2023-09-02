import prisma from '@/lib/prisma'; 
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit';

export default function NewProduct() {
    async function create(formData: FormData) {
        'use server'
        
        await prisma.product.create({
             data: {
                name: formData.get('name') as string,
                price: Number(formData.get('price')),
                stock: Number(formData.get('stock')),
                description: formData.get('description') as string,
             }
        });
        console.log('created')
        redirect('/admin/product');
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
                name='name'
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Preço</label>
              <input
                name='price'
                type="number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
            <label className="font-medium">Estoque</label>
            <input
              name='stock'
              type="number"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          </div>
          <div>
            <label className="font-medium">Descrição</label>
            <textarea
              name='description'
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
          <SubmitButton></SubmitButton>
        </form>
      </div>
    </main>
  );
}
