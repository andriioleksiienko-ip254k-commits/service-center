import { useEffect } from 'react'

// h1 відкритої сторінки та єдиний власник document.title.
// Текст передає сторінка; параметрів маршруту компонент не читає.
export default function PageHeading({ title }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | FixIT Service`
    return () => {
      document.title = previousTitle
    }
  }, [title])

  return <h1>{title}</h1>
}
