import { useEffect, useState } from "react";
import clsx from "clsx";
import { NextPage } from "next";

const ETHSpace: NextPage = () => {
  const [categories, setCategories] = useState<Array<string>>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [posts, setPosts] = useState<Array<any>>([]);
  const onNextPage = () => {
    // if (pageIndex < maxPage) {
    setPageIndex(pageIndex + 1);
    // }
  };

  const onPrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };
  const setCategoryHandler = (category: string) => {
    setCategory(category);
  };
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

  const fetchPosts = async (page: number) => {
    setPostLoading(true);

    const categoryParams = category === "all" ? "" : `&category=${category}`;
    const response = await fetch(
      `https://bodhi-data.deno.dev/assets_by_space?space_addr=0xbeafc083600efc2376648bff353ce8a3ecaa1463&page=${page}&limit=10${categoryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = (await response.json()) as Array<any>;

    const posts = data.map(item => {
      return {
        title: item.id_on_chain,
        url: `https://bodhi.wtf/${item.id_on_chain}`,
        description: `${(item.content as string)?.substring(0, 100)}...`,
        image: `https://picsum.photos/seed/${item.id_on_chain}/200`,
        author: item.author_true,
      };
    });
    console.log(posts);

    setPosts(posts);
    setPostLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts(pageIndex);
  }, [pageIndex, category]);
  return (
    <>
      <div className="w-72 bg-base-300 flex justify-center items-center p-4">
        <div className="w-full h-auto bg-base-200 rounded-box py-3 self-start">
          <span className="py-2 flex justify-center items-center font-bold text-2xl">TOPICS</span>
          <main>
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
          </main>
        </div>
      </div>
      <div className="flex-1 bg-base-300 p-4">
        <div className="w-full h-full bg-base-200 rounded-box p-3">
          {postLoading && (
            <div className="flex justify-center items-center">
              Loading<span className="loading loading-dots loading-xs"></span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 p-4 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {posts.map((post: any, index: number) => {
              return (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img src={post.image} alt={post.title} className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{post.title}</h2>
                    <p>{post.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="join flex justify-center items-center">
            <button onClick={onPrevPage} className="join-item btn">
              «
            </button>
            <button className="join-item btn">Page {pageIndex}</button>
            <button onClick={onNextPage} className="join-item btn">
              »
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ETHSpace;
