<?php namespace App\Modules\Dashboard\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Dashboard extends Model {

	protected $table = 'job';

	public function getAll(){
		$data = DB::table('job')->get();
        return $data;
	}

	protected function getReleaseCount($id){
		$data = DB::table('job')
			->where('uid', '=', $id)
			->count();
		return $data;
	}

	protected function getValidCount($id){
		$time = time();
		$data = DB::table('job')
			->where('uid', '=', $id)
			->where('starttime','<=',$time)
			->where('endtime','>=',$time)
			->count();
		return $data;
	}

	protected function getInvalidCount($id){
		$time = time();
		$startdata = DB::table('job')
			->where('uid', '=', $id)
			->where('starttime','>=',$time)
			// ->where('endtime','<=',$time)
			->count();
		$enddata = DB::table('job')
			->where('uid', '=', $id)
			// ->where('starttime','>=',$time)
			->where('endtime','<=',$time)
			->count();
		$data = $startdata + $enddata;
		return $data;
	}

	protected function getApplyCount($id){
		$data = DB::table('apply')
			->where('user_id', '=', $id)
			->count();
		return $data;
	}

	protected function getNewestJobs($id){
		$data = DB::table('job')
			->where('uid', '=', $id)
			->orderBy('id','desc')
			->take(2)
			// ->where('endtime','<=',$time)
			->get();
		return $data;
	}

	protected function getJobList($id){
		$data = DB::table('job')
			->where('uid', '=', $id)
			->paginate(5);
		return $data;
	}

	protected function getJobInfo($id){
		$data = DB::table('job')
			->where('id', '=', $id)
			->first();
		return $data;
	}

	protected function getApplicantList($id){
		$data = DB::table('job')
            ->leftJoin('apply', 'job.id', '=', 'apply.job_id')
            ->leftJoin('user', 'user.id', '=', 'apply.user_id')
			->where('uid', '=', $id)
			->get();
		return $data;
	}
}
