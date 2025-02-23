import { Category } from '../../domain/todo/Category';
import { CategoryRepository } from '../../domain/todo/CategoryRepository';

export class InMemoryCategoryRepository implements CategoryRepository {
  private categories = new Map<string, Category>();

  async save(category: Category): Promise<void> {
    this.categories.set(category.id, category);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categories.get(id) || null;
  }

  async findAll(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async delete(id: string): Promise<void> {
    this.categories.delete(id);
  }
} 