import { supabase } from '../lib/supabaseClient'

export const fetchAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_details(*),
        product_variants(*)
      `)
      .eq('active', true)
    
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const fetchProductBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_details(*),
        product_variants(*)
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_details(*),
        product_variants(*)
      `)
      .eq('category_id', categoryId)
      .eq('active', true)
    
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const addToCart = async (userId, productId, variantId, quantity = 1) => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        variant_id: variantId,
        quantity
      }, {
        onConflict: 'user_id,product_id,variant_id'
      })
    
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const fetchCartItems = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*),
        product_variants(*)
      `)
      .eq('user_id', userId)
    
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const removeFromCart = async (userId, productId, variantId) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId)
    
    return { error }
  } catch (error) {
    return { error }
  }
}