<?php

Route::group(array('module' => 'Employee', 'namespace' => 'App\Modules\Employee\Controllers'), function() {

    Route::resource('employee', 'EmployeeController');
    
});	