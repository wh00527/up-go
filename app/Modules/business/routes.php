<?php

Route::group(array('module' => 'Business', 'namespace' => 'App\Modules\Business\Controllers'), function() {

    Route::get('business/jobs', [
        'uses' => 'BusinessController@getJobs'
    ]);


    Route::resource('business', 'BusinessController');
    
});	