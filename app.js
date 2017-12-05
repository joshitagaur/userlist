var app = angular.module('user',['ui.bootstrap','infoSvc']);

app.controller('userCtrl',function($scope,$uibModal,infoService) {
	$scope.search = '';

	$scope.userDetails = [
		{
			'id': 1,
			'fname': 'John',
			'lname': 'Doe',
			'email': 'john@doejohn.com',
			'phone': '9856252562',
			'status': false,
			'statusType': 'Inactive'
		},
		{
			'id': 2,
			'fname': 'Steve',
			'lname': 'Carlos',
			'email': 'steve@stevecarlos.com',
			'phone': '8885485685',
			'status': true,
			'statusType': 'Active'
		},
		{
			'id': 3,
			'fname': 'Jacob',
			'lname': 'Thornton',
			'email': 'jacob@thorntonbros.com',
			'phone': '6845958785',
			'status': false,
			'statusType': 'Inactive'

		}
	];

	var currentList = $scope.userDetails;


	$scope.searchList = function(input) {
		var newList = [];
		for (var i = 0; i < currentList.length; i++) {
			if(currentList[i]['fname'].indexOf(input) != -1) {
				newList.push(currentList[i]);
			}
			if(currentList[i]['lname'].indexOf(input) != -1) {
				newList.push(currentList[i]);
			}
			if(currentList[i]['email'].indexOf(input) != -1) {
				newList.push(currentList[i]);
			}
			if(currentList[i]['phone'].indexOf(input) != -1) {
				newList.push(currentList[i]);
			}
		}
		var uniqueList = newList.filter(function(elem,pos){
			return newList.indexOf(elem) == pos;
		})

		// for (var j= 0; j < newList.length;j++) {
		// 	newList[j]
		// }
		$scope.userDetails = uniqueList;
	}

	$scope.addUser = function() {
		var modalInstance = $uibModal.open({
			animation: true,
      		ariaLabelledBy: 'modal-title',
     		ariaDescribedBy: 'modal-body',
      		templateUrl: 'userForm.html',
      		controller:'userInstanceCtrl'
		})
		modalInstance.result.then(function(inp) {
			if(inp) {
				$scope.userDetails.push({
					'id': $scope.userDetails.length + 1,
					'fname' : inp.fname,
					'lname'	: inp.lname,
					'email'	: inp.email,
					'phone'	: inp.phone,
					'status': inp.showstatus
				})
			}
		})
	}

	$scope.changeStatus = function(input) {
		infoService.setInfo(input);
		var modalInstance = $uibModal.open({
			animation: true,
      		ariaLabelledBy: 'modal-title',
     		ariaDescribedBy: 'modal-body',
      		templateUrl: 'activeForm.html',
      		controller:'activeFormCtrl'
		})
		modalInstance.result.then(function(inp) {
			if(inp) {
				for(var i = 0; i< $scope.userDetails.length; i++) {
					if(inp.id === $scope.userDetails[i].id) {
						$scope.userDetails[i].statusType = inp.revstatusType;
					}
				}
			}
		})
	}
});

app.controller('userInstanceCtrl', function($scope,$uibModalInstance) {
	$scope.newdetails = {
		'fname' : '',
		'lname' : '',
		'email' : '',
		'phone'	: '',
		'status': 'active'
	}

	$scope.addDetails = function() {
		if($scope.newdetails.status === 'active') {
			$scope.newdetails.showstatus = true;
		}
		else {
			$scope.newdetails.showstatus = false;
		}
		$uibModalInstance.close($scope.newdetails);
	}

	$scope.close = function() {
		$uibModalInstance.close();
	}
})

app.controller('activeFormCtrl', function($scope,$uibModalInstance,infoService) {
	$scope.changeStatusDetails = infoService.getInfo();
	if($scope.changeStatusDetails.statusType === 'Active') {
		$scope.changeStatusDetails.revstatusType = 'Inactive';
	}
	else {
		$scope.changeStatusDetails.revstatusType = 'Active';

	}

	$scope.confirm = function() {
		$scope.changeStatusDetails.status = !$scope.changeStatusDetails.status;
		$uibModalInstance.close($scope.changeStatusDetails);
	}
	$scope.close = function() {
		$uibModalInstance.close();
	}
})

