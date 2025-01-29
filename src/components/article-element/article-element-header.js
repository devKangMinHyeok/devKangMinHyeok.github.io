import * as React from "react"
import { Link } from "gatsby"

const ArticleElementHeader = ({ slug, title, date, isWriting }) => {
  return (
    <header>
      <h2>
        {isWriting && (
          <div className="is-writing">
            <small>작성중</small>
          </div>
        )}
        <Link to={slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <div>
        <div>
          <small>{date}</small>
        </div>
      </div>
    </header>
  )
}

export default ArticleElementHeader
