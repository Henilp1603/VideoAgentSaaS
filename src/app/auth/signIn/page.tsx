import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/ui/views/signIn-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignInpage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }
  return <SignInView />;
};

export default SignInpage;
