module.exports = function(grunt) {

  grunt.initConfig({
      assemble: {
        options: {
         assets: 'assets',
         partials: ['docs/includes/**/*.hbs'],
         data: ['docs/data/**/*.{json,yml}']
       },
       blog: {
        options : {
          ext: '.html', // hack from https://github.com/assemble/assemble/issues/265 for pretty urls - added after file ext below
          engine: 'handlebars',
          layout: 'blog/post.hbs'
        },
        files: [
          {expand: true, cwd: 'blog/posts', src: ['*.md'], dest: './out/blog', ext: '/index'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('assemble' );
  grunt.registerTask('default', ['assemble']);
}
