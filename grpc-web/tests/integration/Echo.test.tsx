import React from "react"
import Echo from "../../src/Echo"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Page } from "playwright"

declare let page: Page
describe("Overall Page", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000")
  })

  afterEach(async () => {
    await page.close()
  })

  test("Page", async () => {
    // https://github.com/playwright-community/playwright-jest-examples/tree/master/basic-ts/tests
    // https://github.com/playwright-community/playwright-jest-examples/blob/master/create-react-app/src/App.test.ts
    await expect(page).toHaveText("Grpc Echo")

    // TODO: Request, Response
  })
})

describe("<Echo />", () => {
  afterEach(() => {
    cleanup()
  })

  test("Show message", async () => {
    render(<Echo />)

    // Request
    userEvent.type(screen.getByRole("textbox"), "Hello, World!")
    userEvent.click(screen.getByText("Submit"))

    // Response
    const res = await waitFor(() => screen.getByTestId("echo-response"))
    console.log(screen.debug())
    expect(res).toHaveTextContent("Hello, World!")
  })
})
