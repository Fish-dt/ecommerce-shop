'use client';

import { AuthLayout } from '@/components/Auth/AuthLayout';
import { SignInForm } from '@/components/Auth/SignInForm';

export default function SignInPage() {
  return (
    <AuthLayout title="Sign In">
      <SignInForm />
    </AuthLayout>
  );
}
