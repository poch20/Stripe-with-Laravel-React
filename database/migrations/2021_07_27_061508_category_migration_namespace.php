<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CategoryMigrationNamespace extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('create_categories_table', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('name');
            $table->longText('description')->nullable();
            $table->tinyInteger('status')->default('0');
            $table->string('meta_title')->nullable()->default('meta_title');
            $table->mediumText('meta_keyword')->nullable()->default('meta_keyword');
            $table->mediumText('meta_description')->nullable()->default('meta_description');
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
        Schema::dropIfExists('create_categories_table');
    }
}
