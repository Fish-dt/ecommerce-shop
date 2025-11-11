'use client';
import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  return {
    toast: {
      success: (msg: string) => sonnerToast.success(msg),
      error: (msg: string) => sonnerToast.error(msg),
      info: (msg: string) => sonnerToast(msg),
    },
  };
};
