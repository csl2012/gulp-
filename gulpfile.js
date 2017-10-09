//导入gulp实例
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var renam=require('gulp-rename');
/**
 * task
 * @param1 任务名
 * @param2 任务依赖
 * @param3 执行任务的函数
 */
gulp.task('log', [], function () {
  console.log('这是学习task的api');
});

/**
 * src  读文件
 * 
 * dest 写文件
 */
gulp.task('cp', ['log'], function () {
  gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist'))

});

/**
 * 创建一个默认任务default
 * 这个任务里面去调用cp任务，
 * 监听js文件变化，变化时自动执行cp任务
 */
gulp.task('default',[],function(){
  gulp.run('cp');  //任务启动时马上执行cp任务
  gulp.watch(['src/js/*.js'],function(){
    console.log('js文件发生变化，重新执行cp任务');
    gulp.run('cp');
  })
});


/**
 * 编写一个压缩HTML代码的任务
 */
//1、先创建一个htmlmin任务
gulp.task('htmlmin',[],function(){
  //2、读取src文件里的HTML文件
  gulp.src(['src/*.html'])
  //3、开始压缩HTML文件
    .pipe(htmlmin({
      collapseWhitespace: true, // 去掉空白字符
      minifyJS: true,//压缩页面JS
      minifyCSS: true,//压缩页面CSS
      removeComments: true//清除HTML注释
    }))
    //4、写到dist文件中
    .pipe(gulp.dest('dist'));
});


/**
 * 编写一个压缩js的任务
 */
gulp.task('jsmin',[],function(){
  gulp.src(['src/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})


/**
 * 编写一个合并压缩代码的任务
 */
gulp.task('concat',[],function(){
  gulp.src('src/js/*.js')
  .pipe(concat('js/build.js'))
  .pipe(uglify())
  .pipe(rename({
      dirname: 'src',   // 有了rename，就不用src的base配置了，这个更加靠谱
      prefix: 'p_',
      suffix: '.min',
    }))
  .pipe(gulp.dest('dist'))
});

gulp.task('js',[],function(){
  gulp.src(['src/js/*.js'])

});