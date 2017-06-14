// 所有模块都通过 define 来定义
define('app',function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require('module/loader');

  // 通过 exports 对外提供接口
  exports.doSomething = function(){
    console.log(1);
    console.log($);
  };


});