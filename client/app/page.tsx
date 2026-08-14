import { Avatar } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <div>
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          alt="Kazi Logo"
        />
      </div>
      <h1 className="text-xl my-2">
        Kazi Landing Page
      </h1>
      <Button
        type="button"
      >
        Sign Up
      </Button>
      <Label>Email</Label>
      <Input id="12"
        className="my-4"
        placeholder="sign up..."
      />

      <Avatar
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="border"
      />
      <Card
        className="my-4 hover:bg-background-subtle"
      >
        <h1>Adams Kiptalam</h1>
        <p>Software developer</p>
      </Card>
    </div>
  );
}
