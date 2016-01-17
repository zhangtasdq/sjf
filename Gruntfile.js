/* global module */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            },

            check: {
                files: {
                    src: ["lib/**/*.js"]
                }
            }
        },

        concat: {
            dist: {
                src: ["lib/*.js"],
                dest: "dist/sjf.js",
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                }
            }
        },

        uglify: {
            compress: {
                options: {
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    "dist/sjf.min.js" : ["dist/sjf.js"]
                }
            }
        },

        mocha: {

            test: {
                options: {
                    run: true,
                    log: true,
                    logErrors: true,
                    reporter: "Nyan",
                },
                src: ["test/**/*.html"]
            }
        },

        watch: {
            develop: {
                files: "lib/*.js",
                tasks: ["compile"],
                options: {
                    debounceDelay: 200
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerTask("test", ["mocha:test"]);
    grunt.registerTask("compile", ["jshint:check", "mocha:test", "concat:dist", "uglify:compress"]);
    grunt.registerTask("default", ["compile"]);
    grunt.registerTask("develop", ["watch:develop"]);
};
