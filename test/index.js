const init = require('../.cgenbuild/Release/wasmffmpeg.js').default
const path = require('path')

init().then(({ FS, NODEFS, Module }) => {
  FS.mkdir('/nodefs_home')
  FS.mount(NODEFS, { root: path.join(__dirname, '..') }, '/nodefs_home')
  console.time('aac')
  Module.transcodeAac('/nodefs_home/test/bgm_china_day.wav', '/nodefs_home/test/bgm_china_day.aac', 160000)
  console.timeEnd('aac')
  console.time('mp3')
  Module.transcoding('/nodefs_home/test/bgm_china_day.wav', '/nodefs_home/test/bgm_china_day.mp3', 128000)
  console.timeEnd('mp3')
})
