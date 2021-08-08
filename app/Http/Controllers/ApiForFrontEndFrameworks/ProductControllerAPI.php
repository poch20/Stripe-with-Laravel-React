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

class ProductControllerAPI extends Controller {
  private $image_ext = ['jpg', 'jpeg', 'png', 'gif'];
  private $audio_ext = ['mp3', 'ogg', 'mpga'];
  private $video_ext = ['mp4', 'mpeg'];
  private $document_ext = ['doc', 'docx', 'pdf', 'odt'];
  private function getType($ext) {
        if (in_array($ext, $this->image_ext)) {
            return 'image';
        }

        if (in_array($ext, $this->audio_ext)) {
            return 'audio';
        }

        if (in_array($ext, $this->video_ext)) {
            return 'video';
        }

        if (in_array($ext, $this->document_ext)) {
            return 'document';
        }
    }
  private function allExtensions() {
      return array_merge($this->image_ext, $this->audio_ext, $this->video_ext, $this->document_ext);
  }

  public function read_products_for_clients_by_id($id){
    $product_table = Product::findorFail($id);
    if ($product_table) {
      return response()->json([
        'status' => 200,
        'product_table_from_reactecom_db' => $product_table
      ]);
    } else {
      return response()->json([
        'status' => 404,
        'message' => 'No Category Table was Found'
      ]);
    }
  }
  public function read_products_for_clients(){
    $product_table = Product::all();

    return response()->json([
      'status' => 200,
      'product_table_from_reactecom_db' => $product_table
    ]);
  }
  public function index(){
    $product_table = Product::all();

    return response()->json([
      'status' => 200,
      'product_table_from_reactecom_db' => $product_table
    ]);
  }
  public function store(Request $request) {
    $laravel_validator = Validator::make($request->all(), [
      'category_id' => 'required|max:191',
      'meta_title' => 'required|max:191',
      'slug' => 'required|max:191',
      'name' => 'required|max:191',
      'brand' => 'required|max:20',
      'selling_price' => 'required|max:20',
      'original_price' => 'required|max:20',
      'qty' => 'required|max:4',
      'img' => 'required|image|mimes:jpeg,png,jpg|max:5048',
    ]);

    if ($laravel_validator->fails()) {
      return response()->json([
        'status' => 422,
        'validation_errors' => $laravel_validator->messages()
      ]);
    } else {

      $categoryPrimaryKeyid = $request->category_id;
      $max_size = (int)ini_get('upload_max_filesize') * 1000;
      $all_ext = implode(',', $this->allExtensions());
      $all_ext;
      $this->validate($request, [
          'img' => 'required|file|mimes:doc,pdf,docx,zip' . $all_ext . '|max:' . $max_size
      ]);

      $productsTable = new Product;
      $productsTable->featured = $request->input('featured') == true ? '1' : '0';
      $productsTable->popular = $request->input('popular') == true ? '1' : '0';
      $productsTable->status = $request->input('status') == true ? '1' : '0';
      $storeProduct = Product::create([
        'id' => null,
        'slug' => $request['slug'],
        'name' => $request['name'],
        'selling_price' => $request['selling_price'],
        'original_price' => $request['original_price'],
        'qty' => $request['qty'],
        'brand' => $request['brand'],
        'description' => $request['description'],
        'meta_title' => $request['meta_title'],
        'meta_keyword' => $request['meta_keyword'],
        'meta_description' => $request['meta_description'],

        'featured' => $productsTable->featured,
        'popular' => $productsTable->popular,
        'status' => $productsTable->status,

        'category_id' => $categoryPrimaryKeyid,
      ]);

      $lastInsertedId = $storeProduct->id;

      if($lastInsertedId != null){
        $uploadedFile = $request->file('img');
        if(!$request['InptT__nameAttr__filename'] == '') {
          $manualUserInputFileName__FromReact = $request['InptT__nameAttr__filename'];
          $filenameExt = $manualUserInputFileName__FromReact.'.'.$uploadedFile->getClientOriginalExtension();
          $uploadedFile->move('storage/products-table', $filenameExt);
          $storeProduct->img = 'storage/products-table/'.$filenameExt;

          Product::where('id', $lastInsertedId)
                    ->where('img', null)
                    ->update(['filename' => $request['InptT__nameAttr__filename'],'img' => $filenameExt]);

        } else if ($request['InptT__nameAttr__filename'] == '') {
          $named_as_is = $request['InpT__nameAttr__hiddenValue'];
          $uploadedFile->move('storage/products-table/', $named_as_is);
          $storeProduct->img = 'storage/products-table/'.$named_as_is;
          Product::where('id', $lastInsertedId)
                    ->where('img', null)
                    ->update(['filename' => $request['InpT__nameAttr__hiddenValue'],'img' => $named_as_is]);
        }
        $storeProduct->save();
        return response()->json([
          'status' => 200,
          'message' => 'Product Added Successfully'
        ]);
      }
    }
   }
   public function show($id) {
    $product_table = Product::findorFail($id);
    if ($product_table) {
      return response()->json([
        'status' => 200,
        'product_table_from_reactecom_db' => $product_table
      ]);
    } else {
      return response()->json([
        'status' => 404,
        'message' => 'No Category Table was Found'
      ]);
    }
   }
   public function putSpoofer(Request $request) {
     $laravel_validator = Validator::make($request->all(), [
       'category_id' => 'required|max:191',
       'meta_title' => 'required|max:191',
       'slug' => 'required|max:191',
       'name' => 'required|max:191',
       'brand' => 'required|max:20',
       'selling_price' => 'required|max:20',
       'original_price' => 'required|max:20',
       'qty' => 'required|max:4',
       // 'img' => 'required|image|mimes:jpeg,png,jpg|max:5048'
     ]);

     if ($laravel_validator->fails()) {
       return response()->json([
         'status' => 422,
         'validation_errors' => $laravel_validator->messages()
       ]);
     } else {

       $categoryPrimaryKeyid = $request->category_id;
       $max_size = (int)ini_get('upload_max_filesize') * 1000;
       $all_ext = implode(',', $this->allExtensions());
       $all_ext;

       // $this->validate($request, [
       //     'img' => 'required|file|mimes:doc,pdf,docx,zip' . $all_ext . '|max:' . $max_size
       // ]);
       $productsTable = Product::find($request->InpT__nameAttr__hiddenValue_AppendPropId);
       $ifUpdatedSuccessfully =  DB::table('create_products_table')
       ->where('id', $request->InpT__nameAttr__hiddenValue_AppendPropId)
       ->update(
         [ 'slug' => $request['slug'],
         'name' => $request['name'],
         'featured' => $request->input('featured'),
         'popular' => $request->input('popular'),
         'status' => $request->input('status'),
         'meta_title' => $request->input('meta_title'),
         'meta_keyword' => $request->input('meta_keyword'),
         'meta_description' => $request->input('meta_description'),
         'description' => $request->input('description'),
         'selling_price' => $request['selling_price'],
         'original_price' => $request['original_price'],
         'qty' => $request['qty'],
         'brand' => $request['brand'],
         'img' => $productsTable->img,
         'filename' => $request['InptT__nameAttr__filename'],
       ]);


       if ($productsTable) {
         if ($request->hasFile('img')) {
           $uploadedFile = $request->file('img');
           if(!$request['InptT__nameAttr__filename'] == '') {
             //'FILE with Filename Input';
             $manualUserInputFileName__FromReact = $request['InptT__nameAttr__filename'];
             $filenameExt = $manualUserInputFileName__FromReact.'.'.$uploadedFile->getClientOriginalExtension();
             $uploadedFile->move('storage/products-table', $filenameExt);
             $productsTable->img = 'storage/products-table/'.$filenameExt;

             Product::where('id', $request->InpT__nameAttr__hiddenValue_AppendPropId)
                       ->where('img', $productsTable->img)
                       ->update(['img' => $filenameExt]);

           } else if ($request['InptT__nameAttr__filename'] == '') {
             //'FILE without Filename Input';
             $named_as_is = $request['InpT__nameAttr__hiddenValue'];
             $uploadedFile->move('storage/products-table/', $named_as_is);
             $productsTable->img = 'storage/products-table/'.$named_as_is;
             Product::where('id', $request->InpT__nameAttr__hiddenValue_AppendPropId)
                       ->where('img', $productsTable->img)
                       ->update(['filename' => $request['InpT__nameAttr__hiddenValue'],'img' => $named_as_is]);
           }
           $productsTable->save();
         } else if (($request->hasFile('img')) == '') {
           //'NOFILE with Filename Input';
           if(!$request['InptT__nameAttr__filename'] == '') {
             Product::where('id', $request->InpT__nameAttr__hiddenValue_AppendPropId)
                       ->where('img', $productsTable->img)
                       ->update(['filename' => $request['InptT__nameAttr__filename']]);
           } else if ($request['InptT__nameAttr__filename'] == '') {
             //'NOFILE without Filename Input';
             Product::where('id', $request->InpT__nameAttr__hiddenValue_AppendPropId)
                       ->where('img', $productsTable->img)
                       ->update(['filename' => $productsTable->filename]);
           }
         }
         return response()->json([
           'status' => 200,
           'message' => 'Product Updated Successfully'
         ]);

       } else {
         return response()->json([
           'status' => 404,
           'message' => 'Product Not Found'
         ]);
       }
    }
   }
   public function addToCart(Product $product) {
       // Create or Update Cart
       $cart = Cart::updateOrCreate(['id' => 1]);
       // Update Cart items
       $existProduct = CartItem::where('product_id', $product->id)->first();
       if($existProduct) {
           CartItem::where('product_id', $product->id)->update([
               'quantity' => ++$existProduct->quantity,
               'total' => $existProduct->quantity * $existProduct->price,
           ]);
       } else {
           $cart->cart_items()->create([
             'cart_id' => $cart,
             'product_id' => $product->id,
             'price' => $product->selling_price,
             'quantity' => 1,
             'total' => $product->selling_price
           ]);
       }
       //flash('Product added to the cart successfully!');
       return redirect()->back();
   }
}
