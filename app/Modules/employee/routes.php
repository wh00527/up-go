<?php

Route::group(array('module' => 'Employee', 'namespace' => 'App\Modules\Employee\Controllers'), function() {

	Route::get('employee/jobs', 'EmployeeController@jobList');

    Route::get('employee/jobInfo/{id}', 'EmployeeController@jobInfo');

    Route::get('employee/applicants', 'EmployeeController@applicantList');

    Route::get('employee/products', 'EmployeeController@products');

    Route::get('employee/settings', 'EmployeeController@settings');

    Route::get('employee/release', 'EmployeeController@setJob');

    Route::post('employee/searchJobList', 'EmployeeController@searchJob');

    Route::post('employee/editUserInfo', 'EmployeeController@editUserInfo');

    Route::resource('employee', 'EmployeeController');
    
});	