var Grunt = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        exec: {
            'dep-test': {
                command: 'cd resources/dep-test; ./dep-test.sh',
                stdout: true,
                stderr: false,
                exitCode: 0
            },
            'audit-units': {
                command: 'cd resources/audit/audit-units; ./audit-units.sh',
                stdout: true,
                stderr: true,
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
                     'build/snapshot/snapshot-all.min.css': [
                         'src/css/handstand.css', 
                         'src/css/elements/*.css',
                         'src/css/components/*.css',
                         'src/css/themes/default.css'
                     ]
                 }
            }
        },
        copy: {
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
            'snapshot-all-loader': {
                src: ['resources/snapshot/snapshot-all.html'],
                flatten: true,
                expand: true,
                dest: 'build/snapshot'
            },
            'distribution-alljs': {
                src: 'build/snapshot/snapshot-all.min.js',
                dest: 'release/handstand-all-v' + pkg.version + '.min.js'
            },
            'distribution-allcss': {
                src: 'build/snapshot/snapshot-all.min.css',
                dest: 'release/handstand-all-v' + pkg.version + '.min.css'
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
                src: [ 'packaging/aliases/all.js'],
                dest: 'build/snapshot/snapshot-all.js'
            },
            'package-uicore': {
                src: [ 'packaging/packages/ui-core.js'],
                dest: 'build/snapshot/snapshot-uicore.js'
            },
            'package-worker': {
                src: [ 'packaging/packages/worker.js'],
                dest: 'build/snapshot/snapshot-worker.js'
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
            'snapshot-uicore': {
                files: {
                    'build/snapshot/snapshot-uicore.min.js': ['build/snapshot/snapshot-uicore.js']
                }
            },
            'snapshot-worker': {
                files: {
                    'build/snapshot/snapshot-worker.min.js': ['build/snapshot/snapshot-worker.js']
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

    grunt.registerTask('build-copy', [
        'copy:examples-website-all', 'copy:examples-blog',
        'copy:snapshot-all-loader'
    ]);
    grunt.registerTask('release-copy', [
        'copy:distribution-alljs', 'copy:distribution-allcss'
    ]);
    grunt.registerTask('explode', [ 'clean:build', 'build-copy' ]);
    grunt.registerTask('build', [ 'explode', 'cssmin', 'browserify', 'uglify' ]);
    grunt.registerTask('test', [ 'mochaTest' ]);
    grunt.registerTask('buildview-server', [ 'build', 'connect', 'watch' ]);
    grunt.registerTask('run', [ 'build', 'buildview-server' ]);
    grunt.registerTask('coveralls', [ 'mocha_istanbul:coveralls' ]);
    grunt.registerTask('coverage', [ 'clean:coverage', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('audit', ['audit-coverage', 'audit-restrict']);
    grunt.registerTask('audit-coverage', ['exec:audit-units']);
    grunt.registerTask('audit-restrict', ['exec:dep-test']);
    grunt.registerTask('release', ['build','coverage', 'audit', 'release-copy']);

};
module.exports = Grunt;