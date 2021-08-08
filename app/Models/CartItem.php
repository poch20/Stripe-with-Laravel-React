<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable = ['carts_id', 'product_id', 'price', 'quantity', 'total'];
    
    /**
     * Inverse of Cart Model or Migration Table
     * 
     * CartItem(Inheritance or Child) extends Cart(Parent/Super)
     * 
     * Example 
     * 
     * @var cartItem = CartItem::find(1)
     * 
     * @return cartItem->cart->property_of_cart_model;
     * 
     */
    public function cart() {
        return $this->belongsTo('App\Models\Cart');
    }
    

    /**
     * Inverse of Product Model
     * 
     * CartItem(Inheritance or Child) extends Product(Parent/Super)
     * 
     * Example 
     * 
     * @var cartItem = CartItem::find(1)
     * 
     * @return cartItem->product->property_of_product_model;
     * 
     */
    public function product() {
        return $this->belongsTo('App\Models\Product');
    }
}
