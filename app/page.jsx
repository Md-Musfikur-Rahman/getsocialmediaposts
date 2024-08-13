import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col gap-3 justify-center items-center ">
      <h1 className="text-3xl font-bold"> Landing Page for the Social Spy</h1>
      <p>Press the button to use the app</p>
      <Link href="/app">
        <Button type="primary">Experiment</Button>
      </Link>
    </div>
  );
}
