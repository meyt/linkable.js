import minify from 'rollup-plugin-babel-minify'

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/linkable.js',
      format: 'umd',
      name: 'Linkable'
    }
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/linkable.min.js',
      format: 'umd',
      name: 'Linkable'
    },
    plugins: [
      minify({
        comments: false
      })
    ]
  }
]
