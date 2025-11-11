"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toggleFavorite } from "@/features/favorites/favoritesSlice"
import React, { useMemo, useState, useRef } from "react"
import type { ProductCardProps } from "@/types/components"

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, loading }) => {
  const dispatch = useAppDispatch()
  const favs = useAppSelector((s) => s.favorites.items)
  const isFav = useMemo(() => product && favs.some((p) => p.id === product.id), [favs, product])
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const discountedPrice = useMemo(() => {
    if (!product) return "0.00"
    const discount = typeof product.discountPercentage === "number" ? product.discountPercentage : 0
    return (product.price * (1 - discount / 100)).toFixed(2)
  }, [product])

  if (loading || !product) {
    return (
      <div className="flex flex-col rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900 animate-pulse">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-800" />
        <div className="flex-1 p-4 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail || "/placeholder.svg"]
  const hasMultipleImages = images.length > 1
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0)

  // Handle mouse movement to change image based on hover position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleImages || !imageContainerRef.current) return
    
    const container = imageContainerRef.current
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    
    // Divide image into sections based on number of images
    // For 2 images: left/right split
    // For 3+ images: divide into equal sections
    const sectionWidth = width / images.length
    const sectionIndex = Math.min(Math.floor(x / sectionWidth), images.length - 1)
    
    if (sectionIndex !== hoveredImageIndex) {
      setHoveredImageIndex(sectionIndex)
    }
  }

  const handleMouseLeave = () => {
    if (hasMultipleImages) {
      setHoveredImageIndex(0)
    }
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-full hover:scale-[1.01]">
        {/* Image Section */}
        <div 
          ref={imageContainerRef}
          className="relative w-full h-80 overflow-hidden group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={images[hoveredImageIndex] || images[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-all duration-500 ease-out"
            unoptimized={images[hoveredImageIndex]?.includes('cdn.dummyjson.com')}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== '/placeholder.svg') {
                target.src = '/placeholder.svg';
              }
            }}
          />

          <div className="absolute top-3 left-3 z-20">
            <div className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-full text-xs font-semibold text-sky-700 dark:text-sky-200 shadow-md">
              {product.category}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              product && dispatch(toggleFavorite(product))
            }}
            className="absolute top-3 right-3 z-20 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={20}
              className={`transition-all duration-200 ${
                isFav ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300 hover:text-red-500"
              }`}
            />
          </button>

          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 dark:bg-black/50 px-2 py-1 rounded-full">
              {images.slice(0, Math.min(images.length, 4)).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === hoveredImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col gap-3 bg-white dark:bg-slate-800">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 text-balance">{product.title}</h3>
            </div>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="text-xs line-through text-slate-400 dark:text-slate-500">${product.price.toFixed(2)}</span>
              )}
              <span className="font-bold text-lg text-sky-600 dark:text-sky-400">${discountedPrice}</span>
            </div>
          </div>

          {product.description && <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{product.description}</p>}

          <div className="mt-auto pt-3 flex gap-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{product.rating}</span>
            </div>

            {/* Stock/availability */}
            {product.stock !== undefined && (
              <div className="flex items-center gap-1">
                <span>📦</span>
                <span className="font-medium">{product.stock} in stock</span>
              </div>
            )}

            {/* View Details Button as text link */}
            <div className="ml-auto flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium">
              <span>View</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
})

ProductCard.displayName = "ProductCard"
