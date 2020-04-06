const gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify");

/* BrowserSync 
  ==========================*/

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

/* HTML 
  ==========================*/
gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

/* CSS 
  ==========================*/

gulp.task("sass", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("style", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/magnific-popup/dist/magnific-popup.css",
      "node_modules/slick-carousel/slick/slick.css",
    ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("app/css"));
});

/* JS 
  ==========================*/
gulp.task("js", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

/* Scripts 
  ==========================*/
gulp.task("script", function () {
  return gulp
    .src([
      "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      "node_modules/slick-carousel/slick/slick.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

/* Terminal 
  ==========================*/
gulp.task("watch", function () {
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/js/*.js", gulp.parallel("js"));
});

gulp.task("default", gulp.parallel("style", "script", "watch", "browser-sync"));
