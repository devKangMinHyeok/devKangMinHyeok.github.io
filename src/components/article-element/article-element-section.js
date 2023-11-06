import * as React from "react"

const ArticleElementSection = ({ description }) => {
  return (
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        itemProp="description"
      />
    </section>
  )
}

export default ArticleElementSection
