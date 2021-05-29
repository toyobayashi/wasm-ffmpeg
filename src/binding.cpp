#include <emscripten/bind.h>
#include <string>

extern "C" int transcode_aac(const char* input, const char* output);
extern "C" int transcoding(const char* input, const char* output);

int js_transcode_aac(const std::string& input, const std::string& output) {
  return transcode_aac(input.c_str(), output.c_str());
}

int js_transcoding(const std::string& input, const std::string& output) {
  return transcoding(input.c_str(), output.c_str());
}

EMSCRIPTEN_BINDINGS(aac) {
  emscripten::function("transcodeAac", js_transcode_aac);
  emscripten::function("transcoding", js_transcoding);
}
