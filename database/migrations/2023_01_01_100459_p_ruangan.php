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
        Schema::create('p_ruangan', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30);
            $table->foreignid('ruangan_id')->on('ruangan')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('p_ruangan');
    }
};
