"use client"
import { useState, useMemo } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toggleFavorite } from "@/features/favorites/favoritesSlice"
import type { ProductImagesProps } from "@/types/components"

export function ProductImages({ product }: ProductImagesProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.items)
  const isFavorite = useMemo(
    () => favorites.some((p) => p.id === product.id),
    [favorites, product.id]
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = product.images?.length ? product.images : [product.thumbnail || "/placeholder.svg"]
  const currentImage = images[currentImageIndex]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative group">
        <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-lg flex items-center justify-center">
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={product.title || "Product"}
            width={600}
            height={600}
            className="object-contain max-h-[600px] w-auto h-auto group-hover:scale-105 transition-transform duration-300"
            priority
            unoptimized={currentImage?.includes('cdn.dummyjson.com')}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== '/placeholder.svg') {
                target.src = '/placeholder.svg';
              }
            }}
          />

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              dispatch(toggleFavorite(product))
            }}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={20}
              className={`transition-all duration-200 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300 hover:text-red-500"
              }`}
            />
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 dark:bg-black/50 px-2 py-1 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all opacity-0 group-hover:opacity-100 text-slate-900 dark:text-white"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all opacity-0 group-hover:opacity-100 text-slate-900 dark:text-white"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="w-full flex justify-center pb-2">
          <div className="flex gap-2 overflow-x-auto max-w-full">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === currentImageIndex
                    ? "border-sky-500 dark:border-sky-400 shadow-lg ring-2 ring-sky-200 dark:ring-sky-800"
                    : "border-slate-300 dark:border-slate-600 opacity-60 hover:opacity-100 hover:border-sky-300 dark:hover:border-sky-600"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Product thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={img?.includes('cdn.dummyjson.com')}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/placeholder.svg') {
                      target.src = '/placeholder.svg';
                    }
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
