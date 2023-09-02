import prisma from '@/lib/prisma'; 
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit';

export default async function NewProduct({ params: { id } }: { params: { id: string } }) {
    async function edit(formData: FormData) {
        'use server'
        
        await prisma.product.update({
            where: {
              id: Number(id),
            },
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
  
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
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
                name='name'
                type="text"
                defaultValue={product?.name}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Preço</label>
              <input
                name='price'
                type="number"
                defaultValue={product?.price}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
            <label className="font-medium">Estoque</label>
            <input
              name='stock'
              type="number"
              defaultValue={product?.stock}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          </div>
          <div>
            <label className="font-medium">Descrição</label>
            <textarea
              name='description'
              defaultValue={product?.description ?? ''}
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
          <SubmitButton></SubmitButton>
        </form>
      </div>
    </main>
  );
}
