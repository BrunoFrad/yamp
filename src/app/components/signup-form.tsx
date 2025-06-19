"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react"
import { AlertCircleIcon, Terminal } from "lucide-react"
import axios from "axios";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await axios.post('/api/auth/register', {
      email : email,
      password : password
    });

    if (res.data.error !== undefined && res.data.error.includes("email"))
      setEmailError(true);

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Nice to meet you!</h1>
                <p className="text-muted-foreground text-balance">
                  Let&apos;s create your account.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jhon@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {emailError && 
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to create your account.</AlertTitle>
                  <AlertDescription>
                    <p>Your email is already in use.</p>
                  </AlertDescription>
                </Alert>
              }
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)}  required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm your password</Label>
                </div>
                <Input id="confirm-password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              {
                (password !== confirmPassword && confirmPassword.length > 0) ? 
                <>
                    <Alert variant={"default"}>
                      <Terminal />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        The passwords must be the same.
                      </AlertDescription>
                    </Alert>
                    <Button variant={"secondary"} disabled className="w-full">
                      Sign Up
                    </Button> 
                </>
                : 
                (email.length === 0 || password.length === 0 || confirmPassword.length === 0) ?
                    <Button variant={"secondary"} disabled className="w-full">
                      Sign Up
                    </Button> 
                :
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button> 
              }
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/travis-yewell-F-B7kWlkxDQ-unsplash.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
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