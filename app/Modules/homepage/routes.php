<?php

Route::group(array('module' => 'Homepage', 'namespace' => 'App\Modules\Homepage\Controllers'), function() {

    Route::resource('homepage', 'HomepageController');
    
});	