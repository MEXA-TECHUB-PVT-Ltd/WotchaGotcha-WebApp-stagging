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
import { useTranslation } from "react-i18next";

const OnNews = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
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
          setNews(data?.News);
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
          title={<BreadCrumb items={[{ label: t("onnews") }]} />}
          buttonTitle={t("add")}
          buttonIcon={FaPlus}
          onSearch={onSearch}
          onAddButtonClick={() => setAddModal(true)}
          searchBy={t("name")}
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
          <div className="cards-container">
            {topNews?.map((news) => (
              <div className="mb-5" key={news?.id}>
                <div className="heading">
                  {/* {news?.sub_category_name || "Others"} */}
                </div>
                <ThumbnailCard
                  key={news?.news_id}
                  image={news?.image}
                  title={news?.username}
                  onClick={() => {
                    setCurrentNews(news);
                    setNewsModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : !topNews && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            {t("no-found-news")}
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
              {t("no-found-data")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isNewsFetching ? (
            <Spinner />
          ) : news?.length > 0 ? (
            <div className="cards-container">
              {news?.map((news) => (
                <div className="mb-5" key={news?.id}>
                  <div className="heading">
                    {news?.sub_category_name || "Others"}
                  </div>
                  <ThumbnailCard
                    key={news?.news_id}
                    image={news?.image}
                    title={news?.username}
                    onClick={() => {
                      setCurrentNews(news);
                      setNewsModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : news?.length === 0 && !isNewsFetching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-data")}
            </div>
          ) : null}
        </div>
      )}

      {/* //** Modals  */}

      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title={t("add_news")}
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
