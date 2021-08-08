<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiForFrontEndFrameworks\SanctumAuth;
use App\Http\Controllers\ApiForFrontEndFrameworks\CategoryControllerAPI;
use App\Http\Controllers\ApiForFrontEndFrameworks\ProductControllerAPI;
use App\Http\Controllers\StripeController;
// use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



/**
 * #Global Public Routes Authentication Systems
 * 
 * Of course this is also part of the FrontEnd depending
 * if your website have some sort of subscription plan based
 * or any but if its where like say just a normal e-commerce site most do not
 * include the Log In or Register in the FrontEnd because users can just
 * add to cart and pay via a gateway like paypal or stripe that requires their credentials online
 * and the Log In is mostly for the Admins of the Site and the Registering of users
 * is taken care of by the app developer 
 *  
 *  
*/
Route::post('/sanctum-register/', [SanctumAuth::class, 'triggered_state_from_react_register_gui_form']);
Route::post('/sanctum-login', [SanctumAuth::class, 'triggered_state_from_react_login_gui_form']);



/**
 * #Global Public Routes CRUD
 * 
 * This is what Clients can do in the FrontEnd for example when they click 
 * a button or submit a form that creates an event for triggering such 
 * functionalities like calling an API for Adding a Product under the hood
 * and storing it in the database temporarily 
 *  
 *  
*/
Route::group(['namespace' => 'App\Http\Controllers\ApiForFrontEndFrameworks'], function() {
  Route::get('/get-products', [ProductControllerAPI::class, 'read_products_for_clients']);
  Route::get('/get-products/{id}', [ProductControllerAPI::class, 'read_products_for_clients_by_id']);
  Route::post('/stripe', [StripeController::class,'stripePayment'])->name("stripe.post");
  Route::post('/checkout', [StripeController::class,'checkout'])->name("stripe.post");
  Route::get('products/{product}/addToCart', 'ProductControllerAPI@addToCart')->name('products.addToCart');
  Route::get('retrived-cart-items', 'CartController@index')->name('cart');
  Route::get('cart/{product}/remove', 'CartController@removeProduct')->name('cart.removeProduct');
  Route::post('checkout-to-stripe', 'StripeCheckoutController@checkout')->name('checkout.creates.stripe.session');
  Route::post('test-checkout-to-stripe', 'StripeCheckoutController@testPreBuilt')->name('checkout.creates.stripe.session');

  // Route::get('/search-products/{name}', [Products::class, 'search']);
});


/**
 * #Protected Routes
 * the @var string = 'isAPIAdmin' is defined at \app\Http\Kernel.php which in turn is in sync or mapped to 
 * app\Http\Middleware\ApiForFrontEndAdminMiddleware.php for creating Authorization Rules in accessing
 * certain URL that is still part of the overall web application 
 * 
 * For Example 
 *  The Backend Interface which, or simply known as the Admin Dashboard Panel
 *  that lets you do certain task in managing the Web Application behind the scenes
 *  like changing some Images or Text for the Client to be visible in the Frontend part of your WebApp
 *  
 *  pretty much like the concepts of any other CMS for Blogging that lets you change the look or vibe of your
 *  website for instance, the rapid ready to deploy development of websites the infamous Wordpress which is 
 *  written in php also like Laravel and WIX.
 *  
 *  
*/
Route::group(['middleware' => ['auth:sanctum', 'isAPIAdmin']], function () {
  Route::get('/checkingAuthenticated', function() {
    return response()->json(['message'=>'You are in', 'status'=>200],200);
  });

  Route::apiResources(['/Sanctum-CategoryKeyForAdminsOnly' => 'App\Http\Controllers\ApiForFrontEndFrameworks\CategoryControllerAPI']);
  Route::get('/Sanctum__ForAdminsOnly/GetAllCategory_Where__statusIsZero', [CategoryControllerAPI::class, 'getAllCategory__withCondition']);
  Route::apiResources(['/Sanctum-ProductKeyForAdminsOnly' => 'App\Http\Controllers\ApiForFrontEndFrameworks\ProductControllerAPI']);
  Route::post('/spoofer-put-products', [ProductControllerAPI::class, 'putSpoofer']);

});


/**
 * #Protected Routes
 * This is yet another protected route but of course with some conditions
 * for example if the role="not_an_admin" and you are logged in with that role 
 * you cannot logged out because of the 'IsAPIAdmin' so I separated the two
 * for logging out purposes
 *  
*/
Route::middleware(['auth:sanctum'])->group(function(){
  Route::post('/sanctum-logout/', [SanctumAuth::class, 'triggered_state_from_react_logout_button']);
});
