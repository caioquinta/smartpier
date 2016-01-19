 module.exports = function(grunt) {
      grunt.initConfig ({
        sass: {
          dist: {
            files: {
              '/css/use_this.css' : 'sass/use_this.scss'
            }
          }
        }

      watch: {
        source: {
          files: ['sass/**/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true, // needed to run LiveReload
          }
        }
      }

      grunt.loadNpmTasks('grunt-sass');
      grunt.registerTask('default', ['sass']);
    };