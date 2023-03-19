<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use \App\Http\Middleware\CekAdminLogin as Middleware;

class CekAdminLogin extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $rules)
    {
        if (!auth::check()) {
            return redirect('login');
        }

        $admin = Auth::admin();
        if ($admin->level == $rules) {
            return $next($request);
        }

        return redirect('login')->with('error', "Login gagal !!!");
    }
}
