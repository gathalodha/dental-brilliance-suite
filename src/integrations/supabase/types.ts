export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          cta_link: string | null
          cta_text: string | null
          description: string | null
          id: number
          image_url: string | null
          stat_patients: number | null
          stat_treatments: number | null
          stat_years: number | null
          title: string
          updated_at: string
        }
        Insert: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          stat_patients?: number | null
          stat_treatments?: number | null
          stat_years?: number | null
          title?: string
          updated_at?: string
        }
        Update: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          stat_patients?: number | null
          stat_treatments?: number | null
          stat_years?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_emails: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          preferred_date: string | null
          status: string
          treatment: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          preferred_date?: string | null
          status?: string
          treatment?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          preferred_date?: string | null
          status?: string
          treatment?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number
          experience: string | null
          id: string
          image_url: string | null
          name: string
          qualification: string | null
          specialization: string | null
          updated_at: string
          visible: boolean
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number
          experience?: string | null
          id?: string
          image_url?: string | null
          name: string
          qualification?: string | null
          specialization?: string | null
          updated_at?: string
          visible?: boolean
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number
          experience?: string | null
          id?: string
          image_url?: string | null
          name?: string
          qualification?: string | null
          specialization?: string | null
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number
          id: string
          question: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number
          id?: string
          question: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number
          id?: string
          question?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          address: string | null
          copyright_text: string | null
          description: string | null
          email: string | null
          google_maps_link: string | null
          hours_fri: string | null
          hours_mon_thu: string | null
          hours_sat: string | null
          hours_sun: string | null
          id: number
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          copyright_text?: string | null
          description?: string | null
          email?: string | null
          google_maps_link?: string | null
          hours_fri?: string | null
          hours_mon_thu?: string | null
          hours_sat?: string | null
          hours_sun?: string | null
          id?: number
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          copyright_text?: string | null
          description?: string | null
          email?: string | null
          google_maps_link?: string | null
          hours_fri?: string | null
          hours_mon_thu?: string | null
          hours_sat?: string | null
          hours_sun?: string | null
          id?: number
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          created_at: string
          display_order: number
          href: string
          id: string
          label: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          display_order?: number
          href: string
          id?: string
          label: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          display_order?: number
          href?: string
          id?: string
          label?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_video_url: string | null
          brand_line: string | null
          cta_enabled: boolean
          cta_link: string | null
          cta_text: string | null
          heading: string
          id: number
          image_url: string | null
          secondary_cta_enabled: boolean
          secondary_cta_link: string | null
          secondary_cta_text: string | null
          subheading: string | null
          updated_at: string
        }
        Insert: {
          background_video_url?: string | null
          brand_line?: string | null
          cta_enabled?: boolean
          cta_link?: string | null
          cta_text?: string | null
          heading?: string
          id?: number
          image_url?: string | null
          secondary_cta_enabled?: boolean
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subheading?: string | null
          updated_at?: string
        }
        Update: {
          background_video_url?: string | null
          brand_line?: string | null
          cta_enabled?: boolean
          cta_link?: string | null
          cta_text?: string | null
          heading?: string
          id?: number
          image_url?: string | null
          secondary_cta_enabled?: boolean
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subheading?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          display_order: number
          href: string
          id: string
          label: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          display_order?: number
          href: string
          id?: string
          label: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          display_order?: number
          href?: string
          id?: string
          label?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          brand_line: string | null
          call_button_link: string | null
          clinic_name: string
          email: string | null
          favicon_url: string | null
          google_maps_embed: string | null
          google_maps_link: string | null
          id: number
          logo_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_image_url: string | null
          phone: string | null
          primary_color: string | null
          secondary_color: string | null
          show_call: boolean
          show_telegram: boolean
          show_whatsapp: boolean
          telegram_link: string | null
          updated_at: string
          whatsapp_message: string | null
          whatsapp_number: string | null
        }
        Insert: {
          address?: string | null
          brand_line?: string | null
          call_button_link?: string | null
          clinic_name?: string
          email?: string | null
          favicon_url?: string | null
          google_maps_embed?: string | null
          google_maps_link?: string | null
          id?: number
          logo_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_call?: boolean
          show_telegram?: boolean
          show_whatsapp?: boolean
          telegram_link?: string | null
          updated_at?: string
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          address?: string | null
          brand_line?: string | null
          call_button_link?: string | null
          clinic_name?: string
          email?: string | null
          favicon_url?: string | null
          google_maps_embed?: string | null
          google_maps_link?: string | null
          id?: number
          logo_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_call?: boolean
          show_telegram?: boolean
          show_whatsapp?: boolean
          telegram_link?: string | null
          updated_at?: string
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number
          id: string
          platform: string
          updated_at: string
          url: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          platform: string
          updated_at?: string
          url: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          platform?: string
          updated_at?: string
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string | null
          patient_name: string
          rating: number
          review: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          patient_name: string
          rating?: number
          review: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          patient_name?: string
          rating?: number
          review?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      treatments: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          name: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
