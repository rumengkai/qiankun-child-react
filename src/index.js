import "./public-path"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import actions from "./shared/actions"
// import { history } from "umi"
function render(props) {
  // history.listen(({ pathname }) => {
  //   console.log("~~~ pathname", pathname)
  // })
  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }
  const { container } = props
  ReactDOM.render(
    <App />,
    container ? container.querySelector("#root") : document.querySelector("#root")
  )
}

// function storeInit(props) {
//   actions
//   props.onGlobalStateChange(
//     (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
//     true
//   )
//   console.log('123');

//   setInterval(()=>{
//     props.setGlobalState({
//       index: 0
//     })
//   },1000)
// }

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped")
}

export async function mount(props) {
  console.log("[react16] props from main framework", props)
  render(props)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector("#root") : document.querySelector("#root")
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
