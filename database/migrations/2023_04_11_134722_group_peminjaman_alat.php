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
        Schema::create('GroupPeminjamanAlat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('p_alat_id')->references('id')->on('p_alat')->onDelete('cascade');
            $table->foreignId('alat_id')->references('id')->on('alat')->onDelete('cascade');
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
        Schema::dropIfExists('GroupPeminjamanAlat');
    }
};
