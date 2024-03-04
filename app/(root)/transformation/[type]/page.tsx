import { getUserByClerkId } from '@/actions/user'
import Header from '@/components/header'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import TransformationForm from '../../_components/transformation-form'

const Transformation = async ({
  params: { type }
}: {
  params: { type: string }
}) => {
  const { userId } = auth()

  if (!userId) redirect('sign-in')

  const user = await getUserByClerkId(userId!)

  return (
    <>
      <Header />

      <section className="mt-10">
        <TransformationForm
          type={type}
          userId={user?.id}
          creditBalance={user?.creditBalance!}
        />
      </section>
    </>
  )
}

export default Transformation
