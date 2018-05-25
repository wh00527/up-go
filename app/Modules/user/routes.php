<?php

Route::group(array('module' => 'User', 'namespace' => 'App\Modules\User\Controllers'), function() {


    Route::get('user/login', [
        'uses' => 'UserController@index'
    ]);

    Route::get('user/sign-up', [
        'uses' => 'UserController@sign'
    ]);

    Route::post('user/sign', 'UserController@postSign');

    Route::get('user/sendMail', [
        'uses' => 'UserController@sendMail'
    ]);

    Route::post('user/login', 'UserController@postLogin');

    Route::get('user/logout', [
        'uses' => 'UserController@logout'
    ]);

    Route::get('user/kevin', [
        'uses' => 'UserController@kevin'
    ]);





    Route::get('user/edit-password', [
        'middleware' => ['roles'],
        'uses' => 'UserController@editPassword',
        'roles' => ['agency admin', 'landlord']
    ]);

    Route::post('user/update-password', [
        'uses' => 'UserController@updatePassword'
    ]);

    Route::get('user/edit-profile', [
        'uses' => 'UserController@editProfile'
    ]);

    Route::post('user/update-profile', [
        'uses' => 'UserController@updateProfile'
    ]);

    Route::get('user/create-user', [
        'uses' => 'UserController@createUser'
    ]);

    Route::post('user/create-user', [
        'uses' => 'UserController@postCreateUser'
    ]);

    //Route::get('user/data', 'UserController@data');
    //Route::get( 'user/upload', 'UserController@upload');
    //Route::post('user/upload', 'UserController@do_upload');
    Route::model('userModel','Employee');
    Route::resource('user', 'UserController');
});	