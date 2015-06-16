module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        clean: ['build'],
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
            prism_js: {
                src: 'bower_components/prism/prism.js',
                dest: 'build/js/prism.min.js'
            },
			js: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'build/js/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			options: {},
			bootstrap: {
				files: {
					'build/css/<%= pkg.name %>-bootstrap.min.css': [
						'external/strapdownjs/themes/bootstrap.min.css',
						'external/strapdownjs/strapdown.css',
                        'external/strapdownjs/themes/bootstrap-responsive.min.css',
						'css/<%= pkg.name %>-bootstrap.css'
					]
				}
			},
			standalone: {
				files: {
					'build/css/<%= pkg.name %>-standalone.min.css': [
						'external/strapdownjs/strapdown.css',
						'css/<%= pkg.name %>-standalone.css'
					]
				}
			}
		},
		concat: {
			options: {
			    strapBanners: true,
			    separator: ";\n"
			},
            prism_combined: {
                src: [
                    'build/js/prism.min.js',
                    'bower_components/prism/components/prism-http.min.js'
                ],
                dest: 'build/js/prism-combined.min.js'
            },
			js: {
				src: [
                    'bower_components/zepto/zepto.min.js',
                    'build/js/prism-combined.min.js',
                    'bower_components/marked/marked.min.js',
                    'build/js/<%= pkg.name %>.min.js'
                ],
				dest: 'build/js/<%= pkg.name %>-allinone.min.js'
			}
		},
		embed: {
			options: {
			    threshold: '150KB'
			},
			all_in_one_bootstrap: {
				files: {
					'build/bootstrap.html': 'src/bootstrap.html'
				}
			},
			all_in_one_standalone: {
			    files: {
                    'build/standalone.html': 'src/standalone.html'
                }
			}
		}
	});

    // clean 用于删除之前生成的文件
    grunt.loadNpmTasks('grunt-contrib-clean');
	// uglify 用于 minimize js
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// cssmin 用于 minimize css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// concat 用于将多个文件连接成一个
	grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt-embed 用于将 js 和 css 嵌入到单个 html 中
	grunt.loadNpmTasks('grunt-embed');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'concat', 'embed']);

};