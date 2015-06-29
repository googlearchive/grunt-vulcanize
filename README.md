# grunt-vulcanize

> Grunt task for Polymer's Vulcanize. Compatible with Polymer 1.0

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vulcanize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vulcanize');
```

## The "vulcanize" task

### Overview
In your project's Gruntfile, add a section named `vulcanize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vulcanize: {
    default: {
      options: {
        // Task-specific options go here.
      },
      files: {
        // Target-specific file lists and/or options go here.
      },
    },
  },
})
```

### Options

#### options.abspath
Type: `String`
Default value: ``

A folder to treat as "webroot". When specified, use an absolute path to target.

#### options.excludes
Type: `Array[String]`
Default value: `[]`

An array of RegExp objects to exclude paths from being inlined.

#### options.stripExcludes
Type: `Array[String]`
Default value: `[]`

An array of RegExp objects to exclude paths from being inlined and strip them
from the output file.

#### options.inlineScripts
Type: `Boolean`
Default value: `false`

Inline external scripts.

#### options.inlineCss
Type: `Boolean`
Default value: `false`

Inline external stylesheets.

#### options.stripComments
Type: `Boolean`
Default value: `false`

Remove non-license HTML comments.

#### options.loader
Type: `Hydrolysis loader`
Default value: ``

A hydrolysis loader. This loader is generated with the target argument to vulcan.process and the exclude paths. A custom loader can be given if more advanced setups are necesssary.

#### options.csp
Type: `String`
Default Value: ``

Filename for a separate JS file to be [CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP) compliant, uses [crisper](https://github.com/PolymerLabs/crisper)

### Usage Examples

#### Default Options
In this example, the default options are used to vulcanize `index.html` into `build.html`.

Please see https://github.com/Polymer/vulcanize#example for more information.

```js
grunt.initConfig({
  vulcanize: {
    default: {
      options: {},
      files: {
        'build.html': 'index.html'
      },
    },
  },
})
```

#### Custom Options
Please see https://github.com/Polymer/vulcanize for more information

```js
grunt.initConfig({
  vulcanize: {
    default: {
      options: {
        abspath: '',
        excludes: ["/path/to/polymer.html"]
        inlineScripts: true,
        inlineCss: true,
        stripComments: true,
        csp: "build-csp.js"
      },
      files: {
        'build-csp.html': 'index.html'
      },
    },
  },
})
```

## What happened to [feature] from 0.X?
- `--csp` mode has been moved into [crisper](https://github.com/PolymerLabs/crisper)
- `--strip` mode was removed, use something like [html-minifier](https://github.com/kangax/html-minifier) or [minimize](https://github.com/Moveo/minimize)
