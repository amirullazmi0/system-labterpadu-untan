<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_alat', function (Blueprint $table) {
            $table->id();
            $table->string('primary_id', 50);
            $table->string('name', 30);
            // $table->unsignedBigInteger('alat_id');
            $table->foreignId('alat_id')->references('id')->on('alat')->onDelete('cascade');
            $table->integer('total');
            $table->string('event', 30);
            $table->date('date_start');
            $table->date('date_end')->nullable();
            $table->time('time_start');
            $table->time('time_end');
            $table->longText('desc')->nullable();
            $table->string('berkas')->nullable();
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
        Schema::dropIfExists('p_alat');
    }
};
