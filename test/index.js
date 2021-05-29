const init = require('../.cgenbuild/Release/wasmffmpeg.js').default
const path = require('path')

init().then(({ FS, NODEFS, Module }) => {
  FS.mkdir('/nodefs_home')
  FS.mount(NODEFS, { root: path.join(__dirname, '..') }, '/nodefs_home')
  Module.transcodeAac('/nodefs_home/test/bgm_china_day.wav', '/nodefs_home/test/bgm_china_day.aac')
  Module.transcoding('/nodefs_home/test/bgm_china_day.wav', '/nodefs_home/test/bgm_china_day.mp3')
})
