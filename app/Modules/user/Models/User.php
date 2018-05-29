<?php namespace App\Modules\User\Models;

use App\Modules\Abstracts\Models\BaseModel;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use DB;
use Session;

class User extends BaseModel implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email','role_id', 'brand_id'];
    protected $table = 'user';
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['remember_token'];

    public static function getAll($pageSize)    {
        $query = self::orderBy(array_keys(self::$orderBy)[0], array_values(self::$orderBy)[0]);
        return $query->paginate($pageSize ?: self::$pageSize);
    }

    protected function checkLogin($email){
        $user = DB::table('user')
            // ->leftJoin('passwords', 'users.id', '=', 'passwords.user_id')
            ->where('email', '=', $email)
            //->where('passwords.password', '=', $password)
            ->get();
        return $user;
    }

    protected function signUp($email,$password,$type){
        $user = DB::insert('insert into user (email, password,type,integral) values (?, ?, ?, ?)', [$email,$password,$type,100]);
        return $user;
    }

    protected function getUserInfo($id){
        $user = DB::table('user')
            // ->leftJoin('passwords', 'users.id', '=', 'passwords.user_id')
            ->where('id', '=', $id)
            //->where('passwords.password', '=', $password)
            ->first();
        return $user;
    }

    protected function findCurrentPassword($id,$password){
        // do logic
        $currentPassword = DB::table('passwords')
            ->where('user_id', '=', $id)
            //->where('password', '=', $password)
            ->get();
        return $currentPassword;
    }

    protected function updatePassword($id,$password){
        DB::table('passwords')
            ->where('user_id', $id)
            ->update(['password' => $password ])
        ;
    }

    public function details()	{
        return $this->hasMany(UserDetail::class);
    }

    public function inline()	{
        return ($this->details->first() ? $this->details->first()->fullName() : '') . ' (' . $this->email . ')';
    }

    protected function getCurrentUser($id){
        $currentUser = User::find($id);
        return $currentUser;
    }

    protected function getCurrentUserProfile($id){
        $currentUserProfile = DB::table('user_details')
            ->where('user_id', '=', $id)
            ->first();
        return $currentUserProfile;
    }

    protected function updateCurrentUserProfile($id,$data){
        DB::table('user_details')
            ->where('user_id', $id)
            ->update(['firstName' => $data['firstName'] , 'lastName' => $data['lastName'] , 'contactNumber' => $data['contactNumber'] ])
        ;
    }

    protected function getRelevantUsers($id){

        $currentRole = Session::get('currentUserRole');

        if( $currentRole == 'agency admin' || $currentRole == 'agent' ){
            $relevantUsers = DB::table('user_relationships')
                ->leftJoin('user_details', 'user_relationships.user_id', '=', 'user_details.user_id')
                ->Where('user_relationships.parent_user_id', $id)
                ->get()
            ;

        }else{
            $relevantUsers = DB::table('user_relationships')
                ->leftJoin('user_details', 'user_relationships.user_id', '=', 'user_details.user_id')
                ->where('user_relationships.user_id','=', $id)
                ->get()
            ;
        }


        return $relevantUsers;
    }

}