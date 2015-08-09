var app = angular.module("fsmTest", []);

app.controller("StateController", function($scope,stateMachine){
	$scope.test = "This is a sample";
	$scope.state = {};
	$scope.state.error = false;
	$scope.state.bVisible= true;
	$scope.state.yVisible= false;
	$scope.state.rVisible= false;
	var states = stateMachine.getAvailableStates($scope);
	var fsm = stateMachine.getFsm(states[0]);
	function stateNotInErr(){
		if($scope.state.error) {
			alert("Current state error must be resolved before changing state");
			return false;
		}
		return true;
	}
	$scope.next = function(){
		if(stateNotInErr()){
			fsm.nextState();
		}
	}
	$scope.prev = function(){
		if(stateNotInErr()){
			fsm.previousState();
		}
	}
	$scope.errorState = function(){
		fsm.error();
	}
	$scope.resetError = function(){
		fsm.resetErr();
	}
});

