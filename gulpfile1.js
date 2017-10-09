// 导入gulp实例
var gulp = require('gulp');

/**
 * task：
 * @param1 任务名
 * @param2 任务依赖，可选
 * @param3 执行任务的函数
 * */
gulp.task('log', [], function() {
  console.log('学习task—API');
});

/**
 * src 读文件
 * dest 写文件
 * */
gulp.task('cp', ['log'], function() {

  gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist'));

});

/**
 * 创建一个默认default任务，这个任务依赖cp任务，
 * 然后监听js文件变化，变化时再自动执行cp任务。
 * */
gulp.task('default', ['cp'], function() {

  // 文件变化时再自调执行cp任务
  gulp.watch(['src/js/*.js'], function() {
    console.log('js文件发生了变化，重新执行cp任务');
    gulp.run('cp');
  });

});
