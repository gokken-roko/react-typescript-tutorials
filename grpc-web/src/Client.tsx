import { EchoClient as EchoClientPb } from "./api/echo/v1/EchoServiceClientPb"

export const EchoClient = new EchoClientPb("http://localhost:8080", null, null)
