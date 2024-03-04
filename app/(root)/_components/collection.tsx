'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Image } from '@prisma/client'
import qs from 'query-string'

import Search from './search'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface CollectionProps {
  currentPage: number
  totalPages: number
  images: Image[]
}

const Collection = ({
  currentPage,
  totalPages = 1,
  images
}: CollectionProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onPageChange = (action: string) => {
    const pageValue = action === 'next'
      ?  currentPage + 1
      : currentPage - 1

    const url = qs.stringifyUrl({
      url: '/',
      query: {
        ...qs.parse(searchParams.toString()),
        page: pageValue
      }
    })

    router.push(url)
  }

  return (
    <>
      <div className="flex flex-col gap-5 mb-6 md:flex-row md:justify-between">
        <h2 className="font-semibold text-dark-600">
          Recent Edits
        </h2>

        <Search />
      </div>

      {images?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:gris-cols-2 xl:grid-cols-3">
          {images.map(image => (
            <Card key={image.id} image={image} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-80 rounded-md border border-dark-400/10 bg-white/20">
          <p className="p-20">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              onClick={() => onPageChange('prev')}
              disabled={currentPage <= 1}
              className="w-32"
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-1 w-fit text-center font-medium">
              {currentPage} / {totalPages}
            </p>

            <Button
              onClick={() => onPageChange('next')}
              disabled={currentPage >= totalPages}
              className="w-32"
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

const Card = ({
  image
}: {
  image: Image
}) => {
  return (
    <li>image</li>
  )
}

export default Collection