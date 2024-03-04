import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-hot-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const download = async (url: string) => {
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one!')
  }

  fetch(url)
    .then(res => {
      const a = document.createElement('a')
      a.href=res.url
      document.body.appendChild(a)
      a.click()
    })
    .catch((error: any) => {
      console.log('ERROR_DOWNLOAD', error)
      toast.error('Something went wrong!')
    })
}
