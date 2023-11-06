import * as React from "react"

export const DisplayTagBadge = ({ tag }) => {
  return (
    <div className="display-tag-badge">
      <small># {tag}</small>
    </div>
  )
}
