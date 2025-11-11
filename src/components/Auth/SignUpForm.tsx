'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { AuthForm } from './AuthForm';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock signup
    setTimeout(() => {
      toast.success(`Account created for ${name}`);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthForm onSubmit={handleSubmit} submitText="Sign Up" isLoading={isLoading}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
}

