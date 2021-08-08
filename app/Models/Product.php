<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Category;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
       'category_id',
       'meta_title',
       'meta_keyword',
       'meta_description',
       'slug',
       'name',
       'description',
       'status',
       'filename',

       'brand',
       'selling_price',
       'original_price',
       'qty',
       'img',
       'featured',
       'popular',
     ];
     
     /**
      * Explicitly stated default table name
      *
      * Instead of products_table convention
      *
      */
     protected $table = 'create_products_table';
     
     //protected $primaryKey = 'categoryPrimaryKey';     

     /**
      * 
      * @var with is for accessing foreign relationship tables
      *  
      * Most useful for FrontEnd Frameworks for Accessing the Foreign Object 
      * directly when getting the table on the fly! in defining the @var with
      * the method that is accessing foreign relationships.
      *
      */
     protected $with = ['CategoryModel__is_a_component_of_ProductModel_as_a_foreignKey'];
     
     /**
      * Inverse of Category
      * CategoryModel__is_a_component_of_ProductModel_as_a_foreignKey
      *
      * Product(Child) extends Category(Parent)
      *
      * Product can Inherit Category Table Property Data via mapping 
      * the Foreign Key Id = @var category_id(Prop of Product) = Set @var id to 'id value of Category Table' 
      * To be not confused simply follow the syntax (SomeModel::class, 'just_some_prop_of_product_table_for_storing', 'the id of the model you just pass as the first argument')
      *
      * @return 
      */
     public function CategoryModel__is_a_component_of_ProductModel_as_a_foreignKey(){
       return $this->belongsTo(Category::class, 'category_id', 'id');
     }

}
