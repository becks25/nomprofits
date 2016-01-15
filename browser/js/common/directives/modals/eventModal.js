app.controller('eventModalCtrl', function($scope, $uibModalInstance, EventsFactory, CurrentFactory){
                $scope.events = CurrentFactory.currentEvent;
                $scope.events_orig = {};

                _.assign($scope.events_orig, CurrentFactory.currentEvent);

                $scope.close = () => {
                  _.assign($scope.events, $scope.events_orig);
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.save_events = () => {
                  console.log('saving events');
                  console.log($scope.events_orig.name);
                  if($scope.events_orig.name == undefined){
                    console.log('yo');
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

                $scope.delete_events = () => {
                  EventsFactory.destroy($scope.events)
                  .then(deleted => {
                    console.log('success');
                    $scope.close();
                  });
                }
              });