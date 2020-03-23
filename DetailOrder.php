<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailOrder extends Model
{
    protected $table = "detail_order";
    protected $fillable = ["id_order" ,"id_product", "quantity"];

    public function order()
    {
        return $this->belongsTo("App\Order", "id", "id_order");
    }
    public function products()
    {
        return $this->belongsTo("App\Product", "id", "id_product");
    }
}