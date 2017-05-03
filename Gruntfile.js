var Grunt = function(grunt) {
  grunt.initConfig({
      clean: {
         build: {
            src: [ 'build/*' ]
         }
      },
      copy: {
         slim: {
            flatten: true,
            expand: true,
            src: [
            'node_modules/slim-js/Slim.js',
            'node_modules/slim-js/Slim.min.js'
            ],
            dest: 'build/handstand/slim-js'
         },
         js: {
            src: ['src/js/*'],
            flatten: true,
            expand: true,
            dest: 'build/handstand/js/'
         },
         handstand: {
            src: ['src/*.html'],
            flatten: true,
            expand: true,
            dest: 'build/handstand/'
         },
         examples: {
            src: ['examples/*.html'],
            flatten: true,
            expand: true,
            dest: 'build/'
         },
      },
      clean: {
         build: {
            src: 'build/*'
         }
      },
      connect: {
         server: {
            options: {
               port: 7000,
               base: 'build/',
               hostname: '*',
            }
         }
      },
      watch: {
         app: {
            files: [
               'src/**','examples/**'
            ],
            tasks: [ 'run' ]
         }
      }
   });
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.registerTask(
      'build',
      [ 'clean','copy']
   );
   grunt.registerTask(
      'server',
      [ 'build','connect','watch']
   );
   grunt.registerTask(
      'run',
      [ 'build','server']
   );
};
module.exports = Grunt;