export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          avatar_url: string | null
          therapist_id: string | null
          subscription_status: string
          subscription_end_date: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          avatar_url?: string | null
          therapist_id?: string | null
          subscription_status?: string
          subscription_end_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          avatar_url?: string | null
          therapist_id?: string | null
          subscription_status?: string
          subscription_end_date?: string | null
        }
      }
      thought_records: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          situation: string
          thoughts: string
          emotions: Json
          behaviors: string
          alternative_thoughts: string
          outcome: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          situation: string
          thoughts: string
          emotions: Json
          behaviors: string
          alternative_thoughts: string
          outcome: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          situation?: string
          thoughts?: string
          emotions?: Json
          behaviors?: string
          alternative_thoughts?: string
          outcome?: string
        }
      }
      meditation_logs: {
        Row: {
          id: string
          created_at: string
          user_id: string
          duration: number
          meditation_type: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          duration: number
          meditation_type: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          duration?: number
          meditation_type?: string
          notes?: string | null
        }
      }
      mood_logs: {
        Row: {
          id: string
          created_at: string
          user_id: string
          mood: string
          intensity: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          mood: string
          intensity: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          mood?: string
          intensity?: number
          notes?: string | null
        }
      }
    }
  }
}

