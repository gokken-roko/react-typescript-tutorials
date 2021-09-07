import React from "react"
import Echo from "./Echo"
import { EchoClient } from "./Client"
import { EchoResponse } from "./api/echo/v1/echo_pb"
import { cleanup, render, screen } from "@testing-library/react"
import { StatusCode } from "grpc-web"
import userEvent from "@testing-library/user-event"

describe("<Echo />", () => {
  afterEach(() => {
    cleanup()
  })

  test("Ok", () => {
    render(<Echo />)
    expect(screen.getByText("Sample Echo")).toBeInTheDocument()
  })

  test("Ok echo", () => {
    jest.spyOn(EchoClient, "echo").mockImplementation((req, md, callback) => {
      const res = new EchoResponse()
      res.setResponseMessage(req.getRequestMessage())
      callback(null, res)
    })

    // act はラップしてくれている
    // https://ja.reactjs.org/docs/testing-recipes.html#act
    //
    // React testing library - act
    // https://testing-library.com/docs/react-testing-library/api#act
    // https://testing-library.com/docs/react-testing-library/example-intro#act
    render(<Echo />)

    // https://testing-library.com/docs/ecosystem-user-event
    userEvent.type(screen.getByRole("textbox"), "Hello, World!")
    userEvent.click(screen.getByText("Submit"))
    expect(screen.getByTestId("echo-response")).toHaveTextContent(
      "Hello, World!"
    )
  })

  test("any Error", () => {
    jest.spyOn(EchoClient, "echo").mockImplementation((req, md, callback) => {
      const err = { code: StatusCode.UNAVAILABLE, message: "unavailable" }
      callback(err, null)
    })

    render(<Echo />)
    userEvent.type(screen.getByRole("textbox"), "To Be Error!!!")
    userEvent.click(screen.getByText("Submit"))
    expect(screen.getByTestId("echo-error")).toHaveTextContent("unavailable")
  })
})
