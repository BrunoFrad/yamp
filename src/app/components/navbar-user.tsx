"use client"

import {
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  MdLibraryMusic
} from "react-icons/md";

import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {

  const [currentDialog, setCurrentDialog] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string | null>(null);

  async function handleLogout() {
    try {
      await axios.post("/api/auth/logout");
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  async function handleUpdate() {
    try {
      await axios.post("/api/auth/update", {
        username: newUsername,
        email: newEmail
      });
      window.location.reload();
    } catch(error) {
      console.error("Error in the update: ", error);
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex mr-12" >
          <Avatar className="h-12 w-12 rounded-3xl grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-3xl">{(user.name[0] + user.name[1]).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm mr-10">
              <Avatar className="h-10 w-10 rounded-3xl">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-3xl">{(user.name[0] + user.name[1]).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => setCurrentDialog("profile")}>
                <IconUserCircle />
                Edit your profile
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={() => setCurrentDialog("playlist")}>
              <MdLibraryMusic />
              Manage your playlists
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {
        currentDialog === "profile" ?
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue={user.name} onChange={(e) => setNewUsername(e.currentTarget.value)} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Email</Label>
                <Input id="username-1" name="username" defaultValue={user.email} onChange={(e) => setNewEmail(e.currentTarget.value)} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUpdate}>Save changes</Button>
            </DialogFooter>
          </DialogContent> :
          <></>
      }

    </Dialog>
  );
}