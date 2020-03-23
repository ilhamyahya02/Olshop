<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "order";
    protected $primaryKey = "id";
    protected $fillable = ["id_user" ,"id_alamat", "total", "bukti" ,"status"];

    public function user()
    {
        return $this->belongsTo("App\User", "id", "id_user");
    }
    public function alamat()
    {
        return $this->belongsTo("App\Alamat", "id", "id_alamat");
    }
    public function detail_order()
    {
        return $this->hasMany("App\DetailOrder", "id_order");
    }
}