import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "@components/bio"
import Layout from "@components/layout"
import Seo from "@components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Article post={post} />
      <FooterNav previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

const Article = ({ post }) => {
  return (
    <article
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <hr />
      <footer>
        <Bio />
      </footer>
    </article>
  )
}

const FooterNav = ({ previous, next }) => {
  return (
    <nav className="blog-post-nav">
      <ul
        style={{
          display: `flex`,
          width: `100%`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          gap: `10px`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        {previous && <PostLink post={previous} rel="prev" />}
        {next && <PostLink post={next} rel="next" />}
      </ul>
    </nav>
  )
}

const PostLink = ({ post, rel }) => {
  return (
    <li style={{ flex: 1 }}>
      <Link
        to={post.fields.slug}
        rel={rel}
        style={{
          display: "block",
          borderRadius: "5px",
          padding: "20px",
          textDecoration: `none`,
          color: "black",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "gray",
              marginBottom: "5px",
              fontSize: "14px",
            }}
          >
            {rel === "prev" ? (
              <div>← Prev</div>
            ) : (
              <div
                style={{
                  textAlign: "right",
                }}
              >
                Next →
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            <div>
              {rel === "prev" ? (
                <div> {post.frontmatter.title}</div>
              ) : (
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  {post.frontmatter.title}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
