var app = angular.module('HealthApp', []);
app.controller('MainController', function($scope, $window) {
    $scope.doctors = [
        {name: 'Dr. Harsh Savalia', username: 'harsh', password: 'password123'},
        {name: 'Dr. Smith', username: 'smith02', password: 'docpassword'},
        {name: 'Dr. Anjali', username: 'naiya', password: 'securelogin'},
        {name: 'Dr. Rajesh', username: 'rajesh_m', password: 'mypassword'},
        {name: 'Dr. Sarah', username: 'sarah_k', password: 'health123'}
    ];

    // 2. Data Persistence Logic
    // This pulls existing records from the browser's storage so they don't disappear on refresh
    $scope.patients = JSON.parse(localStorage.getItem('patientData')) || [
        {uhid: '1001', name: 'Ramesh Kumar', age: 45, diagnosis: 'Mild Hypertension', symptoms: 'Dizziness', prescriptions: 'Amlodipine 5mg'}
    ];

    // 3. Login Logic
    $scope.login = function() {
        let found = $scope.doctors.find(d => d.username === $scope.username && d.password === $scope.password);
        
        if (found) {
            // Store login state in sessionStorage (clears when tab closes)
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('doctorName', found.name);
            $window.location.href = 'doctor.html';
        } else {
            $scope.errorMessage = "Invalid Credentials. Access Denied.";
        }
    };
    $scope.checkAuth = function() {
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            alert("Unauthorized access! Please login as a doctor.");
            $window.location.href = 'login.html';
        }
        $scope.currentDoctor = sessionStorage.getItem('doctorName');
    };
    $scope.newPatient = {}; 

    $scope.addPatient = function() {
        // Add the new patient to the local array
        $scope.patients.push(angular.copy($scope.newPatient));
        
        // Save the updated array back to localStorage (Persistent Storage)
        localStorage.setItem('patientData', JSON.stringify($scope.patients));
        alert("Record Added Successfully!");
        $window.location.href = 'doctor.html';
    };

    // 6. Search Patient Logic
    $scope.searchPatient = function() {
        $scope.foundPatient = $scope.patients.find(p => p.uhid === $scope.searchID);
        
        if (!$scope.foundPatient) {
            alert("No patient found with UHID: " + $scope.searchID);
        }
    };
    $scope.logout = function() {
        sessionStorage.clear();
        $window.location.href = 'login.html';
    };
});