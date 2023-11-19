---
title: React Suspense 제대로 알아보기
date: "2023-11-16"
description: React Suspense를 제대로 사용하는 법과 내부 동작 원리를 파헤치기
tags: [JS, React]
series: React Deep dive
---

## 목차

- [React Suspense가 등장한 배경](#React-Suspense가-등장한-배경)
  - [React Suspense가 등장한 배경](#React-Suspense가-등장한-배경)

## React Suspense가 등장한 배경

### 공식 문서에서 배경 읽어보기

가장 먼저, React Suspense가 등장한 배경을 알기 위해서 React 공식문서로 접근해본다.

[React Suspense 공식 문서](https://react.dev/reference/react/Suspense)

문서에서 Suspense를 검색해서 바로 보이는 화면은 아래와 같다.
![Alt text](image-1.png)

`< Suspense >` 라는 컴포넌트로, `< SomeComponent />` 를 감싸고 있고,
`< Suspense >` 컴포넌트에는 **fallback**이라는 props에 `< Loading />` 이라는 컴포넌트를 넣고 있다.

> EN) `< Suspense >` lets you display a fallback until its children have finished loading.

> KOR) `< Suspense >` 는 그 자식 컴포넌트가 로딩 상태가 종료될 때 까지 fallback을 보여주도록 한다.

이라고 말하며, Suspense의 역할과 기능을 소개한다.

그 외에는 딱히 어떤 배경에서 이 기능을 만들게 되었는지에 대해 설명해주는 단락이 보이지는 않는다.
단지, Suspense에 해당하는 공식 문서의 내용은 Suspense 자체에 대한 사용법과 안내사항들이 나열되어 있다.

그래서 따로 도입 배경을 찾아보기로 했다.

## Suspense 그 이전에 React Concurrent Feature부터

Suspense의 등장 배경을 이해하기 위해서는 기본적으로, React v18의 핵심인 **Concurrent Feature**에 대해 이해하고 있어야 한다.

React는 기본적으로 JS 위에서 동작하고, JS는 기본적으로 single thread로 동작한다. 그 말은 즉, **React는 기본적으로 렌더링 동작이 일어나고 있을 때 main thread를 점령**하게 되고, 이 때문에 **진행중인 작업이 다 완료**되어야지만, user event와 같은 **interaction**에 대한 작업을 수행할 수 있다.

이 부분은 당연하게도 사용자 경험에 악영향을 끼칠 수 있고, web worker를 활용하여 다른 thread를 사용하는 우회 방법도 있지만, 결국 React에서 렌더링의 우선순위를 유연하게 설계할 수 없다는 점은 분명한 한계였다.

React Rendering 과정의 문제점들을 해결하기 위해, React의 코어팀은 **async rendering**이라는 개념을 소개하더니, 이후 점차 발전시켜 **Concurrent Feature**를 v18부터 적극적으로 밀고 있다.

### React의 Rendering은 원래 멈출 수 없어

지금 이야기하는 Concurrent Rendering과는 달리, 기본적으로 따로 처리를 하지 않는다면, React의 Rendering은 한번 시작하면 중단할 수 없다.

별도로, debounce나 throttle과 같은 방법을 통해, 일정 시간 주기로 실행하거나 대기하도록 만드는 등의 방식으로 우회 전략을 세울 수도 있겠으나, 확실한 해결책은 될 수 없는 임시방편일 뿐이다.

이 문제를 제대로 해결하려면, Rendering 과정에 관여하여, Rendering 중단과 재개를 개발자가 컨트롤 할 수 있어야 한다.

그런데, Concurrent Rendering을 opt-in으로 도입하기 시작하면서, 이제 React를 사용하는 개발자들에게 선택권이 주어지게 된다. 바로, 이제는 React Rendering의 순서에 개입할 수 있게 된 것이다.

React v17에서 v18로 넘어가면서, Root에서 React App Component를 렌더링하는 방식이 아래와 같이 바뀌었다.

`v17`

```jsx
import ReactDOM from "react-dom"
import App from "App"

const container = document.getElementById("app")

ReactDOM.render(<App />, container)
```

`v18`

```jsx
import ReactDOM from "react-dom"
import App from "App"

const container = document.getElementById("app")

const root = ReactDOM.createRoot(container)

root.render(<App />)
```

코드상의 차이는 크지 않지만, createRoot라는 새로운 API를 도입하면서, React v18의 기능에 접근할 수 있는 열쇠로 사용하였다.

createRoot API를 사용해야, concurrent feature를 사용할 수 있다.

### React v18이 Rendering에 관여하는 법

먼저 간단하게 React가 렌더링되는 방식을 짚고 넘어가보자.
사실 내부적으로 상당히 복잡하기 때문에, 이번 포스트에서는 간단히만 짚고 넘어가보겠다.

일단 [클래스 라이프 사이클 메소드 다이어그램](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)을 살펴보면, 다이어그램을 확인할 수 있다.

[리액트의 렌더링은 어떻게 일어나는가?](https://yceffort.kr/2022/04/deep-dive-in-react-rendering) 이 글은 React Rendering 과정을 정말 잘 정리해놓아서, 참고하면 좋다.

React는 컴포넌트 렌더링을 수행한 이후에 Virtual DOM에 변경사항을 반영한다. 이러한 일련의 과정을 Reconciliation이라고 한다. 그리고 React는 Render Phase와 Commit Phase로 나뉜다. Render Phase에서는 컴포넌트를 렌더링하고, 변경 사항을 계산하는 작업을 수행하고, Commit Phase는 DOM에 변경사항을 적용하는 과정을 수행한다.

이때, 계산된 모든 과정을 실제 DOM에 적용하는 과정은 동기 시퀀스로 수행된다.

## Reference

1. [Suspense in React 18: How it works, and how you can use it - By Peter Kellner | October 09, 2022](https://www.pluralsight.com/blog/software-development/suspense-react-18-explained)
2. [Concurrent React - jay·2022년 8월 4일](https://velog.io/@jay/Concurrent-React)
3. [리액트 18의 신기능 - 동시성 렌더링(Concurrent Rendering), 자동 일괄 처리(Automatic Batching) 등 - 2023년 2월 23일 Translator: Jeong Won Yoo Author: Shruti Kapoor (English)](https://www.freecodecamp.org/korean/news/riaegteu-18yi-singineung-dongsiseong-rendeoring-concurrent-rendering-jadong-ilgwal-ceori-automatic-batching-deung/)
4. [리액트의 렌더링은 어떻게 일어나는가?](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)
5. [Understanding React Reconciliation in React 18: A Deep Dive](https://medium.com/@souviksen093/understanding-react-reconciliation-in-react-18-a-deep-dive-16b083e5592a)
