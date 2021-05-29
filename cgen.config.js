module.exports = function (_options, { isDebug }) {
  const debugFlags = [
    '-sDISABLE_EXCEPTION_CATCHING=0',
    '-sSAFE_HEAP=1'
  ]

  const commonFlags = [
    '--bind',
    '-sINITIAL_MEMORY=33554432',
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
          './src/transcoding.c',
          './src/binding.cpp'
        ],
        libs: [ // $EMSDK/upstream/emscripten/system/local/lib
          'avcodec',
          'avformat',
          'avutil',
          'swresample',
          'avfilter',
          'swscale'
        ],
        wrapScript: '',
        compileOptions: [...commonFlags],
        linkOptions: [...commonFlags, '-lnodefs.js']
        // staticVCRuntime: true
      }
    ]
  }
}
