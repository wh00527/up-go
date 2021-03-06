<?php namespace App\Modules\Message\Models;

use App\Modules\Abstracts\Models\BaseModel;

class Media extends BaseModel
{
    protected $fillable = ['mimeType', 'name', 'path'];
    public static function store(string $content, $mimeType = '', $name = '', $id = null)
    {
        $dir = dirname(__FILE__) . DIRECTORY_SEPARATOR . str_repeat('..' . DIRECTORY_SEPARATOR, 4) . 'public' . DIRECTORY_SEPARATOR . 'media';
        $path = $dir . DIRECTORY_SEPARATOR . sha1($content);
        file_put_contents($path, $content);
        return self::updateOrCreate(['id' => $id], ['path' => '/media/' . basename($path), 'mimeType' => $mimeType, 'name' => $name]);
    }
    public static function getById($id)
    {
        return (is_array($tmp = parent::getById($id)) ? $tmp : [$tmp]);
    }
}