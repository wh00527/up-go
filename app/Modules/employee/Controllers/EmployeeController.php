<?php namespace App\Modules\Employee\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use Redirect;
use Validator;
use Storage;
use App\Modules\User\Models\User;
use App\Modules\dashboard\Models\Dashboard;
use App\Modules\employee\Models\Employee;
use Illuminate\Support\Facades\Input;

class EmployeeController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */

//     public function __construct(){
//         $value = Session::get('currentUserId');
//         $user_type = Session::get('currentUserRole');
//         if(!$value){
//             Redirect::to('user')->send();
//         }
//         if($user_type != 1){
// //            Redirect::to();
//         }
//     }

	public function index(){
		$value = 1;
		$datas = Dashboard::getJobList($value);
		$datas->setPath('employee');
		// return view('dashboard::index',compact('datas'));
		
		// $user = User::getUserInfo($value);
		// $rcount = Dashboard::getReleaseCount($value);
		// $vcount = Dashboard::getValidCount($value);
		// $icount = Dashboard::getInvalidCount($value);
		// $acount = Dashboard::getApplyCount($value);
		// $data = Dashboard::getNewestJobs($value);
		// return view("dashboard::index",compact('user','rcount','vcount','icount','acount','data','datas'));
	}

	public function jobList(){
		$data = Dashboard::getJobList();
		return view("business::jobs",compact('data'));
	}

	public function searchJob(Request $request){
		$title = '';
		$location = '';
		$trade = '';
		if($request->title){
			$title = $request->title;
		}
		if($request->location){
			$location = $request->location;
		}
		if($request->trade){
			$trade = $request->trade;
		}
		$data = Employee::getSearchJobList($title,$location,$trade);
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
			return view("dashboard::test",compact('user'));
		}else{
			return Redirect::to('dashboard/settings');
		}
	}

	public function editUserInfo(){
		// $data = Input::all();
		$file = Input::file('CV');
		if(!empty($file)){// 上传功能
            $clientName = $file -> getClientOriginalName();
			$tmpName = $file ->getFileName();
			$realPath = $file -> getRealPath();
			$entension = $file -> getClientOriginalExtension(); 
			$mimeTye = $file -> getMimeType();
			$newName = md5(date("Y-m-d H:i:s").$clientName).".".$entension;
			$path = $file -> move(public_path().'/storage/uploads',$newName);
		}
			// var_dump($path);
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
		$value = Session::get('currentUserId');
        	$user = User::getUserInfo($value);
        	if($user->type != 2){
        		return Redirect::to('homepage');
        	}else{
                $file = Input::file('CV');
				if(!empty($file)){
					$clientName = $file -> getClientOriginalName();
					$tmpName = $file ->getFileName();
					$realPath = $file -> getRealPath();
					$entension = $file -> getClientOriginalExtension();
					$mimeTye = $file -> getMimeType();
					$newName = md5(date("Y-m-d H:i:s").$clientName).".".$entension;
					$path = $file -> move(public_path().'/storage/uploads',$newName);
				}
				$datas = array();
				// $datas[''] = $data[''];
				if($path){
					$datas['CV'] = $path;
				}
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

	public function collection(){
		$value = Session::get('currentUserId');
		if(!$value){
			return \Response::json(['status' => 'error', 'error_msg' => 'Please log in first', 'code' => 2]);
		}
		$id = Input::get('id');
		$data = Employee::collection($value,$id);
		if($data){
			return \Response::json(['status' => 'error', 'error_msg' => 'Collection success', 'code' => 1]);
		}else{
			return \Response::json(['status' => 'error', 'error_msg' => 'Collection failure', 'code' => 0]);
		}
	}

	public function apply(){
		$value = Session::get('currentUserId');
		if(!$value){
			return \Response::json(['status' => 'error', 'error_msg' => 'Please log in first', 'code' => 2]);
		}
		$id = Input::get('id');
		$data = Employee::apply($value,$id);
		if($data){
			return \Response::json(['status' => 'error', 'error_msg' => 'Application success', 'code' => 1]);
		}else{
			return \Response::json(['status' => 'error', 'error_msg' => 'Application failure', 'code' => 0]);
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