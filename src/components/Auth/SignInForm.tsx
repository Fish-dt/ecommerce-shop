'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { AuthForm } from './AuthForm';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(`Signed in as ${email}`);
      router.push('/');
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit} submitText="Sign In" isLoading={isLoading}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
    </AuthForm>
  );
}

