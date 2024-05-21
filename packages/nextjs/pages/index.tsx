import { useEffect, useState } from "react";
import { NextPage } from "next";
import { ImgShow } from "~~/components/ImgShow";

const fetcher = (...args) => fetch(...args).then(res => res.json());
const ETHSpace: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
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
  // Fetch images from your backend
  const fetchImages = async (page: number) => {
    setLoading(true);
    try {
      const categories = await fetch("https://bodhi-data.deno.dev/constant?key=bodhi_img_categories", {
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
      const categoriesArray = categoriesString.split('","');
      setCategories(categoriesArray);
      // const cursorResponse = await fetch("https://bodhi-data.deno.dev/imgs_latest_id", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const lastedIdData = await cursorResponse.json();
      // const cursor = lastedIdData.latestId - (page - 1) * 10;
      // setMaxPage(Math.ceil(lastedIdData.latestId / 10));
      // const categoryParams = category === "All" ? "" : `&category=${category}`;
      // const response = await fetch(`https://bodhi-data.deno.dev/imgs?cursor=${cursor}&limit=10${categoryParams}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const categoryParams = category === "All" ? "" : `&category=${category}`;
      const response = await fetch(`https://bodhi-data.deno.dev/imgs_page?page=${page}&limit=10${categoryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      // Assuming the data format matches what the ImgShow component expects
      const formattedImages = data.images.map((img: { link: any; id_on_chain: string; category: string }) => ({
        image: img.link,
        link: "https://bodhi.wtf/" + img.id_on_chain,
        category: img.category || "",
        id: img.id_on_chain || 0,
      }));
      setImages(formattedImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(pageIndex);
  }, [pageIndex, category]);

  return (
    <>
      <div className="flex items-center h-[5rem] px-[2rem] justify-end">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="select text-center select-primary w-[12rem] h-[2rem]"
        >
          <option disabled selected>
            Select Category
          </option>
          <option>All</option>
          {categories.map((category: string, index: number) => {
            return <option key={index}>{category}</option>;
          })}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          Loading<span className="loading loading-dots loading-xs"></span>
        </div>
      ) : null}
      <ImgShow images={images} />
      <div className="join flex justify-center items-center">
        <button onClick={onPrevPage} className="join-item btn">
          «
        </button>
        <button className="join-item btn">Page {pageIndex}</button>
        <button onClick={onNextPage} className="join-item btn">
          »
        </button>
      </div>
    </>
  );
};

export default ETHSpace;
