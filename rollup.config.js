import minify from 'rollup-plugin-babel-minify'

const globals = {}

const external = []

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/linkable.js',
      format: 'umd',
      name: 'Linkable',
      globals: globals
    },
    external: external
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/linkable.min.js',
      format: 'umd',
      name: 'Linkable',
      globals: globals
    },
    external: external,
    plugins: [
      minify({
        comments: false
      })
    ]
  }
]
