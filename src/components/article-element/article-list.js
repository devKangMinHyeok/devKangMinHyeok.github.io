import * as React from "react"

import ArticleElement from "./article-element"
import { useSearchParams } from "hooks/useSearchParams"

const ArticleList = ({ posts }) => {
  const selectedTag = useSearchParams("tag")

  return (
    <ol style={{ listStyle: `none` }}>
      {posts
        .filter(post => {
          if (selectedTag === null || selectedTag === "All") return true
          if (post.frontmatter?.tags === null) return false
          return post.frontmatter?.tags.includes(selectedTag)
        })
        .map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <ArticleElement
              title={title}
              description={post.frontmatter.description || post.excerpt}
              date={post.frontmatter.date}
              slug={post.fields.slug}
              tags={post.frontmatter.tags}
              key={post.fields.slug}
            />
          )
        })}
    </ol>
  )
}

export default ArticleList
