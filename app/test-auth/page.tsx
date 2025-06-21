// app/test-auth/page.tsx
import { auth } from "@clerk/nextjs/server";

export default async function TestAuth() {
  const { userId } = await auth();

  return (
    <div>
      <h1>Test Auth Page</h1>
      <p>User ID: {userId || "Not Authenticated"}</p>
    </div>
  );
}
