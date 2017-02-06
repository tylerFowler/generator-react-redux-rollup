generator-react-redux-rollup
============================
A minimal generator for React+Redux apps.

Includes:

- React.js for UI
- Redux for application state
- Rollup for bundling
- Gulp for building
- UglifyJS for minification
- Eslint for linting

## Why? (Or what this generator is not)
There are a lot of React+Redux generators out there but they all seem to do too much, adding test frameworks, CSS preprocessors, etc... This generator simply bootstraps the build process for the JS and adds some of the always-there boilerplate for React and Redux. No extra decisions are made outside of the app building pipeline. Note that this means this isn't an out-of-the-box generator, in order for it to actually run reducers need to be added and hooked up to the store along with any necessary middleware.

All of the build pipeline options are in the `build:app` task in the gulpfile, many of which can be disabled by simply removing the lines.

### A few things to note:
- the `.eslintrc` file is based on my own personal preferences, I highly recommend at least looking through it to change whatever you like
- in production if eslint fails the entire build will fail, this may be overridden in the gulpfile
- the `package.json` file needs some editing (i.e. adding the `author` field), additionally it marks the package private by default
