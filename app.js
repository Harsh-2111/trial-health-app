var app = angular.module('HealthApp', []);
app.controller('MainController', function($scope, $window) {
    $scope.doctors = [
        {name: 'Dr. Harsh Savalia', username: 'harsh', password: 'pass123'},
        {name: 'Dr. Khush', username: 'khush', password: 'khush123'},
        {name: 'Dr. Naiya', username: 'naiya', password: 'naiya123'},
        {name: 'Dr. Pratha', username: 'pratha', password: 'pratha123'},
        {name: 'Dr. Nishtha', username: 'nishtha', password: 'nishtha123'}
    ];

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
    $scope.registerPatient = function() {
    // 1. Get the existing patients from localStorage
    let allPatients = JSON.parse(localStorage.getItem('patientData')) || [];

    // 2. Check if the Aadhar number (regAadhar) already exists in the records
    let existingPatient = allPatients.find(p => p.aadhar === $scope.regAadhar);

    if (existingPatient) {
        // 3. If found, show an error and do not proceed
        alert("Error: A patient with this Aadhar number is already registered with UHID: " + existingPatient.uhid);
        return; // Stop the function here
    }

    // 4. If not found, generate the new UHID as usual
    let newUHID = Math.floor(1000 + Math.random() * 9000).toString();
    
    let patientInfo = {
        uhid: newUHID,
        name: $scope.regName,
        email: $scope.regEmail,
        aadhar: $scope.regAadhar, // Store the Aadhar to check next time
        phone: $scope.regPhone,
        dob: $scope.regDob,
        gender: $scope.regGender,
        region: $scope.regRegion,
        diagnosis: 'Pending First Visit', 
        symptoms: 'N/A',
        prescriptions: 'N/A'
    };

    allPatients.push(patientInfo);
    localStorage.setItem('patientData', JSON.stringify(allPatients));
    localStorage.setItem('lastGeneratedUHID', newUHID);

    $window.location.href = 'registration_success.html';
};

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
    $scope.displayUHID = localStorage.getItem('lastGeneratedUHID');
    $scope.logout = function() {
        sessionStorage.clear();
        $window.location.href = 'login.html';
    };
});
