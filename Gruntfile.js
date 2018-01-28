let Grunt = (grunt) => {
    
    let PackageJson = grunt.file.readJSON('package.json');

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
            release: {
                src: ['release/*']
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
            'examples-website': {
                cwd: 'resources/examples/website',
                src: '**',
                dest: 'build/examples/website',
                expand: true
            },
            'examples-ui-elements': {
                cwd: 'resources/examples/ui-elements',
                src: '**',
                dest: 'build/examples/ui-elements',
                expand: true
            },
            'snapshot-all-loader': {
                src: ['resources/snapshot/snapshot-all.html'],
                dest: 'build/snapshot',
                flatten: true,
                expand: true
            },
            'distribution-alljs': {
                src: 'build/snapshot/snapshot-all.min.js',
                dest: 'release/handstand-all-v' + PackageJson.version + '.min.js'
            },
            'distribution-allcss': {
                src: 'build/snapshot/snapshot-all.min.css',
                dest: 'release/handstand-all-v' + PackageJson.version + '.min.css'
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

    grunt.event.on('coverage', (lcovFileContents, done) => {
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

    grunt.registerTask('buildcopy', [ 'copy:examples-website', 'copy:examples-ui-elements', 'copy:snapshot-all-loader' ]);
    grunt.registerTask('releasecopy', [ 'copy:distribution-alljs', 'copy:distribution-allcss' ]);
    grunt.registerTask('explode', [ 'clean:build', 'buildcopy' ]);
    grunt.registerTask('build', [ 'explode', 'cssmin', 'browserify', 'uglify' ]);
    grunt.registerTask('test', [ 'mochaTest' ]);
    grunt.registerTask('buildviewserver', [ 'build', 'connect', 'watch' ]);
    grunt.registerTask('run', [ 'buildviewserver' ]);
    grunt.registerTask('coveralls', [ 'mocha_istanbul:coveralls' ]);
    grunt.registerTask('coverage', [ 'clean:coverage', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('audit', ['audit-coverage', 'audit-restrict']);
    grunt.registerTask('audit-coverage', ['exec:audit-units']);
    grunt.registerTask('audit-restrict', ['exec:dep-test']);
    grunt.registerTask('release', ['clean', 'build','coverage', 'audit', 'releasecopy']);
};
module.exports = Grunt;