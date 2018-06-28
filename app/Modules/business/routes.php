<?php

Route::group(array('module' => 'Business', 'namespace' => 'App\Modules\Business\Controllers'), function() {
	
    Route::get('business/jobs', 'BusinessController@jobList');

    Route::get('business/jobInfo/{id}', 'BusinessController@jobInfo');

    Route::get('business/applicants', 'BusinessController@applicantList');

    Route::get('business/products', 'BusinessController@products');

    Route::get('business/settings', 'BusinessController@settings');

    Route::get('business/release', 'BusinessController@setJob');

    Route::get('business/searchJob/{title}/{trade?}', 'BusinessController@searchJob');

    Route::get('business/searchJobs/{trade}', 'BusinessController@searchJob');
    
    Route::post('business/editUserInfo', 'BusinessController@editUserInfo');

    Route::resource('business', 'BusinessController');
    
});	