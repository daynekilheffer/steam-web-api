module.exports = function (grunt) {
    grunt.initConfig({
        jasmine_node : {
            coverage : {
                savePath: './reports/coverage'
            },
            options : {
                specNameMatcher : 'spec',
                projectRoot: '.',
                requirejs: false,
                forceExit: true,
                junitreport: {
                    report: true,
                    savePath : "./reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');

    grunt.registerTask('default', ['jasmine_node']);

};
