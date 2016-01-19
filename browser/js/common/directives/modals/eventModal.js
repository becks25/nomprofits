app.controller('eventModalCtrl', function($scope, $uibModalInstance, EventsFactory, CurrentFactory, ChefsFactory){
                $scope.events = CurrentFactory.currentEvent || {};
                $scope.events_orig = {};
                $scope.chefs = CurrentFactory.allChefs;
                $scope.partners = CurrentFactory.allPartners;

                $scope.selected_chef;
                $scope.selected_partner;

                _.assign($scope.events_orig, CurrentFactory.currentEvent);

                $scope.close = () => {
                  _.assign($scope.events, $scope.events_orig);
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.save_event = () => {
                  console.log('saving events');
                  console.log($scope.events_orig.name);
                  if($scope.events_orig.name == undefined){
                    EventsFactory.create($scope.events)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.events_orig, $scope.events);
                      CurrentFactory.currentEvent = $scope.events;
                      $scope.close();
                    });
                  }else{
                    EventsFactory.save($scope.events)
                    .then(saved => {
                      console.log('success');
                      _.assign($scope.events_orig, $scope.events);
                      CurrentFactory.currentEvent = $scope.events;
                      $scope.close();
                    });

                  }
                };

                $scope.delete_event = () => {
                  EventsFactory.destroy($scope.events)
                  .then(deleted => {
                    console.log('success');
                    $scope.close();
                  });
                };

                $scope.addchef = () => {
                  if(!$scope.selected_chef) return;
                  if(!$scope.events.chefsId) $scope.events.chefsId = [];                  
                  $scope.events.chefsId.push($scope.selected_chef);

                };

                $scope.addpartner = () => {
                  console.log($scope.selected_partner)
                  if(!$scope.selected_partner) return;
                  if(!$scope.events.partnersId) $scope.events.partnersId = [];                  
                  $scope.events.partnersId.push($scope.selected_partner);
                  console.log($scope.events.partnersId);

                };
              });