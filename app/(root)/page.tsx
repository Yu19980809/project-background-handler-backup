import React from 'react'
import Collection from './_components/collection'

const Home = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = Number(searchParams?.page) || 1
  const searchQuery = (searchParams?.query as string) || ''

  return (
    <div>
      <div>Banner</div>

      <section className="mt-12">
        <Collection
          currentPage={currentPage}
          totalPages={2}
          images={[]}
        />
      </section>
    </div>
  )
}

export default Home