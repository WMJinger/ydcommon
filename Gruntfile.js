/* 
	name:grunt函数
	date:2016-12-28
	author:wumj
*/
module.exports=function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg:grunt.file.readJSON('package.json'),
		//uglify插件的配置信息，用于压缩js
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
			},
			build:{
				src:'src/js/common.js',
				dest:'dist/js/<%=pkg.name%>.<%=pkg.version%>.min.js'
			}
		},
		// jshint插件配置信息,用于检查js语法错误
		jshint:{
			build:['Gruntfile.js','src/js/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		//css压缩插件配置
		// concat: {//css文件合并
		// 	css: {
		// 		src: ['src/css/*.css'],//当前grunt项目中路径下的src/css目录下的所有css文件
		// 		dest: 'dist/all.css'  //生成到grunt项目路径下的dist文件夹下为all.css
		// 	}
		// },
		cssmin: { //css文件压缩
			css: {
				src: 'src/css/common.css',//将之前的all.css
				dest: 'dist/css/<%=pkg.name%>.<%=pkg.version%>.min.css'  //压缩
			}
		}
	});
	//告诉grunt我们将要使用的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-css');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	//告诉grunt当前我们在终端中输入grunt时需要做些什么(注意先后顺序,先检查语法，再压缩)
	grunt.registerTask('default',['jshint','uglify','cssmin']);
}