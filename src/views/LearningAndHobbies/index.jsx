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
import { AddTvProgmax, TvProgmaxPlayer } from "../../services/tvprogmax";
import {
  getLearningHobbiesByCategory,
  getLearningHobbiesCategories,
  learningHobbiesTopVideo,
  searchLearningHobbies,
} from "../../app/features/learningandhobbies";
import {
  AddLearningHobbies,
  LearningHobbiesPlayer,
} from "../../services/learninghobbies";
import { useTranslation } from "react-i18next";

const LearningAndHobbies = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [addModal, setAddModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [reload, setReload] = useState(false);

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
  } = useSelector((state) => state.learningandhobbies);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  useEffect(() => {
    dispatch(getLearningHobbiesCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(data.AllCategories[0]);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(learningHobbiesTopVideo({ token }))
      .unwrap()
      .then((data) => {
        setTopVideo(data?.topVideos);
      });
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;

    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchLearningHobbies({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setVideos(data?.videos);
          });
      }, 300);
    } else {
      dispatch(getLearningHobbiesByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setVideos(data?.Videos);
        });
    }

    return () => clearTimeout(timeout);
  }, [activeCategory, reload, searchQuery]);

  return (
    <Fragment>
      {!isDashboard && (
        <Header
          title={<BreadCrumb items={[{ label: t("learningandhobbies") }]} />}
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

      {/* Top Videos */}
      <div className="flex flex-col mt-10">
        {isTopVideoFetching ? (
          <Spinner />
        ) : topVideo?.length > 0 ? (
          <div className="flex flex-wrap gap-4 max-w-[90vw]">
            {topVideo.map((video) => (
              <div
                key={video.video_id}
                className="top-video-card cursor-pointer flex flex-col items-center"
                onClick={() => {
                  setCurrentVideo(video);
                  setVideoModal(true);
                }}
              >
                <FaPlayCircle className={`w-32 h-32 ${textColor}`} />
                <div className="text-lg font-medium text-center">
                  {nameElipse(video.name, 12)}
                </div>
                <div className="text-sm text-gray-600 text-center px-2">
                  {nameElipse(video.description, 20)}
                </div>
              </div>
            ))}
          </div>
        ) : !topVideo?.length && !isTopVideoFetching ? (
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
        title={t("add_video")}
      >
        <AddLearningHobbies
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Video Modal  */}
      <LearningHobbiesPlayer
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

export default LearningAndHobbies;
