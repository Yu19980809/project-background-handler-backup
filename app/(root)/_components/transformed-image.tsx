import Image from 'next/image'
import { Image as ImageType } from '@prisma/client'
import { download } from '@/lib/utils'

interface TransformedImageProps {
  isTransforming: boolean
  image?: ImageType
}

const TransformedImage = ({
  image,
  isTransforming,
}: TransformedImageProps) => {
  return (
  <div className="relative flex flex-col gap-y-4 w-full">
    <div className="flex justify-between items-center h-[30px]">
      <h3 className="font-semibold">Transformed</h3>

      <Image
        src='/assets/icons/download.svg'
        alt="Download"
        width={24}
        height={24}
        className="pb-[6px] cursor-pointer"
        onClick={() => download(image?.transformationURL!)}
      />
    </div>

    {!image && (
      <div className="flex justify-center items-center h-full min-h-72 shadow-inner rounded-md border border-dashed bg-purple-100/20">
        Transformed Image
      </div>
    )}

    {!!image && !!image.transformationURL && (
      <div className="relative">
        <Image
          src={image.transformationURL!}
          alt="Transformed Image"
          width={image.width!}
          height={image.height!}
          className="w-full h-fit min-h-72 p-2 rounded-md border border-dashed bg-purple-100/20 object-cover"
        />

        {isTransforming && (
          <div className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center gap-y-4 rounded-md border bg-black/40 size-full -translate-x-1/2 -translate-y-1/2 z-50">
            <Image
              src='/icons/spinner.svg'
              alt="Spinner"
              width={50}
              height={50}
            />
  
            <p className="text-white/80">Transforming...</p>
          </div>
        )}
      </div>
    )}
  </div>
  )
}

export default TransformedImage
