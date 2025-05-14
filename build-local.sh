#!/bin/bash

# Resolve path to protoc-gen-ts_proto plugin
PROTOC_GEN_TS_PROTO=$(npm root)/.bin/protoc-gen-ts_proto.cmd

# Run protoc with ts_proto plugin
protoc \
  --plugin=protoc-gen-ts_proto="$PROTOC_GEN_TS_PROTO" \
  --ts_proto_out=./types \
  --ts_proto_opt=nestJs=true \
  --proto_path=./proto \
  ./proto/*.proto
