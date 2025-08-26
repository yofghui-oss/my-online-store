import React from 'react';
import { Category } from '../../../types';
import Card from '../../ui/Card';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  sortBy,
  setSortBy,
}) => {
  const handleCategoryChange = (categoryId: string) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelection);
  };

  return (
    <div className="space-y-6 sticky top-24">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:border-secondary-700">
          التصنيفات
        </h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <input
                id={`category-${category.id}`}
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor={`category-${category.id}`} className="mr-3 text-sm text-secondary-600 dark:text-secondary-300">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:border-secondary-700">
          ترتيب حسب
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field"
        >
          <option value="createdAt-desc">الأحدث</option>
          <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
          <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
          <option value="name-asc">الاسم: أ-ي</option>
          <option value="name-desc">الاسم: ي-أ</option>
        </select>
      </Card>
    </div>
  );
};

export default ProductFilters;
