<!--param start-->
    //修改cdn的绝对路径（正式环境）
    fis.set('cdn-path-release','https://wanghsinche.github.io/home/');
<!--end-->
//配置通用
fis.set('project.files', ['src/**']);
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'release/**', 'README.md' , 'local/**' ,'.git/**', 'fis-conf.js', 'bakcup/**']);
fis.set('charset', 'utf-8');
fis.set('project.charset', 'utf-8');
fis.match('**.less', {
    parser: fis.plugin('less'), // invoke `fis-parser-less`,
    rExt: '.css'
});

fis.match('**.html', {
    postprocessor : fis.plugin('include',{
    	host : fis.get('cdn-path-release'),
        debug : true,
        release : false,
        encode : 'utf-8'
    }),
    useCache : false
});
fis.match('**.js', {
    preprocessor: fis.plugin('resload'),
    postprocessor: fis.plugin('replace', {
        local_cdn: "http://127.0.0.1:8080",
        debug: "local"
    })
});

fis.match(/^\/src\/(.*)$/i,{
    release : "$1",
    useCache : false
});


//配置正式打包

fis.media('release')
    .match('**.js',{
        postprocessor : fis.plugin('replace',{
            debug : "release"
        })
    })
    .match('*.{css,less}',{
        optimizer: fis.plugin('clean-css')
    })
    .match('**html:css',{
        optimizer: fis.plugin('clean-css')
    })
    .match("**.html",{
        postprocessor : fis.plugin('include',{
            nouse : true
        })
    })
    .match('*.{js,css,less,png,jpg,jpeg,gif,mp3,mp4,flv,swf,svg,eot,ttf,woff}',{
    	domain: fis.get("cdn-path-release"),
        useHash: true
    })
    .match('src/build/*.{js,css}', {
        useHash: false
    })
    .match('*.{css,less}',{
        useSprite : true
    })	
    .match('**', {
        charset : fis.get("charset"),
        deploy: [
        function (options, modified, total, next) {
            // var shelljs = require('shelljs');
            // shelljs.rm('-rf', './docs/');
            var exec = require('child_process').execSync;
            var cmd = 'rmdir /s /q .\\docs\\';
            try{exec(cmd);}catch(e){
                console.log(e.Error);
            }
                        
            next();

        },
		fis.plugin('encoding'),fis.plugin('local-deliver', {
            to: './docs/',
            exclude : ['inline','temp_file','config']
        })]
    });
   