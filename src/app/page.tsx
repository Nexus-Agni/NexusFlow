import Image from "next/image";
import SignIn from "./components/sign-in";
import { auth } from "@/auth";
import { SignOut } from "./components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <h1>We are hitting back</h1>
      {
        session ? (
          <SignOut />
        ) : (
          <SignIn />
        )
      }
    </div>
  );
}
