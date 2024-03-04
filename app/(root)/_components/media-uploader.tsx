import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { Image as ImageType } from '@prisma/client'
import { toast } from 'react-hot-toast'

interface MediaUploaderProps {
  setImage: React.Dispatch<any>
  setIsTransforming: React.Dispatch<boolean>
  image?: ImageType
}

const MediaUploader = ({
  image,
  setImage,
  setIsTransforming
}: MediaUploaderProps) => {
  const onUploadSuccess = (result: any) => {
    setImage((prev: any) => ({
      ...prev,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    setIsTransforming(true)
  }

  const onUploadError = () => {
    toast.error('Something went wrong!')
  }

  return (
    <CldUploadWidget
      uploadPreset="libra_bghandler"
      options={{
        multiple: false,
        resourceType: 'image'
      }}
      onSuccess={onUploadSuccess}
      onError={onUploadError}
    >
      {({ open }) => (
        <div className="flex flex-col gap-y-4 w-full">
          <h3 className="h-[30px] font-semibold">
            Original
          </h3>

          {(!image || !image.secureURL) && (
            <div
              onClick={() => open()}
              className="flex flex-col justify-center items-center gap-2 h-72 shadow-inner rounded-md border border-dashed bg-purple-100/20 font-medium"
            >
              <div className="p-4 shadow-sm shadow-purple-200/50 rounded-lg bg-white">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Uplaod Image"
                  width={24}
                  height={24}
                />
              </div>

              <p>Click here to upload image</p>
              <p className="text-xs text-gray-500">(Up to 12MB)</p>
            </div>
          )}

          {!!image && !!image.secureURL && (
            <div className="rounded-md cursor-pointer">
              <Image
                src={image.secureURL}
                alt="Image"
                width={image.width!}
                height={image.height!}
                className="w-full h-fit min-h-72 p-2 rounded-md border border-dashed bg-purple-100/20 pbject-cover"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
