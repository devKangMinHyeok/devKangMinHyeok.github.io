/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { LinkedinLinkIcon } from "./social-link-icons/linkedin-link-icon"
import { GithubLinkIcon } from "./social-link-icons/github-link-icon"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            linkedin
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-picture.jpeg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      <div>
        {author?.name ? (
          <div>
            <p>
              <strong>{author.name}</strong>
            </p>
            <p>{author?.summary || null}</p>
          </div>
        ) : null}
        <div className="social-link-list">
          {SocialList.map(socialItem => {
            const SocialIcon = socialItem.component
            const socialId = social?.[socialItem.name.toLowerCase()]

            if (!socialId) {
              return null
            }

            return <SocialIcon key={socialItem.name} id={socialId} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Bio

const SocialList = [
  {
    name: "github",
    component: GithubLinkIcon,
  },
  {
    name: "linkedin",
    component: LinkedinLinkIcon,
  },
]
