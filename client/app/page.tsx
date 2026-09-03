import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div>
        <Image src={'/logo.png'} width={100} height={100} alt="Kazi Logo" />
      </div>
      <h1 className="my-2 text-xl">Kazi Landing Page</h1>
      <Button type="button">Sign Up</Button>
      <Label>Email</Label>
      <Input id="12" className="my-4" placeholder="sign up..." />

      <Avatar
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="border"
      />
      <Card className="hover:bg-background-subtle my-4">
        <h1>Adams Kiptalam</h1>
        <p>Software developer</p>
      </Card>
    </div>
  );
}
