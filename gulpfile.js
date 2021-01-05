// vendors
const { src, dest, watch, series, task, parallel } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const livereload = require("gulp-livereload");
const injectPartials = require("gulp-inject-partials");
const htmlbeautify = require("gulp-html-beautify");
var beautifyOptions = {
  indentSize: 2,
};

sass.compiler = require("sass");

// task callbacks
const sassCompiler = () => {
  return src("src/sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "safari 5",
        "ie 8",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android 4"
      )
    )
    .pipe(dest("src/styles"))
    .pipe(livereload());
};

const watchFiles = () => {
  livereload.listen(5500);
  watch("src/sass/*.scss", sassCompiler);
  watch("src/styles/main.css", livereload());
  watch("src/*.html", livereload());
  watch("src/js/**/*.js", livereload());
};

// You can remove tags by passing {removeTags: true} to injectPartials() method

const concatPartials = () => {
  return src("./src/*.html")
    .pipe(
      injectPartials()
    )
    .pipe(htmlbeautify(beautifyOptions))
    .pipe(dest("./src"));
};

// tasks
task("sass", sassCompiler);
task("browserSync", function () {
  series(
    browserSync.init({
      server: {
        baseDir: "src",
      },
    })
  );
});

task("watch", () => {
  livereload.listen(5500);
  watch("src/sass/*.scss", sassCompiler);
  watch("src/styles/main.css", livereload());
  watch("src/*.html", livereload());
  watch("src/js/**/*.js", livereload());
});

task("index", function () {
  return src("./src/index.html")
    .pipe(injectPartials())
    .pipe(gulp.dest("./src"));
});

exports.default = parallel(watchFiles, concatPartials);
