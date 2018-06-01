<?php namespace App\Modules\Dashboard\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use Redirect;
use Validator;
use App\Modules\User\Models\User;
use App\Modules\dashboard\Models\Dashboard;
use Illuminate\Support\Facades\Input;

class DashboardController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */

    public function __construct(){
        $value = Session::get('currentUserId');
        $user_type = Session::get('currentUserRole');
        echo $user_type;
        if(!$value){
            Redirect::to('user')->send();
        }

    }

	public function index(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		$rcount = Dashboard::getReleaseCount($value);
		$vcount = Dashboard::getValidCount($value);
		$icount = Dashboard::getInvalidCount($value);
		$acount = Dashboard::getApplyCount($value);
		$data = Dashboard::getNewestJobs($value);
		return view("dashboard::index",compact('user','rcount','vcount','icount','acount','data'));
	}

	public function jobList(){
		$value = Session::get('currentUserId');
		$data = Dashboard::getJobList($value);
		return view("business::jobs",compact('data'));
	}

	public function jobInfo($id){
		$data = Dashboard::getJobInfo($id);
		Dashboard::addview($id);
		return view("dashboard::index",compact('data'));
	}

	public function applicantList(){
		$value = Session::get('currentUserId');
		$data = Dashboard::getApplicantList($value);
		return view("dashboard::index",compact('data'));
	}

	public function settings(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		return view("dashboard::index",compact('user'));
	}

	public function setJob(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		if($user->company && $user->address){
			return view("dashboard::index",compact('user'));
		}else{
			return Redirect::to('dashboard/settings');
		}
	}

	public function editUserInfo(){
		$value = Session::get('currentUserId');
		$data = Input::all();
		// $data['company'] = 1;
		// $data['address'] = 2;
		// $data['billing_address'] = 3;
		// $data['phone'] = 4;
		// $data['name'] = 5;
		// $rules = array(
  //           'company' => 'required',
  //           'address' => 'required|min:6',
  //       );
  //       $validator = Validator::make($data, $rules);
  //       if ($validator->fails()){
  //           return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors($validator);
  //       }else{
        	$user = User::getUserInfo($value);
        	if($user->type != 1){
        		return Redirect::to('homepage');
        	}else{
        		$datas = array();
	        	// $datas[''] = $data[''];
        		$user = User::editUserInfo($value,$datas);
        		if($user){
        			// error
        			return Redirect::to('dashboard/settings');
        		}else{
        			// ok
        			return Redirect::to('dashboard/settings');
        		}
        	}
            // $userinfo = User::checkLogin(Input::get('email'));
            // if($userinfo){
            //     return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors('邮箱已注册');
            // }else{
            //     $user = User::signUp(Input::get('email'),Hash::make(Input::get('password')),Input::get('type'));
            //     if($user){
            //         $userinfo = User::checkLogin(Input::get('email'));
            //         if($userinfo){
            //             Session::put('currentUserId', $userinfo[0]->id);
            //             return Redirect::to('dashboard');
            //         }else{
            //             return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors($validator);
            //         }
            //     }else{
            //         return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors($validator);
            //     }
            // }
        // }
	}

	public function addJob(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		if($user->integral > 0){
			$data = Input::all();
			$rules = array(
	            'company' => 'required',
	            'address' => 'required|min:6',
	        );
	        $validator = Validator::make($data, $rules);
	        if ($validator->fails()){
	            return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors($validator);
	        }else{
	        	// $datas[''] = $data[''];
	        	$res = Dashboard::addJob($data);
	        	if($res){
					User::deductint($value);
					return Redirect::to('dashboard/jobList');
	        	}else{
	        		
	        	}
	        }
		}else{
			return Redirect::to('dashboard/jobList');
		}
	}
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
