import * as React from "react"
import ArticleElementHeader from "./article-element-header"
import ArticleElementSection from "./article-element-section"

const ArticleElement = ({ title, description, date, slug, tag }) => {
  return (
    <li key={slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ArticleElementHeader slug={slug} title={title} date={date} />
        <ArticleElementSection description={description} />
        <small>{tag}</small>
      </article>
      <hr />
    </li>
  )
}

export default ArticleElement
