
export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav className="bg-pink-300 mb-2 w-full border-b md:border-0 md:static">
          <div className="items-center p-10 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
            Algodão Doce
          </div>
        </nav>
      {children}
    </section>
  )
}
