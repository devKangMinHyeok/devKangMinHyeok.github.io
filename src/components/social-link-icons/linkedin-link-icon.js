import * as React from "react"

import { LinkedinIcon } from "@svg-icons"

export const LinkedinLinkIcon = ({ id }) => {
  return (
    <a
      href={`https://www.linkedin.com/in/${id}/`}
      target="_blank"
      rel="noreferrer"
    >
      <LinkedinIcon />
    </a>
  )
}
