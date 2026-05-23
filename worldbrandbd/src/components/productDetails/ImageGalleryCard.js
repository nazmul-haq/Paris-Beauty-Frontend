import Image from 'next/image';
import hostname from "@/lib/config";
import React, { useState } from 'react'

const ImageGalleryCard = ({image}) => {
 
       const [isOptimizedImage, setIsOptimizedImage] = useState(true);

  return (
    <Image
      className="rounded-md object-cover h-full w-full"
      src={
        isOptimizedImage
          ? `${hostname.ImageHostName}/storage/product/${encodeURIComponent(
              image
            )}`
          : "/assets/placeholder_600x.webp"
      }
      width={500}
      height={100}
      priority
      alt="product"
      unoptimized={!isOptimizedImage}
      onError={() => setIsOptimizedImage(false)}
    />
  );
}

export default ImageGalleryCard