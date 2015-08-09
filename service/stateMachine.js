angular.module("fsmTest").factory("stateMachine", function(){

	function StateMachine(initState, scope){
		this.state = initState;
		this.state.action();
		this.nextState = function(){
			if(this.state.nextState != undefined){
				var nextSwitch = this.state.nextState;
				this.state = nextSwitch;
				this.state.action();
			}
		}
		this.previousState = function(){
			if(this.state.previousState != undefined){
				var prev = this.state.previousState;
				this.state = prev;
				this.state.action();;
			}
		}
		this.error = function(){
			this.state.error();
		},
		this.resetErr = function(){
			this.state.resetErr();
		}
	}
	function getAvailableStates(scope){
		var state1 = {
			action: function(){
				scope.state.bVisible = true;
				scope.state.yVisible= false;
				scope.state.rVisible= false;
			},
			error: function(){
				scope.state.error = true;
				scope.errorMessage = "State 1 i.e. blue state is in error";
			},
			resetErr: function(){
				scope.state.error = false;
				state1.action();
			}
		};
		var state2 = {
			previousState: state1,
			action: function(){
				scope.state.bVisible = false;
				scope.state.yVisible= true;
				scope.state.rVisible= false;
			},
			error: function(){
				scope.state.error = true;
				scope.errorMessage = "State 2 i.e. yellow state is in error";
			},
			resetErr: function(){
				scope.state.error = false;
				state2.action();
			}
		};
		var state3 = {
			previousState: state2,
			action: function(){
				scope.state.bVisible = false;
				scope.state.yVisible= false;
				scope.state.rVisible= true;
			},
			error: function(){
				scope.state.error = true;
				scope.errorMessage = "State 3 i.e. red state is in error";
			},
			resetErr: function(){
				scope.state.error = false;
				state3.action();
			}
		};
		state1.nextState = state2;
		state2.nextState = state3;
		state3.previousState = state2;
		var states = [state1,state2,state3];
		return states;
	}
	return {
		getFsm: function(initState, scope){
			return new StateMachine(initState, scope);
		},
		getAvailableStates: getAvailableStates,
	}
});