<?php
namespace App\Modules\Abstracts\Models;

use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
    public static $pageSize = 5;
    public static $orderBy = ['id' => 'desc'];
}
