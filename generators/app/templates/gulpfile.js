const gulp  = require('gulp');
const clean = require('gulp-clean');

/** Rollup-specific imports **/
const {rollup} = require('rollup');
const babel    = require('rollup-plugin-babel');
const eslint   = require('rollup-plugin-eslint');
const uglify   = require('rollup-plugin-uglify');
const replace  = require('rollup-plugin-replace');
const resolve  = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const env = JSON.stringify(process.env.NODE_ENV || 'development');

// we must do this because the React libraries use object properties
// to export things, see this for more information:
// https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
const reactNamedExports = {
  'node_modules/react/index.js': [
    'Children', 'Component', 'PureComponent', 'createElement', 'cloneElement',
    'isValidElement', 'createFactory', 'version'
  ],
  'node_modules/react-dom/index.js': [
    'findDOMNode', 'render', 'unmountComponentAtNode', 'version'
  ]
};

// Clean tasks
gulp.task('clean:app', () =>
  gulp.src('public/js/build.min.js', { read: false })
    .pipe(clean())
);

gulp.task('build:app', [ 'clean:app' ], () =>
  rollup({
    input: 'app/index.js',
    plugins: [
      eslint({ throwError: env === 'production', configFile: '.eslintrc' }),
      resolve({ jsnext: true, browser: true }),
      babel({ exclude: 'node_modules/**' }),
      commonjs({ namedExports: reactNamedExports }),
      replace({
        ENV: env,
        'process.env.NODE_ENV': env
      }),
      env === 'production' && uglify()
    ]
  }).then(bundle => bundle.write({
    format: 'iife',
    file: 'public/js/build.min.js',
    sourcemap: 'inline'
  }))
);

gulp.task('build', [ 'build:app' ]);
gulp.task('default', [ 'build' ]);
