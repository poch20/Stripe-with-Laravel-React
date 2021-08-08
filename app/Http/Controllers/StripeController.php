<?php

namespace App\Http\Controllers;
//\vendor\composer/../stripe/stripe-php/lib/Stripe.php
use Stripe\Checkout\Session;
use Stripe\Stripe;
use App\Models\Product;

use App\Models\CartItem;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function stripePayment(Request $req)
    {
    	//print_r($req->all()); die();
    	Stripe::setApiKey(env('STRIPE_SECRET'));

    	$data = Stripe\Charge::create([
    			"amount"=>200*100,
    			"currency"=>"usd",
    			"source"=>$req->stripeToken,
    			"description"=>"Test payment from expert rohila 2"
    	]);
        echo "<pre>"; print_r($data); die();

    	Session::flash("success","Payment successfully!");

    	return back();
    }
    private function lineItems()
     {

         $cartItems = CartItem::all();
         $lineItems = [];
         foreach ($cartItems as $cartItem) {
             $product['price_data'] = [
                 'currency' => 'INR',
                 'unit_amount' => $cartItem->price * 100,
                 'product_data' => [
                     'name' => $cartItem->product->name,
                     'images' => [$cartItem->product->img],
                 ],
             ];
             $product['quantity'] = $cartItem->quantity;
             $lineItems[] = $product;
         }
         return $lineItems;
     }
     public function checkout(Request $request) {
        header('Content-Type: application/json');
        Stripe::setApiKey(env('STRIPE_SECRET'));

         $checkout_session = Session::create([
             'payment_method_types' => ['card'],
             'line_items' => [
 //                STATIC ARRAY FOR DEMO
 //                'price_data' => [
 //                    'currency' => 'inr',
 //                    'unit_amount' => $price * 100,
 //                    'product_data' => [
 //                        'name' => 'Static Product',
 //                        'images' => ["https://placehold.it/350x250"],
 //                    ],
 //                ],
 //                'quantity' => 1,
                 $this->lineItems($request->InptT__nameAttr__refKeyId)
             ],
             'mode' => 'payment',
             'success_url' => 'http://localhost:8000/checkout-success',
             'cancel_url' => 'http://localhost:8000/checkout-cancel',
         ]);

         //returns session id
         return response()->json(['id' => $checkout_session->id]);
     }

    // public function stripeRawPHP(Request $request) {
    //   /*
    //   function fixDomainName($url='')
    //   {
    //       $strToLower = strtolower(trim($url));
    //       $httpPregReplace = preg_replace('/^http:\/\//i', '', $strToLower);
    //       $httpsPregReplace = preg_replace('/^https:\/\//i', '', $httpPregReplace);
    //       $wwwPregReplace = preg_replace('/^www\./i', '', $httpsPregReplace);
    //       $explodeToArray = explode('/', $wwwPregReplace);
    //       $finalDomainName = trim($explodeToArray[0]);
    //       return $finalDomainName;
    //   }*/
    //   // Security Concerns https://stackoverflow.com/questions/10717249/get-current-domain
    //   // $serverName = $_SERVER['SERVER_NAME'];
    //   // $serverURI = $_SERVER['REQUEST_URI'];
    //   // $httpServer = $_SERVER['HTTP_HOST'];
    //   //echo $request->getHost();
    //   $appUrl = env('APP_URL');
    //   $appName = env('APP_NAME');
    //   $lowerCase = strtolower($appName);
    //   $regExFind = '/[ ]/i';
    //   $regExResult = preg_replace($regExFind, "_", $lowerCase);
    //
    //   $YOUR_DOMAIN = $request->InptT__nameAttr__assetPath.'store/product-details/'.$request->InptT__nameAttr__refKeyId.'/';
    //   echo $YOUR_DOMAIN . 'checkout-success';
    //   $fakeDomain = 'https://reqres.in/api/users';
    //   Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    //   // Create and Predefined The Customer Account Setup
    //   $checkout_session = \Stripe\Checkout\Session::create([
    //     'payment_method_types' => [
    //       'card',
    //     ],
    //     'line_items' => [[
    //       'price_data' => [
    //         'currency' => 'php',
    //         'unit_amount' => 2000,
    //         'product_data' => [
    //           'name' => $request->InptT__nameAttr__name,
    //           'images' => [$request->InptT__nameAttr__img],
    //         ],
    //       ],
    //       'quantity' => $request->InptT__nameAttr__qty,
    //     ]],
    //     'mode' => 'payment',
    //     'success_url' => 'http://localhost:8000/checkout-success',
    //     'cancel_url' => 'http://localhost:8000/checkout-cancel',
    //
    //
    //   ]);
    //   echo json_decode(['id' => $checkout_session->id]);
    // }


}
