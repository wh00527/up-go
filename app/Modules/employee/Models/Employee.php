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

	protected function getSearchJobList($title,$location,$trade){
		if($trade){
			$tid = DB::table('trade')
					->where('title', 'like', '%'.$trade.'%')
					->lists('id');
		}
		if($title && $location && $trade){
			$data = DB::table('job')
					->where('title','like','%'.$title.'%')
					->where('location','like','%'.$location.'%')
					->whereIn('trade_type', $tid)
					->orderBy('id','desc')
					->paginate(5);
		}else{
			if($title && $location){
				$data = DB::table('job')
					->where('title','like','%'.$title.'%')
					->where('location','like','%'.$location.'%')
					->orderBy('id','desc')
					->paginate(5);
			}else if($title && $trade){
				$data = DB::table('job')
					->where('title','like','%'.$title.'%')
					->whereIn('trade_type', $tid)
					->orderBy('id','desc')
					->paginate(5);
			}else if($location && $trade){
				$data = DB::table('job')
					->where('location','like','%'.$location.'%')
					->whereIn('trade_type', $tid)
					->orderBy('id','desc')
					->paginate(5);
			}else if($title){
				$data = DB::table('job')
					->where('title','like','%'.$title.'%')
					->orderBy('id','desc')
					->paginate(5);
			}else if($location){
				$data = DB::table('job')
					->where('location','like','%'.$location.'%')
					->orderBy('id','desc')
					->paginate(5);
			}else if($trade){
				$data = DB::table('job')
					->whereIn('trade_type', $tid)
					->orderBy('id','desc')
					->paginate(5);
			}else{
				$data = DB::table('job')
					->orderBy('id','desc')
					->paginate(5);
			}
		}
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
