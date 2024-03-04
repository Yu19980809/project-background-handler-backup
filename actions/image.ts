'use server'

import { Image } from '@prisma/client'

import { db } from '@/lib/db'

export const saveImage = async (
  userId: string,
  image: Partial<Image>
) => {
  try {
    await db.image.create({
      // @ts-ignore
      data: {
        ...image,
        author: {
          connect: { id: userId }
        }
      }
    })

    return { success: 'ok' }
  } catch (error) {
    console.log('ERROR_SAVE_IMAGE', error)
    throw new Error('Internal Error')
  }
}
