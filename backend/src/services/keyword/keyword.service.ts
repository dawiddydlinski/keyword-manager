import { Injectable, NotFoundException } from '@nestjs/common';
import { data } from '../../mock';
import { Keyword } from '../../keyword.model';

@Injectable()
export class KeywordService {
  data = data;

  getData() {
    return this.data;
  }

  /**
   * Get keywords array by given category identifier
   * @param id Category identifier
   * @Returns Keyword[]
   */
  getKeywordsByCategoryId(id: number): Keyword[] {
    const category = this.data.find(c => c.id === id);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${id}`);
    }
    return category.keywords;
  }

  /**
   * Creates new keyword and returns all keywords if target category exist.
   * @param categoryId Category identifier
   * @param name New keyword name
   * @Returns Keyword[]
   */
  createKeyword(categoryId: number, name: string): Keyword[] {
    const category = this.data.find(c => c.id === categoryId);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${categoryId}`);
    }
    const newId = Math.max(0, ...category.keywords.map(k => k.id)) + 1;
    const newKeyword = { id: newId, name };
    category.keywords.push(newKeyword);
    const index = this.data.indexOf(category);
    this.data[index] = category;
    return this.data.find(c => c.id === categoryId).keywords;
  }

  /**
   * Deletes specific keyword from target category if exist.
   * @param categoryId Category identifier
   * @param keywordId Keyword identifier
   * @Returns Keyword id
   */
  deleteKeyword(categoryId: number, keywordId: number): number {
    const category = this.data.find(c => c.id === categoryId);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${categoryId}`);
    }
    const keyword = category.keywords.find(k => k.id === keywordId);
    if (!keyword) {
      throw new NotFoundException(`Cannot find keyword with id: ${keywordId}`);
    }
    const keywordIndex = category.keywords.indexOf(keyword);
    category.keywords.splice(keywordIndex, 1);
    const categoryIndex = this.data.indexOf(category);
    this.data[categoryIndex] = category;
    return keywordId;
  }
}
