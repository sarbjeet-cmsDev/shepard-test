import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful,post } = useForm({
        name: user.name,
        email: user.email,
        photo: user.profile_photo_path,    
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };


    function submitPic(e) {
        e.preventDefault();
        post(route('profile.upload'), {
            preserveScroll: true,
        });
    }    

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>


                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>

   <h2 className="text-lg font-medium text-gray-900 mt-5">Profile Photo</h2>
        <form onSubmit={submitPic} encType="multipart/form-data">
            <div>
                <label className="mt-2 text-sm text-gray-600">Upload Profile Photo:</label>
                <input
                    type="file"
                    className="mt-2 block w-full"
                    onChange={e => setData('photo', e.target.files[0])}
                />
                {errors.photo && <div>{errors.photo}</div>}
            </div>

            <PrimaryButton className="mt-2" type="submit" disabled={processing}>
                Upload
            </PrimaryButton>

            {user.profile_photo_path && (
                <div className="mt-4">
                    <img
                        src={`/storage/app/public/${user.profile_photo_path}`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
            )}
        </form>

        </section>
    );
}
