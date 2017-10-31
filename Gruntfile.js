module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            scss: {
                files: ['dev/src/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss'],
            },
            js: {
                files: ['dev/src/js/*.js'],
                tasks: ['babel'],
            },
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dev/css/application.css': 'dev/src/scss/application.scss'
                },
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dev/css/*.css',
                        'dev/js/*.js',
                        'dev/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dev/'
                }
            }
        },

        postcss: {
          options: {
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'dev/css/maps/', // ...to the specified directory
            },
            processors: [
              require('pixrem')(), // add fallbacks for rem units
              require('postcss-flexboxfixer'),
              require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 9']}), // add vendor prefixes
            ]
          },
          dist: {
            src: 'dev/css/application.css',
          },
        },


        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html'
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html',
                }
            }
        },


        babel: {
      		options: {
      			sourceMap: true,
      			presets: ['env']
      		},
      		dist: {
      			files: {
      				'dev/js/main.js': 'dev/src/js/main.js'
      			}
      		}
      	},



        cssmin: {
          options: {
            // report: 'min',  <--- default
            report: 'gzip'
          },
          target: {
            files: [{
              expand: true,
              cwd: 'dev/css',
              src: ['application.css'],
              dest: 'dist/css',
              ext: '.css'
            }]
          }
        }



    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss', 'babel', 'htmlmin:dev', 'watch']);
    grunt.registerTask('build', ['cssmin', 'babel', 'htmlmin:build']);

};
