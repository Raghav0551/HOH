import { supabase } from '../lib/supabaseClient'

export const uploadProductImage = async (productId, file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}-${Math.random()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return { data: { path: filePath, publicUrl }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const deleteProductImage = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath])

    return { error }
  } catch (error) {
    return { error }
  }
}

export const getProductImageUrl = (filePath) => {
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)
  
  return data.publicUrl
}