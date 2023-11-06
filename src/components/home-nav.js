import * as React from "react"

const HomeNav = ({ location }) => {
  const curNav = navList.find(nav => nav.path === location.pathname)

  return (
    <nav>
      <ul className="home-nav">
        {navList.map(nav => {
          return (
            <li key={nav.path} className="home-nav-list">
              <a
                href={nav.path}
                className={
                  nav.path === curNav.path
                    ? "active home-nav-link"
                    : "home-nav-link"
                }
              >
                {nav.name}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default HomeNav

const navList = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about/",
  },
]
