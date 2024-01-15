import * as React from "react"

import ArticleElementHeader from "./article-element-header"
import ArticleElementSection from "./article-element-section"
import ArticleElementTags from "./article-element-tags"

const ArticleElement = ({
  title,
  description,
  date,
  slug,
  tags,
  isWriting,
}) => {
  return (
    <li key={slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ArticleElementHeader
          slug={slug}
          title={title}
          date={date}
          isWriting={isWriting}
        />
        <ArticleElementSection description={description} />
        <ArticleElementTags tags={tags} />
      </article>
      <hr />
    </li>
  )
}

export default ArticleElement
