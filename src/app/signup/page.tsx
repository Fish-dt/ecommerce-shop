'use client';

import Link from 'next/link';
import { AuthLayout } from '@/components/Auth/AuthLayout';
import { SignUpForm } from '@/components/Auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Sign Up"
      footer={
        <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
          Already have an account?{' '}
          <Link href="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
