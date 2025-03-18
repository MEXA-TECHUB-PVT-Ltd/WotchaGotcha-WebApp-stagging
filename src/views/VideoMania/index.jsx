import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlayCircle, FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopVideo,
  getVideoCategories,
  getVideosByCategory,
  searchVideoMania,
} from "../../app/features/videomania";
import ThumbnailCard from "../../components/card/ThumbnailCard";
import { Spinner } from "../../components/theme/Loader";
import { nameElipse } from "../../utils/common/nameElipse";
import Modal from "../../components/modal/Modal";
import { AddVideoMania } from "../../services/videomania";
import Player from "../../components/player";

const VideoMania = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTop, setIsTop] = useState(false);

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
  } = useSelector((state) => state.video_mania);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  useEffect(() => {
    dispatch(getVideoCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(
            data.AllCategories[data?.AllCategories?.length - 1]
          );
        }
      });
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    dispatch(getTopVideo({ token, id: activeCategory?.id }))
      .unwrap()
      .then((data) => {
        setTopVideo(data?.topVideo[0]);
      });
  }, [activeCategory]);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;

    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchVideoMania({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setVideos(data?.Videos);
          });
      }, 300);
    } else {
      dispatch(getVideosByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setVideos(data?.data);
        });
    }

    return () => clearTimeout(timeout);
  }, [activeCategory, reload, searchQuery]);

  return (
    <Fragment>
      <Header
        title={<BreadCrumb items={[{ label: "Video Mania" }]} />}
        buttonTitle={"Add"}
        buttonIcon={FaPlus}
        onSearch={onSearch}
        onAddButtonClick={() => setAddModal(true)}
        searchBy={"name"}
      />

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
          <div className="flex justify-center items-center gap-5">
            <div
              className="top-video-card"
              onClick={() => {
                setCurrentVideo(topVideo);
                setVideoModal(true);
                setIsTop(true);
              }}
            >
              <FaPlayCircle className={`w-32 h-32 ${textColor}`} />
              <div className="text-lg">{nameElipse(topVideo?.name, 12)}</div>
            </div>

            <div className="text-sm break-words whitespace-pre-line">
              {topVideo?.description}
            </div>
          </div>
        ) : !topVideo && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Video Found
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
                    title={v?.description}
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
              No Videos Found
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
                  {video?.video_result?.Videos?.map((v) => (
                    <ThumbnailCard
                      key={v?.video_id}
                      image={v?.thumbnail}
                      title={v?.description}
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
              No Videos Found
            </div>
          ) : null}
        </div>
      )}
      {/* //** Modals  */}

      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add Video Mania"
      >
        <AddVideoMania
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Video Modal  */}
      <Player
        video={currentVideo}
        isOpen={videoModal}
        onClose={() => {
          setVideoModal(false);
          setIsTop(false);
        }}
        isTop={isTop}
      />
    </Fragment>
  );
};

export default VideoMania;
