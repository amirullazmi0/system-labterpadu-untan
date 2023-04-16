<?php

use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AlatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SuperController;
use App\Http\Controllers\P_alatController;
use App\Http\Controllers\LaboranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\P_ruanganController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [UserController::class, 'index'])->name('home');

Route::middleware(['auth', 'super:0'])->group(function () {
    Route::get('/super', [SuperController::class, 'index'])->name('super');
    Route::get('/super/profil', [SuperController::class, 'laboran'])->name('super-profil');

    Route::get('/super/lab', [SuperController::class, 'lab'])->name('super-lab');

    Route::get('/super/laboran', [SuperController::class, 'laboran'])->name('super-laboran');
    Route::get('/super/add-laboran', [SuperController::class, 'add_laboran'])->name('super-add-laboran');
    Route::post('/super/add-laboran', [LaboranController::class, 'store']);
    Route::get('/super/laboran/{user:id}', [SuperController::class, 'show_laboran'])->name('super-show-laboran');
    Route::get('/super/laboran/{user:id}/edit', [SuperController::class, 'edit_laboran'])->name('super-edit-laboran');
    Route::post('/super/laboran/{user:id}/edit', [LaboranController::class, 'update']);
    Route::get('/super/laboran/{user:id}/delete', [LaboranController::class, 'destroy']);

    Route::get('/super/ruangan', [SuperController::class, 'ruangan'])->name('super-ruangan');
    Route::get('/super/add-ruangan', [SuperController::class, 'add_ruangan'])->name('super-add-ruangan');
    Route::post('/super/add-ruangan', [RuanganController::class, 'store']);
    Route::get('/super/ruangan/{ruangan:id}/edit', [SuperController::class, 'edit_ruangan'])->name('super-edit-ruangan');
    Route::post('/super/ruangan/{ruangan:id}/edit', [RuanganController::class, 'update']);
    Route::get('/super/ruangan/{ruangan:id}/delete', [RuanganController::class, 'destroy']);

    Route::get('/super/p-ruangan', [SuperController::class, 'p_ruangan'])->name('super-p-ruangan');
    Route::get('/super/add-p-ruangan', [SuperController::class, 'add_p_ruangan'])->name('super-add-p-ruangan');
    Route::post('/super/add-p-ruangan', [P_ruanganController::class, 'store']);
    Route::get('/super/p-ruangan/{p_ruangan:id}', [SuperController::class, 'show_p_ruangan'])->name('super-show-p-ruangan');
    Route::get('/super/p-ruangan/{p_ruangan:id}/edit', [SuperController::class, 'edit_p_ruangan'])->name('super-edit-p-ruangan');
    Route::post('/super/p-ruangan/{p_ruangan:id}/edit', [P_ruanganController::class, 'update']);
    Route::get('/super/p-ruangan/{p_ruangan:id}/delete', [P_ruanganController::class, 'destroy']);

    Route::get('/super/p-alat', [SuperController::class, 'p_alat'])->name('super-p-alat');
    Route::get('/super/add-p-alat', [SuperController::class, 'add_p_alat'])->name('super-add-p-alat');
    Route::post('/super/add-p-alat', [P_alatController::class, 'store']);
    Route::get('/super/p-alat/{p_alat:id}', [SuperController::class, 'show_p_alat'])->name('super-show-p-alat');
    Route::get('/super/p-alat/{p_alat:id}/edit', [SuperController::class, 'edit_p_alat'])->name('super-edit-p-alat');
    Route::post('/super/p-alat/{p_alat:id}/edit', [P_alatController::class, 'update']);

    Route::get('/super/analisis', [SuperController::class, 'analisis'])->name('super-analisis');
});

Route::middleware(['auth', 'admin:1'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');

    Route::get('/admin/alat', [AdminController::class, 'alat'])->name('admin-alat');
    Route::get('/admin/add-alat', [AdminController::class, 'add_alat'])->name('admin-add-alat');
    Route::post('/admin/add-alat', [AlatController::class, 'store']);
    Route::get('/admin/alat/{alat:id}/edit', [AdminController::class, 'edit_alat'])->name('admin-edit-alat');
    Route::post('/admin/alat/{alat:id}/edit', [AlatController::class, 'update']);
    Route::get('/admin/alat/{alat:id}/delete', [AlatController::class, 'destroy']);
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
