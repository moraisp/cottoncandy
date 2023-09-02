import Navigation from './navigation';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navigation />
      {children}
    </section>
  )
}
