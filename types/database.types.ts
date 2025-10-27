export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          price: number
          ai_model: 'chatgpt' | 'midjourney' | 'dalle' | 'gemini'
          category: string
          seller_id: string
          image_url: string | null
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          price: number
          ai_model: 'chatgpt' | 'midjourney' | 'dalle' | 'gemini'
          category: string
          seller_id: string
          image_url?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          price?: number
          ai_model?: 'chatgpt' | 'midjourney' | 'dalle' | 'gemini'
          category?: string
          seller_id?: string
          image_url?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          buyer_id: string
          prompt_id: string
          amount: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          buyer_id: string
          prompt_id: string
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          buyer_id?: string
          prompt_id?: string
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          prompt_id: string
          user_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          user_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          user_id?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
    }
  }
}

