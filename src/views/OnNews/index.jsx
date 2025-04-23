import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";

import ThumbnailCard from "../../components/card/ThumbnailCard";
import { Spinner } from "../../components/theme/Loader";
import Modal from "../../components/modal/Modal";

import {
  getOnNewsByCategory,
  getOnNewsCategories,
  getTopOnNews,
  searchOnNews,
} from "../../app/features/onnews";
import { AddNews, NewsPreviewer } from "../../services/news";

const OnNews = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [newsModal, setNewsModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [news, setNews] = useState([]);

  const [topNews, setTopNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isNewsFetching,
    isTopNewsFetching,
    isSearching,
  } = useSelector((state) => state.onnews);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getOnNewsCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(data?.AllCategories[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    dispatch(getTopOnNews({ token }))
      .unwrap()
      .then((data) => {
        setTopNews(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;
    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchOnNews({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setNews(data?.News);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getOnNewsByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setNews(data?.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => clearTimeout(timeout);
  }, [activeCategory, reload, searchQuery]);

  return (
    <Fragment>
      {!isDashboard && (
        <Header
          title={<BreadCrumb items={[{ label: "On News" }]} />}
          buttonTitle={"Add"}
          buttonIcon={FaPlus}
          onSearch={onSearch}
          onAddButtonClick={() => setAddModal(true)}
          searchBy={"name"}
        />
      )}

      {/* All Categories */}

      {!searchQuery?.trim()?.length > 0 && (
        <div className="flex flex-1 gap-5 items-center overflow-x-auto scrollbar-hidden">
          {isFetching ? (
            <Spinner />
          ) : (
            categories?.AllCategories?.map((category) => (
              <div
                key={category.id}
                className={` ${
                  activeCategory?.name === category?.name
                    ? `${bgColor} text-white`
                    : "border border-gray-300 text-dark_bg_5 dark:text-dark_text_1"
                } px-2 py-1 rounded-md  cursor-pointer min-w-fit`}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      )}

      {/* Top PicTour*/}
      <div className="flex items-center mt-10">
        {isTopNewsFetching ? (
          <Spinner />
        ) : topNews ? (
          <div
            className="flex justify-center gap-5 items-center"
            onClick={() => {
              setCurrentNews(topNews);
              setNewsModal(true);
            }}
          >
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topNews?.image}
              alt={"topNews"}
              className="video-thumbnail"
            />

            <div className="long-desc">{topNews?.description}</div>
          </div>
        ) : !topNews && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top News Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : news?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {news?.map((pic) => (
                  <ThumbnailCard
                    key={pic?.news_id}
                    image={pic?.image}
                    title={pic?.username}
                    onClick={() => {
                      setCurrentNews(pic);
                      setNewsModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : news?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              No Data Found
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isNewsFetching ? (
            <Spinner />
          ) : news?.length > 0 ? (
            news?.map((news) => (
              <div className="mb-5" key={news?.id}>
                <div className="heading">
                  {news?.sub_category_name || "Others"}
                </div>
                <div className="cards-container">
                  {news?.news_result?.News?.length > 0 ? (
                    news?.news_result?.News?.map((pic) => (
                      <ThumbnailCard
                        key={pic?.news_id}
                        image={pic?.image}
                        title={pic?.username}
                        onClick={() => {
                          setCurrentNews(pic);
                          setNewsModal(true);
                        }}
                      />
                    ))
                  ) : (
                    <div className="flex justify-center text-gray-400 my-10">
                      No Data Found
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : news?.length === 0 && !isNewsFetching ? (
            <div className="flex justify-center text-gray-400">
              No Data Found
            </div>
          ) : null}
        </div>
      )}

      {/* //** Modals  */}

      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add News"
      >
        <AddNews
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <NewsPreviewer
        image={currentNews}
        isOpen={newsModal}
        onClose={() => {
          setNewsModal(false);
        }}
      />
    </Fragment>
  );
};

export default OnNews;
