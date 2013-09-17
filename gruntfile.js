module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      assemble: {
        options: {
         assets: 'assets',
         partials: ['docs/includes/**/*.hbs'],
         data: ['docs/data/**/*.{json,yml}']
       },
       blog: {
        options : {
          engine: 'handlebars',
          layout: 'blog/post.hbs',
          ext: '.html' // hack from https://github.com/assemble/assemble/issues/265 for pretty urls - added after file ext below
        },
        files: [
          {expand: true, cwd: 'blog/posts', src: ['*.md'], dest: './out/blog', ext: '/index'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
}
