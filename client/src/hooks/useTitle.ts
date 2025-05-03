import { useEffect } from 'react'

// On component load, set the title to the given string
const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  })
}

export default useTitle
