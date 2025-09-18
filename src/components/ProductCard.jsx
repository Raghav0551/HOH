import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ProductCard = ({ product }) => {
  const handleAddToCart = (e) => {
    e.preventDefault()
    // Add to cart logic here
    console.log('Adding to cart:', product.id)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    // Toggle favorite logic here
    console.log('Toggle favorite:', product.id)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">
                ${product.price}
              </span>
              {product.compare_price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>
            
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ProductCard