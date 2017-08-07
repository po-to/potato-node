var DIST = "./";
var SRC = "./src";

var gulp = require("gulp");
var runSequence = require('run-sequence');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json", {
    //baseUrl: "/xampp/htdocs/typs/src/views",
    //typeRoots: ["types"]
});
var merge = require("merge2");
var typedoc = require("gulp-typedoc");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');




gulp.task("tsc", function () {
    var tsResult = gulp.src(SRC + "/**/*.ts")
        .pipe(tsProject())
    return merge([
        tsResult.dts.pipe(gulp.dest(DIST)),
        tsResult.js.pipe(gulp.dest(DIST))
        //.pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min"+path.extname;
        }))
        .pipe(gulp.dest(DIST))
    ]);
});

gulp.task("tscdoc", function () {
    return gulp.src(SRC + "/**/*.ts")
        .pipe(typedoc({
            module: "commonjs",
            target: "es6",
            includeDeclarations: true,
            out: DIST + "/docs",
            theme : "minimal",
            name: "@po-to/potato-node",
            excludePrivate: true, 
            excludeExternals: true,
            ignoreCompilerErrors: false,
            version: true,
        }))
});

gulp.task('examples', function () {
    connect.server({
        port: "3333", 
        root: ["./examples/"],
        livereload: false
    });
});

gulp.task('bulid', function (callback) { runSequence(['tsc'] , callback) });

gulp.task('default', ["bulid"]);


