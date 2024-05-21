import { useEffect, useState } from "react";
import { NextPage } from "next";

const ETHSpace: NextPage = () => {
  const [categories, setCategories] = useState([]);
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
      const categoriesArray = categoriesString.split('", "');
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
    <>
      <div className="w-72 bg-base-300 flex justify-center items-center p-4">
        <div className="w-full h-auto bg-base-200 rounded-box py-3">
          <span className="py-2 flex justify-center items-center font-bold text-2xl">TOPICS</span>
          <main>
            {loading ? (
              <div className="flex justify-center items-center">
                Loading<span className="loading loading-dots loading-xs"></span>
              </div>
            ) : (
              <ul className="menu [&_li>*]:rounded-lg">
                {categories.map((category: string, index: number) => {
                  return (
                    <li key={index}>
                      <a href="#">{category}</a>
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
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">1984</time>
                <div className="text-lg font-black">First Macintosh computer</div>
                The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal
                computer. It played a pivotal role in establishing desktop publishing as a general office function. The
                motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated
                carrying handle; it came with a keyboard and single-button mouse.
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">1998</time>
                <div className="text-lg font-black">iMac</div>
                iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the
                primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved
                through seven distinct forms
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">2001</time>
                <div className="text-lg font-black">iPod</div>
                The iPod is a discontinued series of portable media players and multi-purpose mobile devices designed
                and marketed by Apple Inc. The first version was released on October 23, 2001, about 8+1⁄2 months after
                the Macintosh version of iTunes was released. Apple sold an estimated 450 million iPod products as of
                2022. Apple discontinued the iPod product line on May 10, 2022. At over 20 years, the iPod brand is the
                oldest to be discontinued by Apple
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">2007</time>
                <div className="text-lg font-black">iPhone</div>
                iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system.
                The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then,
                Apple has annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2
                billion iPhones had been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market
                share
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">2015</time>
                <div className="text-lg font-black">Apple Watch</div>
                The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking,
                health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple
                products and services
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="flex items-center h-[5rem] px-[2rem] justify-end">
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
      </div> */}
    </>
  );
};

export default ETHSpace;
