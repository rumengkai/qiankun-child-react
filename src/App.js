import React, { lazy, Suspense, useState, useMemo } from "react"
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom"
import { Divider } from "antd"

import "antd/dist/antd.min.css"
import "./App.css"

import LibVersion from "./components/LibVersion"
import HelloModal from "./components/HelloModal"
import Home from "./pages/Home"
import { sendIndex, watchIndex } from "./utils/actions"

const About = lazy(() => import("./pages/About"))

const RouteExample = () => {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? "/child-react" : "/"}>
      <nav>
        <Link to="/home">Home</Link>
        <Divider type="vertical" />
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default function App() {
  const [number, setNumber] = useState(0)
  useMemo(() => {
    watchIndex((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：number 改变前的值为 ", prevState.index)
      console.log("主应用观察者：登录状态发生改变，改变后的 number 的值为 ", state.index)
      setNumber(state.index)
    }, true)
  }, [])
  return (
    <div className="app-main">
      <button
        onClick={() => {
          sendIndex(number + 2)
        }}
      >
        add2
      </button>
      {number}
      <br></br>
      <button
        onClick={() => {
          window.history.pushState(null, null, "/#/child-vue/about")
        }}
      >
        goVueAbout
      </button>
      <LibVersion />
      <HelloModal />

      <Divider />

      <RouteExample />
    </div>
  )
}
