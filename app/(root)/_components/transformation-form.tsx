'use client'

import { useEffect, useState } from 'react'
import { Image } from '@prisma/client'

import MediaUploader from './media-uploader'
import TransformedImage from './transformed-image'
import { updateCredits } from '@/actions/user'
import { creditFee } from '@/constants'
import { saveImage } from '@/actions/image'

interface TransformationFormProps {
  type: string
  userId?: string
  creditBalance?: number
  data?: Image
}

const TransformationForm = ({
  type,
  userId,
  creditBalance,
  data
}: TransformationFormProps) => {
  const [image, setImage] = useState(data)
  const [isTransforming, setIsTransforming] = useState(false)

  const transform = async () => {
    if (!isTransforming) return

    const baseUrl = process.env.NEXT_PUBLIC_BRIA_API_BASE_URL!
    const token = process.env.NEXT_PUBLIC_BRIA_API_KEY!

    const registerRes = await fetch(
      `${baseUrl}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_token: token
        },
        body: JSON.stringify({
          image_url: image?.secureURL
        })
      }
    )
  
    const { visual_id } = await registerRes.json()
    let url = `${baseUrl}/${visual_id}/background`
    let fee

    if (type === 'removal') {
      url += '/remove'
      fee = creditFee.removal
    }

    if (type === 'blur') {
      url += '/blur'
      fee = creditFee.blur
    }

    const transformedRes = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          api_token: token
        }
      }
    )

    const { image_res } = await transformedRes.json()

    setImage((prev: any) => ({
      ...prev,
      transformationType: type,
      transformationURL: image_res
    }))

    setIsTransforming(false)

    await updateCredits(userId!, creditBalance!, fee!)
    await saveImage(userId!, {
      ...image,
      transformationType: type,
      transformationURL: image_res
    })
  }

  useEffect(() => {
    transform()
  }, [isTransforming])

  return (
    <div className="flex flex-col gap-8 pt-10 md:flex-row md:justify-between">
      <MediaUploader
        image={image}
        setImage={setImage}
        setIsTransforming={setIsTransforming}
      />

      <TransformedImage
        image={image}
        isTransforming={isTransforming}
      />
    </div>
  )
}

export default TransformationForm
