"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  async function handleClick() {
    await axios.post('/api/auth/logout');
    router.refresh();
  }

  return (
   <>
    <Button onClick={handleClick}>Logout</Button>
   </>
  );
}
