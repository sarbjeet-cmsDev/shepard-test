import { useForm } from '@inertiajs/react';

export default function Profile({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        photo: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('profile.upload'), {
            preserveScroll: true,
        });
    }

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <div>
                <label>Upload Profile Photo:</label>
                <input
                    type="file"
                    onChange={e => setData('photo', e.target.files[0])}
                />
                {errors.photo && <div>{errors.photo}</div>}
            </div>

            <button type="submit" disabled={processing}>
                Upload
            </button>

            {auth.user.profile_photo_path && (
                <div className="mt-4">
                    <img
                        src={`/storage/${auth.user.profile_photo_path}`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
            )}
        </form>
    );
}
