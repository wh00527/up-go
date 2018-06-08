<?php namespace App\Modules\Employee\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Employee extends Model {

	// protected $table = 'job';

	protected function getJobList(){
		$data = DB::table('job')
			->orderBy('id','desc')
			->paginate(5);
		return $data;
	}
	
	protected function collection($id,$jobId){
		$user = DB::insert('insert into collection (user_id, job_id) values (?, ?)', [$id,$jobId]);
		return $user;
	}

	protected function apply($id,$jobId){
		$user = DB::insert('insert into apply (user_id, job_id, status) values (?, ?, ?)', [$id,$jobId,1]);
		return $user;
	}
}
