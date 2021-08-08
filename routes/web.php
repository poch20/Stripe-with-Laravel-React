<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RedirectsForFrontEndFrameworks;

use App\Models\CartItem;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
  return view('welcome');
});


/**
 * 
 * This is just a Test and Simply PHP alone
 * with vanilla js handling the fetch http
 * for calling the stripe controller
 * 
 * No React Integration just plain ol' html and php
 * 
*/
Route::prefix('/')->group(function() {
  Route::get('/stripe-gateway-test', function () {
      return view('stripe_payment_system');
  });


/**
 * #URLS or definition of URL Domains for calling an API or other like accessing the
 * interface part of the page (The HTML, CSS, JS) or simply the Client-Side GUI or UI
 * for that matter 
 * 
 * The first below is a group of routes for example from Stripe when successfuly or canceled
 * it redirects you back to this defined routes
 * 
 * 
*/
  Route::group(['namespace' => 'App\Http\Controllers\ApiForFrontEndFrameworks'], function() {
    Route::get('checkout-success', [RedirectsForFrontEndFrameworks::class,'success'])->where( 'path','([-a-z0-9_/s]+)' )
    ->name('checkout-success');
    Route::get('checkout-canceled', [RedirectsForFrontEndFrameworks::class,'cancel'])->where( 'path','([-a-z0-9_/s]+)' )
    ->name('checkout-cancel');
    Route::get('success', 'StripeCheckoutController@success')->name('success');
    Route::get('cancel', 'StripeCheckoutController@cancel')->name('cancel');
  });

  /**
   * This funky looking route is simply for FrontEnd Frameworks
   * that have their own Routes like Angular, React or Vue 
   * to be not interrupt or Intersect with Laravels Own Default FrontEnd
   * Blade View and Blade Components if for example reloading the page 
   * it will not be a blank white page because as we know 
   * 
   * Frontend Frameworks are SPA's that requires no reloading when
   * clicking a button or a link (Reactive) unlike server-side like
   * Laravel or Django
   * 
   * Of course this is if you put your FrontEnd Frameworks here in this Laravel
   * App Directory because the port 8000 is the same so you are basically 
   * entering the same URL once you reload it jumps back to Laravels own
   * Web Routes
   * 
   * 
  */
  Route::get('{path}', function() {
    return view('welcome');
  })->where( 'path','([-a-z0-9_/s]+)' )
  ->name('any.path');

  Route::get('laravelphp_version_of_cartItem', function () {
    $cartItems = CartItem::with('product')->get();
    return view('cart', compact('cartItems'));
  });
  Route::group( ['middleware' => ['auth:sanctum', 'verified'] ], function () {
  });
});
