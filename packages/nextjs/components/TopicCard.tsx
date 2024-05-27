import clsx from "clsx";
import { useCategoryContext } from "~~/provider/categoryProvider";

const TopicCard = () => {
  const { categories, category, loading, setCategory } = useCategoryContext();
  const setCategoryHandler = (category: string) => {
    setCategory(category);
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          Loading<span className="loading loading-dots loading-xs"></span>
        </div>
      ) : (
        <ul className="menu [&_li>*]:rounded-lg space-y-2">
          {categories.map((itemCategory: string, index: number) => {
            return (
              <li key={index}>
                <button
                  className={clsx("text-lg", category == itemCategory && "bg-accent")}
                  onClick={() => setCategoryHandler(itemCategory)}
                >
                  {itemCategory}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default TopicCard;
