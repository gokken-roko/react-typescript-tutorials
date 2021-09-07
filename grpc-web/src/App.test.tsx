import React from "react"
import Enzyme, { shallow } from "enzyme"
import App from "./App"
import Adapter from "enzyme-adapter-react-16"

// Should use adapter-react-17
// https://github.com/enzymejs/enzyme/issues/2429
Enzyme.configure({ adapter: new Adapter() })

describe("<App />", () => {
  test("Ok", () => {
    const app = shallow(<App />)
    expect(app.exists()).toBe(true)

    const echo = app.find("Echo")
    expect(echo.exists()).toBe(true)
  })
})
