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
          role: 'STUDENT' | 'MENTOR' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'COMPANY_ADMIN' | 'ADMIN' | 'SUPER_ADMIN'
          first_name: string
          last_name: string
          username: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'STUDENT' | 'MENTOR' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'COMPANY_ADMIN' | 'ADMIN' | 'SUPER_ADMIN'
          first_name: string
          last_name: string
          username: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          role?: 'STUDENT' | 'MENTOR' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'COMPANY_ADMIN' | 'ADMIN' | 'SUPER_ADMIN'
          first_name?: string
          last_name?: string
          username?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      // ... Add other generated table definitions here
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'STUDENT' | 'MENTOR' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'COMPANY_ADMIN' | 'ADMIN' | 'SUPER_ADMIN'
      project_status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
      application_status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED' | 'ACCEPTED'
    }
  }
}
