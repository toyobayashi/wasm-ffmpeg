#!/bin/bash

localprefix="$(pwd)/.local"

cd ./deps/lame
emconfigure ./configure --enable-shared=no --enable-nasm=no --prefix="$localprefix"
emmake make
emmake make install
cd ../..
cp -rpf "$localprefix/*" "$EMSDK/upstream/emscripten/system/local"

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
  --enable-libmp3lame \
  --cc=emcc \
  --cxx=em++ \
  --ar=emar \
  --ranlib=emranlib \
  --prefix="$localprefix"

emmake make
emmake make install
cp -rpf "$localprefix" ../dist
cp -rpf "$localprefix/*" "$EMSDK/upstream/emscripten/system/local"
cd ..
