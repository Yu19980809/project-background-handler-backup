import { SignInButton, UserButton, auth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getUserByClerkId } from '@/actions/user'

const Actions = async () => {
  const { userId } = auth()
  const user = await getUserByClerkId(userId!)

  return (
    <div className="flex justify-end items-center">
      {!userId ? (
        <SignInButton>
          <Button size="sm">
            Login
          </Button>
        </SignInButton>
      ) : (
        <div className="flex justify-end items-center gap-x-4">
          <Badge className="py-2">
            {user?.creditBalance} { user?.creditBalance === 1 ? 'Credit' : 'Credits' }
          </Badge>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  )
}

export default Actions