const init = require('../.cgenbuild/Release/wasmffmpeg.js').default
const path = require('path')

init().then(({ FS, NODEFS, Module }) => {
  FS.mkdir('/nodefs_home')
  FS.mount(NODEFS, { root: path.join(__dirname, '..') }, '/nodefs_home')
  Module.aac('/nodefs_home/test/bgm_china_day.wav', '/nodefs_home/test/bgm_china_day.aac')
})
