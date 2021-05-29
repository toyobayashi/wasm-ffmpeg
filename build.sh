#!/bin/bash

tag="n4.4"
curl -O -L "https://github.com/FFmpeg/FFmpeg/archive/refs/tags/$tag.tar.gz"
tar xf "$tag.tar.gz"
cd "FFmpeg-$tag"

emconfigure ./configure --disable-programs \
  --enable-cross-compile \
  --target-os=none \
  --arch=x86_32 \
  --disable-asm \
  --disable-x86asm \
  --disable-doc \
  --disable-pthreads \
  --disable-network \
  --disable-debug \
  --cc=emcc \
  --cxx=em++ \
  --ar=emar \
  --prefix=./.local

emmake make
emmake make install
cp -rpf ./.local ../dist
cd ..
