import * as React from "react"

import { TagBadge } from "@components/ui/badge"
import { useSearchParams } from "hooks/useSearchParams"

const TagSelector = ({ tags }) => {
  const selectedTag = useSearchParams("tag")

  return (
    <div className="tag-list">
      <TagBadge
        tag="All"
        isActive={selectedTag === null || selectedTag === "All"}
      />
      {tags.map((tag, index) => {
        return (
          <TagBadge
            tag={`${tag.fieldValue}`}
            key={`${tag}.${index}`}
            isActive={selectedTag === `${tag.fieldValue}`}
          />
        )
      })}
    </div>
  )
}

export default TagSelector
