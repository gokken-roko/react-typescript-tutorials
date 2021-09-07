/* eslint-disable @typescript-eslint/no-unused-vars */
// コメントアウトあるので、eslint の ignore ルールを暫定的に追加
import React from "react"
import * as grpcWeb from "grpc-web"
import Enzyme, { mount, shallow } from "enzyme"
import Echo from "./Echo"
import { EchoClient } from "./Client"
import Adapter from "enzyme-adapter-react-16"
import { EchoResponse } from "./api/echo/v1/echo_pb"

Enzyme.configure({ adapter: new Adapter() })

describe("<Echo />", () => {
  test("Ok", () => {
    const echo = shallow(<Echo />)
    expect(echo.exists()).toBe(true)

    const message = echo.find("div")
    expect(message.exists()).toBe(true)
  })

  // react 17 未対応なので諦めた
  // https://github.com/enzymejs/enzyme/issues/2429
  // mount 動かないらしい
  // https://github.com/enzymejs/enzyme/issues/2462
  /*
  test('Ok', () => {
    jest.spyOn(EchoClient, 'echo').mockImplementation((req, md, callback) => {
        const res = new EchoResponse()
        res.setResponseMessage("Hello")
        callback(null,  res)
    })

    // React Hook Support
    // https://github.com/enzymejs/enzyme#react-hooks-support
    const echo = mount(<Echo />)
    expect(echo.exists()).toBe(true)

    const showRes = echo.find('div')
    expect(showRes.exists()).toBe(true)
    expect(showRes.text()).toContain("Hello")
  })
  */
})
