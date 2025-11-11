'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig, generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo';

export function SEOHead() {
  const pathname = usePathname();

  useEffect(() => {
    // Add website structured data
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify(generateWebsiteStructuredData());
    websiteScript.id = 'website-structured-data';
    
    // Add organization structured data
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(generateOrganizationStructuredData());
    orgScript.id = 'organization-structured-data';

    // Remove existing scripts if they exist
    const existingWebsite = document.getElementById('website-structured-data');
    const existingOrg = document.getElementById('organization-structured-data');
    
    if (existingWebsite) existingWebsite.remove();
    if (existingOrg) existingOrg.remove();

    // Add new scripts
    document.head.appendChild(websiteScript);
    document.head.appendChild(orgScript);

    // Update meta tags
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

    // Update basic meta tags
    updateMetaTag('description', siteConfig.description);
    updateMetaTag('og:title', siteConfig.name, true);
    updateMetaTag('og:description', siteConfig.description, true);
    updateMetaTag('og:url', `${siteConfig.url}${pathname}`, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', siteConfig.name, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', siteConfig.name);
    updateMetaTag('twitter:description', siteConfig.description);

    return () => {
      // Cleanup on unmount
      if (websiteScript.parentNode) websiteScript.parentNode.removeChild(websiteScript);
      if (orgScript.parentNode) orgScript.parentNode.removeChild(orgScript);
    };
  }, [pathname]);

  return null;
}

