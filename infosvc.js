angular.module('infoSvc',[]).service('infoService',function() {
	var info = {};

	return {
		getInfo : function() {
			return info;
		},
		setInfo: function(inp) {
			info = inp;
		} 
	}
})