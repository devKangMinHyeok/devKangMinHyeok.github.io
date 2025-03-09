import * as React from "react"
import styled from "styled-components"

const AboutInfo = () => {
  return (
    <Container>
      <ContentSection>
        <Description>
          비즈니스에 관심이 많은 프로덕트 엔지니어입니다.
        </Description>
      </ContentSection>

      <ExperienceGrid>
        <ExperienceCard>
          <h3>Career</h3>
          <h4>VCNC (타다)</h4>
          <p>Web Front-end Developer</p>
          <p>2024.01 ~ 재직중</p>
        </ExperienceCard>

        <ExperienceCard>
          <h3>Experience</h3>
          <h4>소프트웨어 마에스트로 14기</h4>
          <p>연수생 (우수 프로젝트 선정)</p>
          <p>2023.04 ~ 2023.12</p>
          <p>신규입사자 온보딩 SaaS 개발</p>
        </ExperienceCard>

        <ExperienceCard>
          <h3>Study</h3>
          <h4>UNIST (울산과학기술원)</h4>
          <p>컴퓨터 공학과</p>
          <p>2018.02 ~ 2025.02</p>
        </ExperienceCard>
      </ExperienceGrid>
    </Container>
  )
}

export default AboutInfo

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const ContentSection = styled.div`
  margin-bottom: 1rem;
`

const Description = styled.p`
  color: #333;
  line-height: 1.6;
  /* margin-bottom: 1rem; */
`

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  /* margin-top: 1rem; */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ExperienceCard = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    /* margin-bottom: 0.2rem; */
  }

  h4 {
    font-size: 1.1rem;
    color: #666;
    /* margin-bottom: 0.5rem; */
  }

  p {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
`
