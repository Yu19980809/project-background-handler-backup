import Footer from './_components/footer'
import Navbar from './_components/navbar'

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col h-fit min-h-screen">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default HomeLayout