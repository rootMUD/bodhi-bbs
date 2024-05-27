import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type CategoryProviderProps = {
  children: React.ReactNode;
};
type ICategoryState = {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  categories: Array<string>;
  setCategories: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export const CategoryContext = createContext<ICategoryState | null>(null);

export function useCategoryContext() {
  return useContext(CategoryContext) as ICategoryState;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categories = await fetch("https://rootmud-bbs.deno.dev/constant?app_name=bbs_rootmud&key=categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const categoriesData = await categories.json();
      console.log(categoriesData);
      const reg = /\\/g;

      const replaceAfter = categoriesData.value.replace(reg, "");
      const categoriesString = replaceAfter.substring(2, replaceAfter.length - 2);
      const categoriesArray: Array<string> = categoriesString.split('", "');
      categoriesArray.unshift("all");
      setCategories(categoriesArray);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, setCategory, categories, setCategories, loading, setLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};
