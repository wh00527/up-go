<?php namespace App\Modules\Business\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use Redirect;
use Validator;
use Storage;
use App\Modules\User\Models\User;
use App\Modules\business\Models\Business;
use Illuminate\Support\Facades\Input;

class BusinessController extends Controller {

    /**
     * show for get jobs page
     *
     * @return Response
     */

	public function getJobs(){

	    return view("business::jobs");
    }

	public function __construct(){
		$value = Session::get('currentUserId');
		$user_type = Session::get('currentUserRole');
		if(!$value){
			Redirect::to('user')->send();
		}
		if($user_type != 1){
			Redirect::to('employee');
		}
	}

	public function index(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		$rcount = Business::getReleaseCount($value);
		$vcount = Business::getValidCount($value);
		$icount = Business::getInvalidCount($value);
		$acount = Business::getApplyCount($value);
		$data = Business::getNewestJobs($value);
		return view("business::index",compact('user','rcount','vcount','icount','acount','data'));
	}

	public function jobList(){
		$value = Session::get('currentUserId');
		$data = Business::getJobList($value);
		$title = '';
		$trade = '';
		return view("business::jobs",compact('data','title','trade'));
	}

	public function searchJob(Request $request){
		$value = Session::get('currentUserId');
		$title = '';
		$trade = '';
		if($request->title){
			$title = $request->title;
		}
		if($request->trade){
			$trade = $request->trade;
		}
		$data = Business::getSearchJobList($value,$title,$trade);
		return view("business::jobs",compact('data','title','trade'));
	}

	public function jobInfo($id){
		$data = Business::getJobInfo($id);
		Business::addview($id);
		return view("business::index",compact('data'));
	}

	public function applicantList(){
		$value = Session::get('currentUserId');
		$data = Business::getApplicantList($value);
		return view("business::index",compact('data'));
	}

	public function settings(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		return view("business::index",compact('user'));
	}

	public function setJob(){
		$value = Session::get('currentUserId');
		$user = User::getUserInfo($value);
		if($user->company && $user->address){
			return view("business::test",compact('user'));
		}else{
			return Redirect::to('dashboard/settings');
		}
	}

	public function editUserInfo(){
		$data = Input::all();
		// $data['company'] = 1;
		// $data['address'] = 2;
		// $data['billing_address'] = 3;
		// $data['phone'] = 4;
		// $data['name'] = 5;
		$rules = array(
		 'company' => 'required',
		 'address' => 'required|min:6',
		);
		$validator = Validator::make($data, $rules);
		if ($validator->fails()){
			return Redirect::to('user/sign-up')->withInput(Input::except('password'))->withErrors($validator);
		}else{
			$value = Session::get('currentUserId');
			$user = User::getUserInfo($value);
			if($user->type != 1){
				return Redirect::to('homepage');
			}else{
                $datas = array();
				$user = User::editCompanyUserInfo($value,$datas);
				if($user){
				// ok
					return Redirect::to('dashboard/settings');
				}else{
				// error
					return Redirect::to('dashboard/settings');
				}
			}
		}
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
	        	$file = Input::file('Logo');
				if(!empty($file)){
					$clientName = $file -> getClientOriginalName();
					$tmpName = $file ->getFileName();
					$realPath = $file -> getRealPath();
					$entension = $file -> getClientOriginalExtension();
					$mimeTye = $file -> getMimeType();
					$newName = md5(date("Y-m-d H:i:s").$clientName).".".$entension;
					$path = $file -> move(public_path().'/storage/uploads',$newName);
				}
	        	// $datas[''] = $data[''];
	        	$res = Business::addJob($data);
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
