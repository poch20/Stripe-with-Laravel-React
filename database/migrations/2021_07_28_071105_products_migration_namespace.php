<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//php artisan make:migration ProductsMigrationNamespace --create=create_products_table
class ProductsMigrationNamespace extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('create_products_table', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('slug');
            $table->string('name');
            $table->mediumText('description')->nullable();

            $table->string('meta_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->string('meta_description')->nullable();

            $table->string('selling_price');
            $table->string('original_price');
            $table->string('qty');
            $table->string('img')->nullable();/*->default('product.jpg')*/
            $table->string('filename')->nullable();
            $table->string('brand');
            $table->string('featured')->default('0')->nullable();
            $table->string('popular')->default('0')->nullable();
            $table->string('status')->default('0')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('create_products_table');
    }
}
