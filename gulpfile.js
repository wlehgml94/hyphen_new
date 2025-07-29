const fs = require('fs');
const gulp = require('gulp');
const dartSass = require('dart-sass');
const scss = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const postCss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const dependents = require('gulp-dependents');
const path = require('path');
const plumber = require('gulp-plumber');
const through2 = require('through2');
const xlsx = require('xlsx');
const glob = require('glob');
const sharp = require('sharp');

const apfBrwsowsers = [
  'ie > 0',
  'chrome > 0',
  'firefox > 0', // 브라우저의 모든 버전 적용
  //'last 2 versions'                    // 최신 브라우저 기준 하위 2개의 버전까지 적용
];
const PATH = {
    HTML: 'assets_workspace/',
    ASSETS: {
      FONTS: './assets_workspace/fonts',
      IMAGES: './assets_workspace/images',
      STYLE: './assets_workspace/css',
      SCRIPT: './assets_workspace/js',
      DATA: './assets_workspace/data',
      LIB: './assets_workspace/lib',
      DOWNLOAD: './assets_workspace/download',
    },
  },
  DEST_PATH = {
    HTML: './assets',
    ASSETS: {
      FONTS: './assets/fonts',
      IMAGES: './assets/images',
      STYLE: './assets/css',
      SCRIPT: './assets/js',
      DATA: './assets/data',
      LIB: './assets/lib',
      DOWNLOAD: './assets/download',
    },
  };
const onErrorHandler = error => console.log(error);

gulp.task('scss:compile', () => {
  return new Promise(resolve => {
    var options = {
      scss: {
        outputStyle: 'compressed', //nested(default), expanded, compact, compressed
        indentType: 'space', //space, tab
        indentWidth: 2,
        precision: 8,
        sourceComments: true,
        compiler: dartSass,
      },
      postcss: [
        autoprefixer({
          overrideBrowserslist: apfBrwsowsers,
        }),
      ],
    };
    gulp
      .src(PATH.ASSETS.STYLE + '/*.scss', { since: gulp.lastRun('scss:compile') })
      .pipe(plumber({ errorHandler: onErrorHandler }))
      .pipe(dependents())
      .pipe(sourcemaps.init())
      //.pipe(concat('common.css'))
      .pipe(scss(options.scss).on('error', scss.logError))
      .pipe(postCss(options.postcss))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DEST_PATH.ASSETS.STYLE));
    resolve();
  });
});

gulp.task('script:data', () => {
  return new Promise(resolve => {
    gulp.src([PATH.ASSETS.DATA + '/*.*']).pipe(plumber({ errorHandler: onErrorHandler })).pipe(gulp.dest(DEST_PATH.ASSETS.DATA));
    resolve();
  });
});

gulp.task('script:build', () => {
  return new Promise(resolve => {
    gulp.src([PATH.ASSETS.SCRIPT + '/*.js', PATH.ASSETS.SCRIPT + '/**/*.js']).pipe(plumber({ errorHandler: onErrorHandler })).pipe(uglify()).pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT));
    resolve();
  });
});

gulp.task('library', () => {
  return new Promise(resolve => {
    gulp.src([PATH.ASSETS.LIB + '/*.*', PATH.ASSETS.LIB + '/**/*.*']).pipe(gulp.dest(DEST_PATH.ASSETS.LIB));
    resolve();
  });
});

const { exec } = require('child_process');

gulp.task('excel:convert', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.DATA + '/*.xlsx')
      .pipe(plumber({ errorHandler: onErrorHandler }))
      .pipe(through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          const workbook = xlsx.read(file.contents, { type: 'buffer' });
          const result = {};

          workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            result[sheetName] = xlsx.utils.sheet_to_json(sheet);
          });

          const jsonFilePath = file.path.replace(/\.xlsx$/, '.json').replace(PATH.ASSETS.DATA, DEST_PATH.ASSETS.DATA);
          const jsonDir = path.dirname(jsonFilePath);
          fs.mkdirSync(jsonDir, { recursive: true });
          fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2), 'utf-8');
          console.log(`✔️ Excel converted: ${file.relative}`);

          // ✅ PHP 실행
          exec('php project/process_json.php', (err, stdout, stderr) => {
            if (err) {
              console.error('PHP 실행 에러:', stderr);
            } else {
              console.log(stdout);
            }
          });
        }
        cb(null, file);
      }));
    resolve();
  });
});

gulp.task('clean:project', () => {
  return new Promise(resolve => {
    del.sync(PATH.ASSETS.IMAGES + '/project', { force: true });
    resolve();
  });
});
async function resizeImages() {
  let pattern = /\s/g;
  const transforms = [
    {
      src: '99_project/*.*',
      dist: PATH.ASSETS.IMAGES + '/project',
      options: {
        width: 1268,
        height: 824,
        fit: 'cover',
      },
    },
  ];
  transforms.forEach(function(transform) {
    if (!fs.existsSync(transform.dist)) {
      fs.mkdirSync(transform.dist, { recursive: true }, err => {
        if (err) throw err;
      });
    }
    let files = glob.sync(transform.src);
    files.forEach(function(file) {
      let filename;
      if (path.basename(file).match(pattern)) {
        filename = path.basename(file).replace(/\s/g, '_');
      } else {
        filename = path.basename(file);
      }
      //filename = `${filename.split('.')[0]}.jpg`;
      sharp(file).resize(transform.options).withMetadata().toFormat('jpg', { quality: 70 }).toFile(`${transform.dist}/${filename.split('.')[0]}.jpg`).catch(err => {
        console.log(err);
      });
    });
  });
}

gulp.task('image:resize', () => {
  return Promise.resolve(resizeImages());
});

gulp.task('imagemin', () => {
  return new Promise(resolve => {
    gulp
      .src([PATH.ASSETS.IMAGES + '/*.*', PATH.ASSETS.IMAGES + '/**/*.*', PATH.ASSETS.IMAGES + '/**/**/*.*', PATH.ASSETS.IMAGES + '/**/**/**/*.*'])
      .pipe(plumber({ errorHandler: onErrorHandler }))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 3 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ]),
      )
      .pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES));
    //.pipe(browserSync.reload({stream: true}));
    resolve();
  });
});

gulp.task('fonts', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.FONTS + '/*.*').pipe(gulp.dest(DEST_PATH.ASSETS.FONTS));
    resolve();
  });
});

gulp.task('nodemon:start', () => {
  return new Promise(resolve => {
    nodemon({
      script: 'app.js',
      watch: 'app',
    });
    resolve();
  });
});
gulp.task('watch', () => {
  return new Promise(resolve => {
    const scss_watcher = gulp.watch(PATH.ASSETS.STYLE + '/**/*.scss', gulp.series(['scss:compile']));
    const image_watcher = gulp.watch([PATH.ASSETS.IMAGES + '/*.*', PATH.ASSETS.IMAGES + '/**/*.*', PATH.ASSETS.IMAGES + '/**/**/*.*', PATH.ASSETS.IMAGES + '/**/**/**/*.*'], gulp.series(['imagemin']));
    const imageRe_watcher = gulp.watch([PATH.ASSETS.IMAGES + '/project/*.*'], resizeImages());
    file_management(image_watcher, PATH.ASSETS.IMAGES, DEST_PATH.ASSETS.IMAGES);
    file_management(scss_watcher, PATH.ASSETS.STYLE, DEST_PATH.ASSETS.STYLE);
    file_management(imageRe_watcher, PATH.ASSETS.IMAGES + '/project/*.*', DEST_PATH.ASSETS.IMAGES + '/project');
    gulp.watch([PATH.ASSETS.SCRIPT + '/*.js', PATH.ASSETS.SCRIPT + '/**/*.js'], gulp.series(['script:build']));
    gulp.watch(PATH.ASSETS.DATA + '/*.xlsx', gulp.series(['excel:convert']));
    gulp.watch(PATH.ASSETS.DATA + '/*.*', gulp.series(['script:data']));
    gulp.watch(PATH.ASSETS.DOWNLOAD + '/*.*', gulp.series(['download']));
    //gulp.watch([PATH.ASSETS.IMAGES + '/*.*', PATH.ASSETS.IMAGES + '/**/*.*'], gulp.series(['imagemin']));
    resolve();
  });
});
gulp.task('download', () => {
  return new Promise(resolve => {
    gulp.src(PATH.ASSETS.DOWNLOAD + '/*.*')
      .pipe(gulp.dest(DEST_PATH.ASSETS.DOWNLOAD)
    );
    resolve();
  });
});
const file_management = (watcher_target, src_path, dist_path) => {
  watcher_target.on('unlink', filepath => {
    const filePathFromSrc = path.relative(path.resolve(src_path), filepath);
    const extension_type = filePathFromSrc.split('.')[filePathFromSrc.split('.').length - 1];
    // scss 삭제 (min파일까지 생성했을 때)
    if (extension_type === 'scss') {
      const destFilePath_css = path.resolve(dist_path, filePathFromSrc).replace('scss', 'css');
      del.sync(destFilePath_css);
      const destFilePath_minCss = path.resolve(dist_path, filePathFromSrc).replace('scss', 'min.css');
      del.sync(destFilePath_minCss);
    } else {
      // scss 외 파일 삭제
      const destFilePath = path.resolve(dist_path, filePathFromSrc);
      del.sync(destFilePath);
    }
  });
};

gulp.task('clean', () => {
  return new Promise(resolve => {
    del.sync(DEST_PATH.HTML, { force: true });
    resolve();
  });
});

gulp.task('browserSync', () => {
  return new Promise(resolve => {
    browserSync.init(null, {
      proxy: 'http://localhost:88',
    });
    resolve();
  });
});

gulp.task(
  'default',
  gulp.parallel([
    'clean',
    'scss:compile',
    'script:data',
    'script:build',
    'excel:convert',
    'library',
    //'image:resize',
    'imagemin',
    'fonts',
    'download',
    'browserSync',
    'watch',
  ]),
);

gulp.task('images', gulp.series(['clean:project', 'image:resize']));
