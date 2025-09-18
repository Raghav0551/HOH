import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchProductBySlug } from '../services/productService'

const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const { data, error } = await fetchProductBySlug(slug)
        if (data) {
          setProduct(data)
          if (data.product_variants && data.product_variants.length > 0) {
            setSelectedVariant(data.product_variants[0])
          }
        }
        setLoading(false)
      }
    }
    
    loadProduct()
  }, [slug])

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productId: product.id,
      variantId: selectedVariant?.id,
      quantity
    })
    // Implement add to cart logic
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.image_url || 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail images would go here */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${selectedVariant?.price || product.price}
                  </span>
                  {product.compare_price && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${product.compare_price}
                    </span>
                  )}
                </div>
                <Badge variant="secondary">
                  {product.category || 'Textile'}
                </Badge>
              </div>
            </div>

            <p className="text-gray-700 text-lg">
              {product.description}
            </p>

            {/* Variants */}
            {product.product_variants && product.product_variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.product_variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                      onClick={() => setSelectedVariant(variant)}
                      size="sm"
                    >
                      {variant.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium px-4">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Favorite
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="prose max-w-none">
                  <h3>Product Details</h3>
                  <p>{product.description}</p>
                  {product.product_details && product.product_details.length > 0 && (
                    <ul>
                      {product.product_details.map((detail, index) => (
                        <li key={index}>{detail.name}: {detail.value}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="care" className="mt-6">
                <div className="prose max-w-none">
                  <h3>Care Instructions</h3>
                  <ul>
                    <li>Machine wash cold with like colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low or line dry</li>
                    <li>Iron on low heat if needed</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="prose max-w-none">
                  <h3>Shipping & Returns</h3>
                  <p>
                    Free standard shipping on orders over $50. Express shipping available.
                    30-day return policy with free returns.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductDetail