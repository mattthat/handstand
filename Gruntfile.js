var Grunt = function(grunt) {
    grunt.initConfig({
        exec: {
            'dep-test': {
                command: 'cd resources/dep-test; ./dep-test.sh',
                stdout: true,
                stderr: false,
                exitCode: 0
            }
        },
        clean: {
            build: {
                src: ['build/*']
            },
            coverage: {
                src: ['coverage/*']
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                 files: {
                     'build/snapshot/snapshot-base.min.css': [
                         'src/css/handstand.css',
                         'src/css/themes/default.css'
                     ],
                     'build/snapshot/snapshot-all.min.css': [
                         'src/css/handstand.css', 
                         'src/css/themes/default.css',
                         'src/css/elements/*.css'
                     ]
                 }
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
            'examples-website-all': {
                src: ['resources/examples/website/*'],
                flatten: true,
                expand: true,
                dest: 'build/examples/website'
            },
            'examples-blog': {
                src: ['resources/examples/blog/*'],
                flatten: true,
                expand: true,
                dest: 'build/examples/blog'
            },
            'snapshot-base-loader': {
                src: ['resources/snapshot/snapshot-base.html'],
                flatten: true,
                expand: true,
                dest: 'build/snapshot'
            },
            'snapshot-all-loader': {
                src: ['resources/snapshot/snapshot-all.html'],
                flatten: true,
                expand: true,
                dest: 'build/snapshot'
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
                    'src/**','resources/examples/**', 'resources/snapshot/**'
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
                dest: 'build/snapshot/snapshot-all.js'
            },
            'package-base': {
                src: [ 'packaging/base.js'],
                dest: 'build/snapshot/snapshot-base.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            'snapshot-all': {
                files: {
                    'build/snapshot/snapshot-all.min.js': ['build/snapshot/snapshot-all.js']
                }
            },
            'snapshot-base': {
                files: {
                    'build/snapshot/snapshot-base.min.js': ['build/snapshot/snapshot-base.js']
                }
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

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('explode', [ 'clean:build', 'copy' ]);
    grunt.registerTask('build', [ 'explode', 'cssmin', 'browserify', 'uglify' ]);
    grunt.registerTask('test', [ 'mochaTest' ]);
    grunt.registerTask('buildview-server', [ 'build', 'connect', 'watch' ]);
    grunt.registerTask('run', [ 'build', 'buildview-server' ]);
    grunt.registerTask('coveralls', [ 'mocha_istanbul:coveralls' ]);
    grunt.registerTask('coverage', [ 'clean:coverage', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('audit', ['audit-coverage', 'audit-restrict']);
    grunt.registerTask('audit-coverage', [])
    grunt.registerTask('audit-restrict', ['exec:dep-test']);
    grunt.registerTask('release', ['build','coverage', 'audit']);

};
module.exports = Grunt;