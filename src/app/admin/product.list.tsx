import Image from 'next/image'
import prisma from '@/lib/prisma';

export default async function ProductList() {
  const products = await prisma.product.findMany();
  return (
    <>
      <h1>Products {products.length}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}
