module.exports = ['PostEndpoint', 'moment', '_','PostsSdk', function (PostEndpoint, moment, _, PostsSdk) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            key: '=',
            attribute: '=',
            type: '=',
            activeLanguage: '='
        },
        template: require('./post-value.html'),
        link: function ($scope) {
            // This whole directive is wrong and it should feel wrong
            // Depending on whether we are dealing with a post task or a standard task
            // the css class is swapped. This Boolean manages that distinction.
            $scope.standardTask = $scope.type === 'standard';
            $scope.isText = isText;
            if ($scope.attribute.type === 'relation') {
                PostsSdk.getPosts($scope.attribute.type).then(post=>{
                    $scope.attribute.value = post;
                    $scope.$apply();
                });

            }
            function isText(type) {
                if ($scope.attribute.type === 'varchar' || $scope.attribute.type === 'title' || $scope.attribute.type === 'description' || $scope.attribute.type === 'text' || $scope.attribute.type === 'markdown') {
                    return true;
                }
                return false;
            }

            if ($scope.attribute.type === 'datetime') {
                if ($scope.attribute.input === 'date') {
                    $scope.attribute.value = $scope.attribute.value.map(function (entry) {
                        return moment(entry).format('LL');
                    });
                }
                if ($scope.attribute.input === 'datetime') {
                    $scope.attribute.value = $scope.attribute.value.map(function (entry) {
                        return moment(entry).format('LLL');
                    });
                }
                if ($scope.attribute.input === 'time') {
                    $scope.attribute.value = $scope.attribute.value.map(function (entry) {
                        return moment(entry).format('LT');
                    });
                }
            }
        }
    };
}];
