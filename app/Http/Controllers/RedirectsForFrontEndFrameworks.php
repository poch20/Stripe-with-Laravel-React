<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CartItem;

class RedirectsForFrontEndFrameworks extends Controller
{
  public function success()
  {
      CartItem::truncate();
      return redirect('/store/checkout-success');

  }

  public function cancel()
  {
      return redirect('/store/checkout-cancel');

  }

}
