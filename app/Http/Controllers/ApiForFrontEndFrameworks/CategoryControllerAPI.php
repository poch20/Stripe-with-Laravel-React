<?php

namespace App\Http\Controllers\ApiForFrontEndFrameworks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;

use Illuminate\Support\Facades\Validator;

class CategoryControllerAPI extends Controller {

  public function index() {
    $categoryModel = Category::all();
    return response()->json([
      'status' => 200,
      'category_table_from_reactecom_db' => $categoryModel
    ]);
  }
  public function store(Request $request) {
    $laravelValidatorFunction = Validator::make($request->all(), [
      'meta_title' => 'required|max:191',
      'slug' => 'required|max:191',
      'name' => 'required|max:191',
    ]);

    if ($laravelValidatorFunction->fails()) {
      return response()->json([
        'status' => 400,
        'validation_errors' => $laravelValidatorFunction->messages()
      ]);
    }

    $categoryModel = new Category;
    $categoryModel->meta_title = $request->input('meta_title');
    $categoryModel->meta_keyword = $request->input('meta_keyword');
    $categoryModel->meta_description = $request->input('meta_description');
    $categoryModel->slug = $request->input('slug');
    $categoryModel->name = $request->input('name');
    $categoryModel->description = $request->input('description');
    $categoryModel->status = $request->input('status') == true ? '1' : '0';
    $categoryModel->save();
    return response()->json([
      'status' => 200,
      'message' => 'Category Added Successfully'
    ]);
  }
  public function show($id) {
    $category_table = Category::findorFail($id);
    if ($category_table) {
      return response()->json([
        'status' => 200,
        'category_table_from_reactecom_db' => $category_table
      ]);
    } else {
      return response()->json([
        'status' => 404,
        'message' => 'No Category Table was Found'
      ]);
    }
  }
  public function update(Request $request, $id) {
    $validator = Validator::make($request->all(), [
      'meta_title' => 'required|max:191',
      'slug' => 'required|max:191',
      'name' => 'required|max:191'
    ]);

    if ($validator->fails()) {
      return response()->json([
        'status' => 422,
        'validation_errors' => $validator->messages()
      ]);
    } else {
      $categoryModel = Category::find($id);

      if ($categoryModel) {
        $categoryModel->meta_title = $request->input('meta_title');
        $categoryModel->meta_keyword = $request->input('meta_keyword');
        $categoryModel->meta_description = $request->input('meta_description');
        $categoryModel->slug = $request->input('slug');
        $categoryModel->name = $request->input('name');
        $categoryModel->description = $request->input('description');
        $categoryModel->status = $request->input('status') == true ? '1' : '0';
        $categoryModel->save();
        return response()->json([
          'status' => 200,
          'message' => 'Category Updated Successfully'
        ]);
      } else {
        return response()->json([
          'status' => 404,
          'message' => 'No Category ID was Found'
        ]);
      }
    }
  }
  public function destroy($id) {
    $categoryModel = Category::find($id);
    if ($categoryModel) {
      $categoryModel->delete();
      return response()->json([
        'status' => 200,
        'message' => 'Category Item Deleted Successfully'
      ]);
    } else {
      return response()->json([
        'status' => 200,
        'message' => 'No Category ID associated with this'
      ]);
    }
  }

  // Custom Methods
  public function getAllCategory__withCondition() {

    $category_table = Category::where('status', '0')->get();
    return response()->json([
      'status' => 200,
      'category_table_get_all_where__statusIsZero' => $category_table,
    ]);
  }

}
