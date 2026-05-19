import { useEffect } from 'react'

type PageMetaProps = {
  title: string
}

export function PageMeta({ title }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | BisaExcel.com`
  }, [title])

  return null
}
