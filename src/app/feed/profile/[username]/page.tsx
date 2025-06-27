interface Props {
    params: { username: string };
}

export default function UserProfilePage({ params }: Props) {
    const { username } = params;

    return (
        <div>
            <h2>Profile of: {username}</h2>
            {/* Display user's profile information and blogs here */}
        </div>
    );
}
