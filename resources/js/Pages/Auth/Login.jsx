import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="bg-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                    <div className="login-form flex justify-center items-center">
                        <div className="card-form flex-1">
                            <div className="box-head flex justify-center items-center">
                                <img src="/img/untan.png" alt="" />
                                <div className="card-head">
                                    <div className="head1">upt laboratorium terpadu</div>
                                    <div className="head2">universitas tanjungpura</div>
                                </div>
                            </div>
                            <hr className='mt-3 mb-4' />
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-center mt-5">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                            <div className="card-form-footer mt-5 text-center">
                                <small>Kembali Ke Dashboard <Link className='text-primary' href='/'>DISINI</Link> </small>
                            </div>
                        </div>
                    </div>
                    <div className="login-img">
                        <img src="/img/labterpadu.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}
