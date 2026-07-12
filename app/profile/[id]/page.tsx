export default async function UserProfile({ params }: { params: { id: string } }) {
    const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>User ID: {id}</p>
    </div>
  );
}
