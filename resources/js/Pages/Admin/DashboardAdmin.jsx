import { Head, Link } from '@inertiajs/react';

export default function DashboardAdmin(props) {
    return (
        <>
            <h1>INI INDEX ADMIN</h1>
            <Link method="post" href={route('logout')} as="button">
                Log Out
            </Link>
        </>
    )
}
