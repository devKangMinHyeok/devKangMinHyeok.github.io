import * as React from "react"

import { DisplayTagBadge } from "@components/ui/badge"

const ArticleElementTags = ({ tags }) => {
  if (!tags) {
    return null
  }

  return (
    <div className="article-tags">
      {tags.map((tag, index) => (
        <DisplayTagBadge tag={tag} key={`${tag}.${index}`} />
      ))}
    </div>
  )
}

export default ArticleElementTags
