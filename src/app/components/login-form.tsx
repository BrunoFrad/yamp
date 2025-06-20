'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const res = await axios.post('/api/auth/login', {
        email: email,
        password: password
      });

      if (res.status === 201 && res.data.error !== undefined && res.data.error.includes("User"))
        setEmailError(true);
      else
        setEmailError(false);
      if (res.status === 201 && res.data.error !== undefined && res.data.error.includes("Password"))
        setPasswordError(true);
      else
        setPasswordError(false);

      if (res.status === 200)
        router.refresh();

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account to continue.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jhon@example.com"
                  onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }
                }
                  required
                />
              </div>
              {
              emailError && 
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to enter in your account.</AlertTitle>
                  <AlertDescription>
                    <p>Your email not exists in our system.</p>
                  </AlertDescription>
                </Alert>
              }
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }
                } 
                required />
              </div>
              {
                passwordError &&
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to enter in your account.</AlertTitle>
                  <AlertDescription>
                    <p>This password is incorrect.</p>
                  </AlertDescription>
                </Alert>
              }
              {
              (email.length === 0 || password.length === 0) ?
                <Button disabled variant={"secondary"} className="w-full">
                  Login
                </Button> :
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
              }
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/travis-yewell-F-B7kWlkxDQ-unsplash.jpg"
              alt="Image"
              className="absolute inset-0 h-full object-cover dark:brightness-[0.5]"
              fill
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Photo by <a href="https://unsplash.com/@shutters_guild?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Travis Yewell</a> on <a href="https://unsplash.com/photos/gray-turntable-playing-F-B7kWlkxDQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
      </div>
    </div>
  )
}