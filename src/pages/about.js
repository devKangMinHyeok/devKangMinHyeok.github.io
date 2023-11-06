import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Bio from "@components/bio"
import HomeNav from "@components/home-nav"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <HomeNav location={location} />
    </Layout>
  )
}

export default About

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
