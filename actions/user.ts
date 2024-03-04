'use server'

import { db } from '@/lib/db'

export const updateCredits = async (
  userId: string,
  creditBalance: number,
  creditFee: number
) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        creditBalance: creditBalance - creditFee
      }
    })

    return { success: 'ok' }
  } catch (error) {
    console.log('ERROR_UPDATE_CREDITS', error)
    throw new Error('Internal Error')
  }
}

export const getUserByClerkId = async (clerkId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { clerkId }
    })

    return user
  } catch (error) {
    return null
  }
}
