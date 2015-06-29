#!/bin/bash -e
grunt clean mkdir

build() {
  ../../node_modules/.bin/vulcanize $@
}

chomp() {
  file=${1:-vulcanized.html}
  perl -pi -e 'chomp if eof' ${file}
}

pushd tmp/default
build ../../test/fixtures/index.html > ./vulcanized.html
chomp
cp ./* ../../test/expected/default/
popd

pushd tmp/abspath
build --abspath ../../test/fixtures /index.html > vulcanized.html
chomp
cp ./* ../../test/expected/abspath/
popd

pushd tmp/csp
build ../../test/fixtures/index.html | perl -p -e 'chomp if eof' | ../../node_modules/.bin/crisper --js vulcanized.js --html vulcanized.html
chomp
cp ./* ../../test/expected/csp/
popd

pushd tmp/inline
build --inline-css --inline-scripts ../../test/fixtures/index.html > vulcanized.html
chomp
cp ./* ../../test/expected/inline/
popd

pushd tmp/excludes
build --exclude "../../test/fixtures/bower_components/polymer/polymer.html" ../../test/fixtures/index.html > vulcanized.html
chomp
cp ./* ../../test/expected/excludes/
popd

pushd tmp/strip
build --strip-comments ../../test/fixtures/index.html > vulcanized.html
chomp
cp ./* ../../test/expected/strip/
popd

pushd tmp/multiple
build ../../test/fixtures/index.html > ./one.html
chomp one.html
build ../../test/fixtures/index.html > ./two.html
chomp two.html
cp ./* ../../test/expected/multiple/
popd

pushd tmp/no-strip-excludes
build --exclude "../../test/fixtures/bower_components/polymer/polymer.html" --no-implicit-strip ../../test/fixtures/index.html > vulcanized.html
chomp
cp ./* ../../test/expected/no-strip-excludes/
popd
# vim: set ts=2 sw=2 tw=0:
