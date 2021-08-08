<table class="table table table-striped">
     <thead>
     <tr>
         <th>Product</th>
         <th>Image</th>
         <th>Price</th>
         <th>Quantity</th>
         <th>Total</th>
         <th></th>
     </tr>
     </thead>
     <tbody>
     @forelse($cartItems as $cartItem)
         <tr>
             <td>{{ $cartItem->product->name }}</td>
             <td><img src="{{ $cartItem->product->img }}" class="img-thumbnail" style="height:50px;"></td>
             <td>{{ number_format($cartItem->price, 2) }}</td>
             <td>{{ $cartItem->quantity }}</td>
             <td>{{ number_format($cartItem->total, 2) }}</td>
             <td><a href="{{ route('cart.removeProduct', $cartItem->product_id) }}" class="text-danger">X</a></td>
         </tr>
     @empty
         <tr>
             <td colspan="6" align="center">No products found.</td>
         </tr>
     @endforelse
     {{ gettype(number_format($cartItems->sum('total'), 2)) }}
     Count
     {{ $cartItems->count() }}
     Sum Total
     {{ $cartItems->sum('total') }}
     </tbody>
     @if($cartItems->count() > 0)
         <tfoot>
         <tr>
             <th colspan="3"></th>
             <th>Grand Total</th>
             <th>{{ number_format($cartItems->sum('total'), 2) }}</th>
             <th></th>
         </tr>
         </tfoot>
     @endif
 </table>

 @if($cartItems->count() > 0)
     <button class="btn btn-primary btn-block" id="checkout-button"><i class="fa fa-cc-stripe"></i> Pay {{ number_format($cartItems->sum('total'), 2) }}</button>
 @endif
<script type="text/javascript">
fetch("{{ route('checkout.creates.stripe.session') }}")
</script>
