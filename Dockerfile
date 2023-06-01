## Build
FROM golang:1.20-buster as build

WORKDIR /app

COPY server/go.mod ./
COPY server/go.sum ./
COPY server/pkg ./pkg
RUN go mod download

COPY server/*.go ./

RUN CGO_ENABLED=1 go build -o /server

## Deploy
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /server /server
COPY webapp/dist /webapp

EXPOSE 8090

ENTRYPOINT ["/server", "serve", "--http=0.0.0.0:8090"]