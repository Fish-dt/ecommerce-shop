'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/lib/seo';

interface PageMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function PageMetadata({ 
  title, 
  description = siteConfig.description,
  image,
  type = 'website'
}: PageMetadataProps) {
  useEffect(() => {
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update title
    if (title) {
      document.title = `${title} | ${siteConfig.name}`;
      updateMetaTag('og:title', `${title} | ${siteConfig.name}`, true);
      updateMetaTag('twitter:title', `${title} | ${siteConfig.name}`);
    }

    // Update description
    updateMetaTag('description', description);
    updateMetaTag('og:description', description, true);
    updateMetaTag('twitter:description', description);

    // Update image - use provided image or fallback to default
    // Safely check if image exists and is not empty before using it
    const imageToUse = (image && typeof image === 'string' && image.trim().length > 0) 
      ? image 
      : siteConfig.ogImage;
    
    if (imageToUse && typeof imageToUse === 'string' && imageToUse.trim().length > 0) {
      const fullImageUrl = imageToUse.startsWith('http') 
        ? imageToUse 
        : `${siteConfig.url}${imageToUse.startsWith('/') ? imageToUse : `/${imageToUse}`}`;
      updateMetaTag('og:image', fullImageUrl, true);
      updateMetaTag('twitter:image', fullImageUrl);
    }

    // Update type
    updateMetaTag('og:type', type, true);
  }, [title, description, image, type]);

  return null;
}

