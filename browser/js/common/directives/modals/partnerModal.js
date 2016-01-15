app.controller('partnerModalCtrl', function($scope, $uibModalInstance, PartnersFactory, CurrentFactory){
                $scope.partner = CurrentFactory.currentPartner;
                $scope.partner_orig = {};

                _.assign($scope.partner_orig, CurrentFactory.currentPartner);

                $scope.close = () => {
                  _.assign($scope.partner, $scope.partner_orig);
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.save_partner = () => {
                  console.log('saving partner');
                  console.log($scope.partner_orig.name);
                  if($scope.partner_orig.name == undefined){
                    console.log('yo');
                    PartnersFactory.create($scope.partner)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.partner_orig, $scope.partner);
                      CurrentFactory.currentPartner = $scope.partner;
                      $scope.close();
                    });
                  }else{
                    PartnersFactory.save($scope.partner)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.partner_orig, $scope.partner);
                      CurrentFactory.currentPartner = $scope.partner;
                      $scope.close();
                    });

                  }
                };

                $scope.delete_partner = () => {
                  PartnersFactory.destroy($scope.partner)
                  .then(deleted => {
                    console.log('success');
                    $scope.close();
                  });
                }
              });