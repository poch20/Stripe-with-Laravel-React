<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    use HasFactory;

    protected $fillable = [
       'meta_title',
       'meta_keyword',
       'meta_description',
       'slug',
       'name',
       'description',
       'status',
     ];

     protected $table = 'create_categories_table';
     //protected $primaryKey = 'categoryPrimaryKey';
     
     /**
      * Inverse of User
      * Category(Child) extends User(Parent)
      *
      * Category can Inherit User Table Property via the method below 
      *
      */
     public function CategoryModelCanHaveManyUsers(){
       return $this->belongsToMany('App\Models\User');
     }

}
