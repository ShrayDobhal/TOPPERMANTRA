import { supabase } from '../lib/supabase';

/**
 * Base Repository Class
 * Provides generic CRUD operations to abstract Supabase queries out of the UI.
 * Extended by specific entity repositories.
 */
export class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error finding ${this.tableName} by id:`, error);
      return null;
    }
    return data as T;
  }

  async findAll(limit: number = 50): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching from ${this.tableName}:`, error);
      return [];
    }
    return data as T[];
  }

  async create(payload: Partial<T>): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error(`Error creating in ${this.tableName}:`, error);
      return null;
    }
    return data as T;
  }

  async update(id: string, payload: Partial<T>): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating in ${this.tableName}:`, error);
      return null;
    }
    return data as T;
  }
}
