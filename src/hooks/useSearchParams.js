import * as React from "react"

export const useSearchParams = key => {
  const [searchParams, SetSearchParams] = React.useState(new URLSearchParams())

  React.useEffect(() => {
    SetSearchParams(new URLSearchParams(window.location.search))
  }, [])

  return searchParams.get(key)
}
