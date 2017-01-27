/**
 * Created by Minhaj on 1/27/2017.
 */

/**
 * Created by Minhaj on 8/13/2016.
 */
angular.module('app',[])
    .constant('API_URL','http://localhost:4050')
    .controller('appController', function (API_URL,$scope,$http,$timeout,$sce) {

    /*variables*/
    $scope.blog = null;
    $scope.selectedString = null;
    $scope.showTooltip = false;
    var selectedParagraphId = null;
    var queryObject = {};
    /*
     * functions*/

    /*posting comment*/
    $scope.postComment= function(paragraphComment){

        if(selectedParagraphId){

            /*
             *
             paragraphId : String,
             paragraphContent : String,
             paragraphComment : String,
             */
            queryObject = {
                paragraphId : selectedParagraphId,
                paragraphContent : $scope.selectedString,
                paragraphComment : paragraphComment
            };
            $http({
                'method' : 'POST',
                'data' : queryObject,
                url :'http://localhost:4050/api/comment/'+$scope.blog._id,
            }).then(function(response){
                console.log('response',response);
                $scope.blog.comments.push(response.data.data);
                angular.element('#response').modal('hide');
            })

        }else{
            console.log('no paragraph id');
        }
    };
    /*deleting comment*/
    $scope.deleteComment = function(id) {
        $http({
            method: 'DELETE',
            url: API_URL+'/api/comment/' + $scope.blog._id,
            params: {
                commentId: id
            }
        }).then(function () {
            for(var i = 0 ; i < $scope.blog.comments.length; i++){
                if($scope.blog.comments[i]._id == id){
                    $scope.blog.comments.splice(i,1);
                    break;
                }
            }

        },function(err){
            console.log('err',err);
        });
    };
    function init(){

        /*getting dummy blog*/
        $http.get(API_URL+'/api/blog').then(function(res){
            res.data.content =  $sce.trustAsHtml(res.data.content);
            $scope.blog = res.data;

            document.onselectionchange = function() {
                if(window.getSelection().toString().length == 0){
                    angular.element(".tooltip").removeClass("show");

                }
            };

            /*getting selected strings from paragraph*/
            document.getElementById('wrapper').onmouseup = document.getElementById('wrapper').onkeyup = function(event) {
                $scope.selectedString = window.getSelection().toString();
                selectedParagraphId = event.target.getAttribute('id');
                $timeout(function () {
                    if ($scope.selectedString) {
                        /* rendering paragraph selector*/
                        angular.element(".tooltip").addClass("show");
                        angular.element(".tooltip").css({
                            left: event.x,
                            top: event.y
                        })

                    }
                })
            }
        });


        /*re initializing modal and removing paragraph selector  */
        angular.element('#response').on('hide.bs.modal', function(){
            $timeout(function(){
                angular.element(".tooltip").removeClass("show");

                $scope.selectedString = null;
                queryObject = {};
                selectedParagraphId = null;
                $scope.comment = null;
            })
        });

    }


    init();


});


