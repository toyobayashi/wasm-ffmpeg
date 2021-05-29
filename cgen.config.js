module.exports = function (_options, { isDebug }) {
  const debugFlags = [
    '-sDISABLE_EXCEPTION_CATCHING=0',
    '-sSAFE_HEAP=1'
  ]

  const commonFlags = [
    '--bind',
    '-sALLOW_MEMORY_GROWTH=1',
    ...(isDebug ? debugFlags : [])
  ]

  return {
    project: 'wasmffmpeg',
    targets: [
      {
        name: 'wasmffmpeg',
        type: 'exe',
        sources: [
          './src/transcode_aac.c',
          './src/binding.cpp'
        ],
        includePaths: ['./deps/ffmpeg/include'],
        libs: [
          './deps/ffmpeg/lib/libavcodec.a',
          './deps/ffmpeg/lib/libavformat.a',
          './deps/ffmpeg/lib/libavutil.a',
          './deps/ffmpeg/lib/libswresample.a'
        ],
        wrapScript: '',
        compileOptions: [...commonFlags],
        linkOptions: [...commonFlags, '-lnodefs.js']
        // staticVCRuntime: true
      }
    ]
  }
}
