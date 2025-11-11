"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { formatPrice } from "@/utils/format"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toggleFavorite } from "@/features/favorites/favoritesSlice"
import {
  ShoppingCart,
  Heart,
  Edit,
  Share2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ProductInfoProps } from "@/types/components"

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const dispatch = useAppDispatch()
  const favs = useAppSelector((s) => s.favorites.items)
  const isFav = favs.some((p) => p.id === product.id)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      {product.category && (
        <div className="inline-flex w-fit">
          <span className="text-xs font-medium text-sky-700 dark:text-sky-200 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-700 shadow-sm">
            {product.category}
          </span>
        </div>
      )}

      {/* Title and Rating */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white text-pretty">{product.title}</h1>
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating!) ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {product.rating}
              </span>
            </div>
          )}
        </div>
        {/* Edit Button */}
        <Link href={`/product/${product.id}/edit`}>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Edit product"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 border border-sky-200 dark:border-slate-600 rounded-xl p-5 shadow-md">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl font-bold text-sky-600 dark:text-sky-300">{formatPrice(product.price)}</span>
          {product.discountPercentage && product.discountPercentage > 0 && (
            <>
              <span className="text-lg text-slate-500 dark:text-slate-400 line-through">{formatPrice(product.price * (1 - product.discountPercentage / 100))}</span>
              {product.discountPercentage && (
                <span className="text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
                  Save {product.discountPercentage}%
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-300">✓ {product.availabilityStatus}</p>
          <span className="text-xs text-slate-600 dark:text-slate-300">Stock: {product.stock}</span>
        </div>
      </div>

      {/* Description */}
      {product.description && <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">{product.description}</p>}

      <div className="flex gap-4 items-center">
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            −
          </button>
          <span className="px-4 py-2 font-medium text-slate-900 dark:text-white border-l border-r border-slate-200 dark:border-slate-700 min-w-12 text-center">
            {quantity}
          </span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            +
          </button>
        </div>
        <Button className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all shadow-lg hover:shadow-xl">
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-100 dark:bg-slate-700 border border-sky-200 dark:border-slate-600 px-3 py-1.5 rounded-full text-xs font-medium text-sky-700 dark:text-sky-300 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Favorite and Share Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => dispatch(toggleFavorite(product))}
          variant={isFav ? "default" : "outline"}
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
            isFav ? "bg-red-500 hover:bg-red-600 text-white" : "border-sky-200 dark:border-sky-700 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
          }`}
        >
          <Heart size={18} className={isFav ? "fill-current" : ""} />
          {isFav ? "Saved" : "Save"}
        </Button>
        {product.meta?.qrCode && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 py-2.5 rounded-lg border-sky-200 dark:border-sky-700 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                <Share2 size={18} className="mr-2" />
                Share / QR
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Product QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-center py-4">
                <img
                  src={product.meta.qrCode || "/placeholder.svg"}
                  alt="Share QR code"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
