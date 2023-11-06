import * as React from "react"
import { GithubIcon } from "@svg-icons"

export const GithubLinkIcon = ({ id }) => {
  return (
    <a href={`https://www.github.com/${id}/`} target="_blank">
      <GithubIcon />
    </a>
  )
}
