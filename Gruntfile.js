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
    less: {//less编译配置
      compile: {
        files: {
          'src/common/css/style.css': 'src/common/less/style.less'
        }
      }
    },
    autoprefixer: {//自动补全兼容性写法
      dist: {
        files : {
          'src/common/css/style.css' : 'src/common/css/style.css'
        }
      }
    },
    cssmin: {//CSS压缩代码
      css: {
        src:'src/common/css/style.css',
        dest:'src/common/css/style.css'
      }
    },
    watch: {//用于监听less文件,当改变时自动编译成css文件
      client: {
        files: ['src/common/less/*.less','src/common/less/public/*.less','src/common/less/component/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    }
  });
  //告诉grunt我们将要使用的插件
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['less','autoprefixer','cssmin','watch']);
};

