const gulp = require("gulp"),
  sass = require("gulp-sass"),
  imagemin = require("gulp-imagemin"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-Sync").create();

gulp.task("sass", function() {
  gulp
    .src([
      "src/scss/main.scss",
      "node_modules/bootstrap/scss/bootstrap.scss",
      "node_modules/font-awesome/scss/font-awesome.scss"
    ])
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "src/js/app.js"
    ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.stream());
});

gulp.task("imagemin", () => {
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("assets/images"));
});

gulp.task("serve", () => {
  browserSync.init({
    server: "./"
  });
  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("src/images/*", ["imagemin"]);
  gulp.watch("src/js/app.js", ["js"]);
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("default", ["sass", "js", "imagemin", "serve"]);
