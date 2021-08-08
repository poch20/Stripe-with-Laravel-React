<?php

namespace App\Http\Controllers\ApiForFrontEndFrameworks;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\CartItem;

use Stripe\Checkout\Session;
use Stripe\Stripe;

class StripeCheckoutController extends Controller {
  private function lineItems()
   {
       $cartItems = CartItem::all();
       $lineItems = [];

       foreach ($cartItems as $cartItem) {
           $product['price_data'] = [
               'currency' => 'USD',
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

    public function checkout() {
      header('Content-Type: application/json');
      Stripe::setApiKey(env('STRIPE_SECRET'));

      $checkout_session = Session::create([

          'payment_method_types' => ['card'],
          'line_items' => [
              $this->lineItems()
          ],
          'mode' => 'payment',
          'success_url' => 'http://localhost:8000/success',
          'cancel_url' => 'http://localhost:8000/cancel',
      ]);

      return response()->json(['id' => $checkout_session->id]);
    }
    public function testPreBuilt(Request $request) {

      header('Content-Type: application/json');
      Stripe::setApiKey(env('STRIPE_SECRET'));

      $YOUR_DOMAIN = 'http://localhost:8000';
      $checkout_session = \Stripe\Checkout\Session::create([
        'payment_method_types' => [
          'card',
        ],
        'line_items' => [[
          'currency' => 'USD',
          'amount' => $request->Inpt__nameAttr__selling_price * 100,
          // 'price' => $request->InptT__nameAttr__selling_price,
          'name' => $request->Inpt__nameAttr__name,
          'images' => [$request->Inpt__nameAttr__img],
          'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => $YOUR_DOMAIN . '/checkout-success',
        'cancel_url' => $YOUR_DOMAIN . '/checkout-canceled',
      ]);

      header("HTTP/1.1 303 See Other");
      header("Location: " . $checkout_session->url);
      return redirect($checkout_session->url)->with('id', $checkout_session->id);

      // return response()->json(['id' => $checkout_session->id]);
    }

    public function success()
    {
        CartItem::truncate();
        //return redirect('/store/checkout-success');
        return view('success');
    }

    public function cancel()
    {
        //return redirect('/store/checkout-cancel');
        return view('cancel');
    }
}
