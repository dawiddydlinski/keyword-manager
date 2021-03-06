import { Args, Mutation, Int, Query, Resolver } from '@nestjs/graphql';
import { Category } from './category.model';
import { Keyword } from './keyword.model';
import { data } from './mock';
import { CategoryService } from './services/category/category.service';
import { KeywordService } from './services/keyword/keyword.service';

@Resolver(of => Keyword)
export class KeywordsResolver {
  categories = data;

  constructor(private categoryService: CategoryService, private keywordService: KeywordService) {
  }

  @Query(returns => [Category], { name: 'categories' })
  getCategories(): Category[] {
    return this.keywordService.getData();
  }

  @Query(returns => Category, { name: 'category' })
  getCategory(@Args('id') id: number): Category {
    return this.categoryService.getCategory(id);
  }

  @Query(returns => [Keyword], { name: 'keywords' })
  getKeywords(@Args('id') id: number): Keyword[] {
    return this.keywordService.getKeywordsByCategoryId(id);
  }

  @Mutation(returns => Category, { name: 'createCategory' })
  async createCategory(@Args('name') name: string): Promise<Category> {
    return await this.categoryService.createCategory(name);
  }

  @Mutation(returns => Category, { name: 'deleteCategory' })
  deleteCategory(@Args('id') id: number): Category {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(returns => [Keyword], { name: 'createKeyword' })
  createKeyword(@Args('categoryId') categoryId: number, @Args('name') name: string): Keyword[] {
    return this.keywordService.createKeyword(categoryId, name);
  }

  @Mutation(returns => Int, { name: 'deleteKeyword' })
  deleteKeyword(@Args('categoryId') categoryId: number, @Args('keywordId') keywordId: number): number {
    return this.keywordService.deleteKeyword(categoryId, keywordId);
  }
}
