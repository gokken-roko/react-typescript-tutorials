import React, { useState } from "react"
import * as grpcWeb from "grpc-web"
import { EchoRequest, EchoResponse } from "./api/echo/v1/echo_pb"
import { EchoClient } from "./Client"

interface EchoState {
  readonly requestMessage: string
  readonly responseMessage: string
  readonly grpcError: grpcWeb.Error
}
const Echo: React.FunctionComponent = () => {
  const [echoState, setEchoState] = useState<EchoState>({
    requestMessage: "",
    responseMessage: "",
    grpcError: { code: 0, message: "" },
  })

  const handleClick = () => {
    const req = new EchoRequest().setRequestMessage(echoState.requestMessage)

    EchoClient.echo(req, null, (err: grpcWeb.Error, res: EchoResponse) => {
      if (err) {
        setEchoState({ ...echoState, grpcError: err })
        return
      }
      setEchoState({
        ...echoState,
        responseMessage: res.getResponseMessage(),
      })
    })
  }

  return (
    <>
      <div> Sample Echo </div>
      {/* https://ja.reactjs.org/docs/forms.html#the-textarea-tag */}
      <form>
        <label>
          Echo:
          <textarea
            value={echoState.requestMessage}
            onChange={(e) =>
              setEchoState({ ...echoState, requestMessage: e.target.value })
            }
          />
        </label>
        <button type="button" onClick={handleClick}>
          Submit
        </button>
      </form>

      {echoState.responseMessage && (
        <div data-testid="echo-response">
          Response Message: {echoState.responseMessage}
        </div>
      )}

      {echoState.grpcError &&
        echoState.grpcError.code !== grpcWeb.StatusCode.OK && (
          <div data-testid="echo-error">
            エラーが発生しました: code={echoState.grpcError.code}, message=
            {echoState.grpcError.message}
          </div>
        )}
    </>
  )
}

export default Echo
