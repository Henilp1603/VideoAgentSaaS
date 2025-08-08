import { auth } from "@/lib/auth";
import SignUpView from "@/modules/auth/ui/views/signUp-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignUppage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }
  return <SignUpView />;
};

export default SignUppage;
