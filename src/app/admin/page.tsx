import Image from 'next/image'
import prisma from '@/lib/prisma';
import ProductList from './product.list';
import { Suspense } from 'react';

export default async function Admin() {
  return (
    <main>
      <h1>Admin</h1>
      <Suspense fallback={<h1>Loading</h1>} >
        <ProductList />
      </Suspense>
     

    </main>
  )
}
