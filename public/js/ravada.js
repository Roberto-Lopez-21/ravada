

    angular.module("ravada.app",['ngResource'])
            .directive("solShowSupportform", swSupForm)
            .directive("solShowNewmachine", swNewMach)
            .directive("solShowListmachines", swListMach)
            .directive("solShowCardsmachines", swCardsMach)
            .directive("solShowMachinesNotifications", swMachNotif)
            .directive("solShowMessages", swMess)
            .service("request", gtRequest)
            .service("listMach", gtListMach)
            .service("listMess", gtListMess)
            .controller("new_machine", newMachineCtrl)
            .controller("SupportForm", suppFormCtrl)
            .controller("machines", machinesCrtl)
            .controller("messages", messagesCrtl)




 
    function newMachineCtrl($scope, $http) {

        $http.get('/list_images.json').then(function(response) {
                $scope.images = response.data;
        });
        $http.get('/list_vm_types.json').then(function(response) {
                $scope.backends = response.data;
        });
        $http.get('/list_lxc_templates.json').then(function(response) {
                $scope.templates_lxc = response.data;
        });


    };

    function suppFormCtrl($scope){
        this.user = {};
        $scope.showErr = false;
        $scope.isOkey = function() {
            if($scope.contactForm.$valid){
                $scope.showErr = false;
            } else{
                $scope.showErr = true;
            }
        }

    };

    function swSupForm() {

        return {
            restrict: "E",
            templateUrl: '/templates/support_form.html',
        };

    };

    function swNewMach() {

        return {
            restrict: "E",
            templateUrl: '/templates/new_machine.html',
        };

    };

// list machines
    function machinesCrtl($scope, $http, request, listMach) {

        $http.get('/list_machines.json').then(function(response) {
                $scope.list_machines= response.data;
        });

        request.get(function( res ) {
            $scope.res = res;
        });

    };

    function swListMach() {

        return {
            restrict: "E",
            templateUrl: '/templates/list_machines.html',
        };

    };

    function swCardsMach() {

        return {
            restrict: "E",
            templateUrl: '/templates/user_machines.html',
        };

    };

    function swMachNotif() {
        return {
            restrict: "E",
            templateUrl: '/templates/machines_notif.html',
        };
    };

    function gtRequest($resource){

        return $resource('/requests.json',{},{
            get:{isArray:true}
        });

    };

    function gtListMach($resource){

        return $resource('/list_machines.json',{},{
            get:{isArray:true}
        });

    };

// list messages
    function messagesCrtl($scope, $http, request) {

        $http.get('/messages.json').then(function(response) {
                $scope.list_message= response.data;
        });

        request.get(function( res ) {
            $scope.res = res;
        });

    };

    function swMess() {
        return {
            restrict: "E",
            templateUrl: '/templates/list_messages.html',
        };
    };

    function gtListMess($resource){

        return $resource('/messages.json',{},{
            get:{isArray:true}
        });

    };

