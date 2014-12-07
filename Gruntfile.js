module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				files: {
					'public/site.js': ['www/js/**/*.js']
				}
			},
			options: {
				browserifyOptions: {
					debug: true
				}
			}
		},
		sass: {
			dist: {
				files: {
					'public/style.css' : 'www/scss/style.scss'
				}
			}
		},
		watch: {
			options: {
				livereload: false,
				atBegin: true
			},
			build: {
				files: ['www/js/**/**/*.js'],
				tasks: ['browserify']
			},
			css: {
				files: 'www/scss/**/*.scss',
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask( "default", [ "browserify", "sass"]);

};
