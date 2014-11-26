'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'public/*.html',
                    'public/css/*.css',
                    'public/js/*.js',
                    'public/img/*.{png,jpg,jpeg,gif,webp,svg}',
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35728,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: 'app'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'public/js/*.js'
            ]
        },

        requirejs: {
            compile: {
                options: {
                    appDir: './public/js/',
                    baseUrl: '.',
                    dir: './dist/js/',
                    modules: [{ name: 'main' }],
                    findNestedDependencies: true,
                    optimize: 'uglify',
                    preserveLicenseComments: true,
                    removeCombined: true
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/img',
                    src: '*.{png,jpg,jpeg}',
                    dest: 'dist/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/styles/main.css': [ 'public/css/*.css' ]
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'public',
                    dest: 'dist',
                    src: [
                        './*.{html,ico}',
                        'sounds/*'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('server', [
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
//        'jshint',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'server'
    ]);
};