import * as React from "react"

export const TagBadge = ({ tag, isActive }) => {
  return (
    <a
      href={`?tag=${tag}`}
      className={isActive ? "article-tag active" : "article-tag"}
    >
      <div>
        <small>{tag}</small>
      </div>
    </a>
  )
}
