module.exports = function (grunt){
    require('time-grunt')(grunt),
    require('jit-grunt')(grunt, {
         useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css',

                }]
            }
        },
        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },
        browserSync: {
            dev: {
                bsFiles: { //browser Files
                    src: [
                        'css/*.css',
                        '*.html',
                         'js/*.js',
                    ]
                }
            },
            options: {
                watchTask: true,
                server:{
                    baseDir: './' //Directorio base para nuestro servidor
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src:'images/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/',
                }]
            }
        },
        copy: {
            html: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist', 
                }]
            }
        },
        clean: {
            build: {
                src:['dist/']
            }
        },
        cssmin: {
            dist:{}
        },
        uglify:{
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algoritm: 'md5',
                length: 20
            },
            release:{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css']
                }]
            },
       	},
        concat: {
           options: {
               separator: ';'
            },
            dist: {}
        },

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['index.html, empresa.html, precios.html, contacto.html, ayuda.html, condiciones.html, descargar.html'],
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
				},
				post: {
					css:[{
							name: 'cssmin',
							createConfig: function(context, block){
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
					}]
				}
			}
		},
		usemin:{
			html:['dist/index.html','dist/empresa.html','dist/precios.html','dist/contacto.html','dist/ayuda.html','dist/condiciones.html','dist/descargar.html'],
			options:{
					assetsDir: ['dist','dist/css','dist/js'] 
			}
		}
    });
        grunt.registerTask('css', ['sass']);
        grunt.registerTask('default', ['browserSync', 'watch']);
        grunt.registerTask('img:compress', ['imagemin']);
        grunt.registerTask('build', [
            'clean',
            'copy',
            'imagemin',
            'useminPrepare',
            'cssmin',
            'concat',
            'uglify',
            'filerev',
            'usemin'
        ]);
};