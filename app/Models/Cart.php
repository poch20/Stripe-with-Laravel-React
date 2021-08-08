<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = ['id'];
    
    /**
     * One To Many Relationship
     * 
     * Cart(Parent) has Many CartItems(Children)
     * 
     */
    public function cart_items() {
        return $this->hasMany('App\Models\CartItem');
    }
}
