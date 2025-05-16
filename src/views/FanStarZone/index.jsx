import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlayCircle, FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";
import ThumbnailCard from "../../components/card/ThumbnailCard";
import { Spinner } from "../../components/theme/Loader";
import { nameElipse } from "../../utils/common/nameElipse";
import Modal from "../../components/modal/Modal";
import {
  fanStarTopVideo,
  getFanStarByCategory,
  getFanStarCategories,
  searchFanStar,
} from "../../app/features/fanstarzone";
import { AddFanStar, FanStarPlayer } from "../../services/fanstarzone";
import { use } from "react";
import { useTranslation } from "react-i18next";

const FanStarZone = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [reload, setReload] = useState(false);
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);

  const [topVideo, setTopVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor, textColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isVideoFetching,
    isTopVideoFetching,
    isSearching,
  } = useSelector((state) => state.fanstarzone);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  useEffect(() => {
    dispatch(getFanStarCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(data.AllCategories[0]);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(fanStarTopVideo({ token }))
      .unwrap()
      .then((data) => {
        setTopVideo(data?.data);
      });
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;

    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchFanStar({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setVideos(data?.videos);
          });
      }, 300);
    } else {
      dispatch(getFanStarByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setVideos(data?.data);
        });
    }

    return () => clearTimeout(timeout);
  }, [activeCategory, reload, searchQuery]);

  return (
    <Fragment>
      {!isDashboard && (
        <Header
          title={<BreadCrumb items={[{ label: t("fans-stars-zone") }]} />}
          buttonTitle={t("add")}
          buttonIcon={FaPlus}
          onSearch={onSearch}
          onAddButtonClick={() => setAddModal(true)}
          searchBy={t("name")}
        />
      )}

      {/* All Categories */}
      {!searchQuery?.trim()?.length > 0 && (
        <div className="flex items-center gap-5 overflow-x-auto flex-1 scrollbar-hidden">
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
                } px-2 py-1 rounded-md  cursor-pointer min-w-fit `}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      )}

      {/* Top Video*/}
      <div className="flex items-center mt-10">
        {isTopVideoFetching ? (
          <Spinner />
        ) : topVideo ? (
          <div className="flex items-center gap-2 max-w-[90vw]">
            <div
              className="top-video-card"
              onClick={() => {
                setCurrentVideo(topVideo);
                setVideoModal(true);
              }}
            >
              <FaPlayCircle className={`w-32 h-32 ${textColor}`} />
              <div className="text-lg">{nameElipse(topVideo?.name, 12)}</div>
            </div>

            <div className="long-desc">{topVideo?.description}</div>
          </div>
        ) : !topVideo && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            {t("no-found-videos-top")}
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their videos */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : videos?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {videos?.map((v) => (
                  <ThumbnailCard
                    key={v?.video_id}
                    image={v?.thumbnail}
                    title={v?.name}
                    onClick={() => {
                      setCurrentVideo(v);
                      setVideoModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : videos?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-videos")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isVideoFetching ? (
            <Spinner />
          ) : videos?.length > 0 ? (
            videos?.map((video) => (
              <div className="mb-5">
                <div className="heading">{video?.sub_category_name}</div>
                <div className="cards-container">
                  {video?.video_result?.videos?.length > 0 ? (
                    video?.video_result?.videos?.map((v) => (
                      <ThumbnailCard
                        key={v?.video_id}
                        image={v?.thumbnail}
                        title={v?.name}
                        onClick={() => {
                          setCurrentVideo(v);
                          setVideoModal(true);
                        }}
                      />
                    ))
                  ) : (
                    <div className="flex justify-center text-gray-400 my-10">
                      {t("no-found-videos")}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : videos?.length === 0 && !isVideoFetching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-videos")}
            </div>
          ) : null}
        </div>
      )}
      {/* //** Modals  */}

      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add Video"
      >
        <AddFanStar
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Video Modal  */}
      <FanStarPlayer
        video={currentVideo}
        isOpen={videoModal}
        onClose={() => {
          setVideoModal(false);
        }}
        dispatch={dispatch}
      />
    </Fragment>
  );
};

export default FanStarZone;
