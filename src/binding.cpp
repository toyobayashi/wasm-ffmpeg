#include <emscripten/bind.h>
#include <string>

extern "C" int transcode_aac(const char* input, const char* output);

int aac(const std::string& input, const std::string& output) {
  return transcode_aac(input.c_str(), output.c_str());
}

EMSCRIPTEN_BINDINGS(aac) {
  emscripten::function("aac", &aac);
}
