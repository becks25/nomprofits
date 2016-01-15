app.controller('chefModalCtrl', function($scope, $uibModalInstance, ChefsFactory, CurrentFactory){
                $scope.chef = CurrentFactory.currentChef;
                $scope.chef_orig = {};

                _.assign($scope.chef_orig, CurrentFactory.currentChef);

                $scope.close = () => {
                  _.assign($scope.chef, $scope.chef_orig);
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.save_chef = () => {
                  console.log('saving chef');
                  console.log($scope.chef_orig.name);
                  if($scope.chef_orig.name == undefined){
                    console.log('yo');
                    ChefsFactory.create($scope.chef)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.chef_orig, $scope.chef);
                      CurrentFactory.currentChef = $scope.chef;
                      $scope.close();
                    });
                  }else{
                    ChefsFactory.save($scope.chef)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.chef_orig, $scope.chef);
                      CurrentFactory.currentChef = $scope.chef;
                      $scope.close();
                    });

                  }
                };

                $scope.delete_chef = () => {
                  ChefsFactory.destroy($scope.chef)
                  .then(deleted => {
                    console.log('success');
                    $scope.close();
                  });
                }
              });