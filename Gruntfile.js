var Grunt = function(grunt) {
    grunt.initConfig({
        clean: {
            build: {
                src: ['build/*']
            },
            coverage: {
                src: ['coverage/*']
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
            'js-toplevel': {
                src: ['src/js/*.js'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/js'
            },
            'js-handstand': {
                src: ['src/js/handstand/*.js'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/js/handstand'
            },
            'js-elements': {
                src: ['src/js/elements/*.js'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/js/elements'
            },
            'js-components': {
                src: ['src/js/components/*.js'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/js/components'
            },
            'css-toplevel': {
                src: ['src/css/*.css'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/css'
            },
            'css-elements': {
                src: ['src/css/elements/*.css'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/css/elements'
            },
            'css-components': {
                src: ['src/css/components/*.css'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/css/components'
            },
            themes: {
                src: ['src/css/themes/*'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/css/themes'
            },
            'handstand-basis': {
                src: ['src/html/*.html'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/html'
            },
            'handstand-elements': {
                src: ['src/html/elements/*.html'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/html/elements'
            },
            'handstand-components': {
                src: ['src/html/components/*.html'],
                flatten: true,
                expand: true,
                dest: 'build/handstand/html/components'
            },
            'element-examples': {
                src: ['resources/examples/website/*.html'],
                flatten: true,
                expand: true,
                dest: 'build/examples/website'
            },
            'example-css': {
                src: ['resources/examples/website/*.css'],
                flatten: true,
                expand: true,
                dest: 'build/examples/website'
            },
            'example-login': {
                src: ['resources/examples/website/login/*'],
                flatten: true,
                expand: true,
                dest: 'build/examples/website/login'
            },
            'example-textinputlabel': {
                src: ['resources/examples/website/textinputlabel/*'],
                flatten: true,
                expand: true,
                dest: 'build/examples/website/textinputlabel'
            },
            'snapshot-loader': {
                src: ['resources/snapshot/snapshot-loader.html'],
                flatten: true,
                expand: true,
                dest: 'build'
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
                    'src/**','resources/examples/**'
                ],
                tasks: [ 'run' ]
            }
        },
        browserify: {
            options: {
                transform: ['jstify'],
            },
            'package-all': {
                src: [ 'packaging/all.js'],
                dest: 'build/snapshot-all.js'
            },
            'package-base': {
                src: [ 'packaging/base.js'],
                dest: 'build/snapshot-base.js'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'babel-register'
                },
                src: ['test/**/*.spec.js']
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'test',
                options: {
                    mask: '**/*.spec.js'
                }
            }
        }
    });

    grunt.event.on('coverage', function(lcovFileContents, done) {
        done();
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('explode', [ 'clean:build','copy']);
    grunt.registerTask('build', [ 'explode','browserify']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('buildview-server', [ 'build','connect','watch']);
    grunt.registerTask('run', [ 'build','examples-server']);
    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', ['clean:coverage','mocha_istanbul:coverage']);
    grunt.registerTask('audit', []);    // audit coverage and other release restrictions
    grunt.registerTask('package', []);  // put handstand together for release
    grunt.registerTask('validate', []); // ensure viability after packaging (maybe a headless chrome test bed?)
    grunt.registerTask('release', ['coverage', 'build', 'audit', 'package', 'validate'])

};
module.exports = Grunt;