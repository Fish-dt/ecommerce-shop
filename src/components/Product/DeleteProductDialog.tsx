'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';

interface DeleteProductDialogProps {
  onDelete: () => void;
}

export function DeleteProductDialog({ onDelete }: DeleteProductDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash className="w-4 h-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <p>Are you sure you want to delete this product?</p>
        <AlertDialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

