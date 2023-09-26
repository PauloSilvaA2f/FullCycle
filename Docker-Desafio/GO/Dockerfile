FROM golang as builder

WORKDIR /go/src/fullcycle

COPY FullCycle.go .

RUN go build FullCycle.go

FROM scratch

WORKDIR /go/src/fullcycle

COPY --from=builder /go/src/fullcycle .

ENTRYPOINT [ "./FullCycle" ]