import * as React from "react"
import { Link } from "gatsby"

const ArticleElementHeader = ({ slug, title, date }) => {
  return (
    <header>
      <h2>
        <Link to={slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <small>{date}</small>
    </header>
  )
}

export default ArticleElementHeader
