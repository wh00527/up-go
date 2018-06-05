<?php

Route::group(array('module' => 'Dashboard', 'namespace' => 'App\Modules\Dashboard\Controllers'), function() {

    Route::get('dashboard/jobs', 'DashboardController@jobList');

    Route::get('dashboard/jobInfo/{id}', 'DashboardController@jobInfo');

    Route::get('dashboard/applicants', 'DashboardController@applicantList');

    Route::get('dashboard/products', 'DashboardController@products');

    Route::get('dashboard/settings', 'DashboardController@settings');

    Route::get('dashboard/release', 'DashboardController@setJob');

    // Route::get('dashboard/editUserInfo', 'DashboardController@editUserInfo');
    
    Route::post('dashboard/editUserInfo', 'DashboardController@editUserInfo');

    Route::resource('dashboard', 'DashboardController');
});	