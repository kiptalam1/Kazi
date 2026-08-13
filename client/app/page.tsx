import { Avatar } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="border min-h-screen flex flex-col items-center justify-center ">
      <div>
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          alt="Kazi Logo"
        />
      </div>
      <h1 className="text-xl my-2">Kazi Landing Page</h1>
      <Button
        type="button"
      >
        Sign Up
      </Button>
      <Input id="12"
        className="my-4"
        placeholder="sign up..." />

      <Avatar
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="border"
      />
    </div>
  );
}
