<?php namespace App\Modules\Rental\Models;

use App\Modules\Abstracts\Models\BaseModel;
use App\Modules\Rental\Models\PropertyDetail;

class Property extends BaseModel
{
    protected $fillable = ['description', 'address_id'];
    public static function getAll($address_id = null, $pageSize = null)
    {
        $query = self::orderBy(array_keys(self::$orderBy)[0], array_values(self::$orderBy)[0]);
        if($address_id)
            $query->where('address_id', intval($address_id));
        return $query->paginate($pageSize ?: self::$pageSize);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function logs()
    {
        return $this->hasMany(PropertyLog::class);
    }
    public function rentals()
    {
        $data = $this->hasMany(Rental::class);
        return $data;
    }

    public function rental()
    {
        $result = ['averageDailyAmount' => [], 'count' => 0, 'issuesCount' => 0];

        foreach($this->hasMany(Rental::class)->get() as $rental)
        {
            if(doubleval($rental->dailyAmount) > 0)
                $result['averageDailyAmount'][] = doubleval($rental->dailyAmount);
            $result['issuesCount'] += $rental->issues->count();
        }
        $result['count'] = sizeof($result['averageDailyAmount']);
        $result['averageDailyAmount'] = sizeof($result['averageDailyAmount']) > 0 ? array_sum($result['averageDailyAmount']) / sizeof($result['averageDailyAmount']) : 0;
        return $result;
    }

    public function details()
    {
        return $this->hasMany(PropertyDetail::class);
    }

    /**
     * update or create new
     *
     * @param $description
     * @param null $id
     * @return static
     */
    public static function store($description, Address $address = null, $id = null)
    {
        return self::updateOrCreate(['id' => $id], ['description' => $description, 'address_id' => $address->id]);
    }
}