"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {login} from "../../utils/api"
import { useRouter } from "next/navigation"

interface ApiError {
  message: string;
}

export function LoginForm({className,...props}: React.ComponentPropsWithoutRef<"div">) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('login button clicked');
    try {
      const response = await login.post('', { username, password });
      localStorage.setItem('role', JSON.stringify(response.data.role));
      localStorage.setItem('personel', JSON.stringify(response.data.personel));
  
      if (response.data.role !== 'serpo') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/serpo');
      }
    } catch (err) {
      // Check if the error is an instance of AxiosError
      const error = err as { response?: { data?: ApiError } };
  
      setError(error.response?.data?.message || 'Something went wrong');
      console.log(error);
      alert(error.response?.data?.message);
  
      const usernameInput = document.getElementById('username') as HTMLInputElement;
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      usernameInput.classList.add('border-red-400');
      passwordInput.classList.add('border-red-400');
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form 
        onSubmit={handleLogin}
        id="form-login">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" >Password</Label>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
            >
              Login
            </Button>
            {error? 
            <span className="text-red-400"> username atau password salah </span>
            : ""
            }
          </div>
        </div>
      </form>
    </div>
  )
}
