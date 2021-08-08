<?php

namespace App\Http\Controllers\ApiForFrontEndFrameworks;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;


use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\Builder;

class CartController extends Controller {
  public function index() {
      $cartItems = CartItem::with('product')->get();
      return response()->json([
        'status' => 200,
        'cartItem_table' => $cartItems
      ]);
  }
  public function removeProduct(Product $product){
      CartItem::where('product_id', $product->id)->delete();
      flash('Product removed from the cart successfully!');
      return redirect()->back();
  }
}
