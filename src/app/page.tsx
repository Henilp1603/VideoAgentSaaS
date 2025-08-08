import { auth } from "@/lib/auth";
import HomeView from "@/modules/Home/ui/views/HomeView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signIn");
  }
  return <HomeView />;
}
