<?php namespace App\Modules\Issue\Controllers;

use App\Modules\Abstracts\Controllers\BaseController;
use App\Modules\Issue\Models\Issue;
use App\Modules\Issue\Models\IssueDetail;
use App\Modules\User\Models\User;
use Illuminate\Http\Request;
use App\Modules\Rental\Models\Rental;
use Illuminate\Support\Facades\Redirect;
use App\Modules\Rental\Models\PropertyDetail;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Modules\Message\Models\Media;

class IssueController extends BaseController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('issue::issue.list', ['data' => Issue::getAll(
            isset($_REQUEST['rental_id']) ? $_REQUEST['rental_id'] : null,
            isset($_REQUEST['requester_user_id']) ? $_REQUEST['requester_user_id'] : null,
            isset($_REQUEST['property_id']) ? $_REQUEST['property_id'] : null
        )]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        var_dump($request->all());
        $rental = Rental::findOrFail($request->all()['rental_id']);
        $user = User::findOrFail($request->all()['requester_user_id']);
        $issue = [
            'id' =>$request->all()['issue_id'],
            'rental' => $rental,
            'status' => $request->all()['issue_status'],
            'requester_user' => $user,
        ];
        $issue = Issue::store($issue['requester_user'], $issue['rental'], $issue['status'], $issue['id']);

        $details = self::stripPropertyDetailOptions($request);
        foreach($details as $detail_id => $detail)
        {
            var_dump($detail);
            IssueDetail::store(
                $issue,
                self::issetOrDefault($detail, 'content'),
                self::issetOrDefault($detail, 'type'),
                self::issetOrDefault($detail, '3rdParty'),
                intval(self::issetOrDefault($detail, 'priority')),
                self::issetOrDefault($detail, 'media'),
                $detail_id === 'new' ? null : $detail_id
            );
        }
        die;
        return Redirect::route('issue.index');
    }
    public static function issetOrDefault($array, $index, $default = null)
    {
        return isset($array[$index]) ? $array[$index] : $default;
    }
    public static function stripPropertyDetailOptions(Request $request)
    {
        $result = [];
        $regex = ['existing' => '/^issue_detail_/', 'new' => '/^issue_detail_new_/'];
        $request = ($request instanceof Request ? $request->all() : (is_array($request) ? $request : []));
        foreach(array_keys($request) as $key)
        {
            $striped_key = preg_replace($regex['existing'], '', $key);
            preg_match('/\d+/', $striped_key, $detail_id);
            if(sizeof($detail_id) < 1)
                continue;
            $detail_id = (intval($detail_id[0]) === 0 ? 'new' : intval($detail_id[0]));
            if(!isset($result[$detail_id]))
                $result[$detail_id] = ['media' => []];

            $field = preg_replace('/\d_/', '', $striped_key);
            if(preg_match('/^(media_id_|media_new)/', $field) === 1)
            {
                $media = Media::find($media_id = intval(preg_replace('/^media_id_/', '', $field)));
                if(($file = $request[$key]) instanceof UploadedFile && $file->isValid())
                {
                    $fileName = $file->getClientOriginalName();
                    if(pathinfo($fileName, PATHINFO_FILENAME) === '')
                    $fileName = 'file' . $fileName;
                    if(pathinfo($fileName, PATHINFO_EXTENSION) === '')
                    $fileName .= '.' . (trim($file->guessClientExtension()) !== '' ? $file->guessClientExtension() : $file->guessExtension());
                    $media = Media::store(file_get_contents($file->getPathName()), $file->getMimeType(), $fileName);
                }
                if($media instanceof Media && boolval($request[$key]) === true)
                    $result[$detail_id]['media'][$media->id] = $media;
            } else $result[$detail_id][$field] = $request[$key];
        } // endforeach
        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = 0)
    {
        return view('issue::issue.detail', ['issue' => Issue::find($id), 'users' => User::getAll(PHP_INT_MAX), 'rentals' => Rental::getAll(null, PHP_INT_MAX)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Issue::destroy($id);
        return Redirect::to('issue');
    }
}
