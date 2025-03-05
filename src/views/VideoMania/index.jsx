import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopVideo,
  getVideoCategories,
  getVideosByCategory,
} from "../../app/features/videomania";
import VideoCard from "../../components/card/VideoCard";
import { Spinner } from "../../components/theme/Loader";
import videoIcon from "../../assets/videoIcon.svg";
import { nameElipse } from "../../utils/common/nameElipse";
import Modal from "../../components/modal/Modal";
import { AddVideoMania } from "../../services/videomania";
import Player from "../../components/player";

const VideoMania = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [videos, setVideos] = useState([]);

  const [topVideo, setTopVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { categories, isFetching, isVideoFetching, isTopVideoFetching } =
    useSelector((state) => state.video_mania);

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
    if (activeCategory) {
      dispatch(getTopVideo({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setTopVideo(data?.topVideo[0]);
        });

      dispatch(getVideosByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setVideos(data?.data);
        });
    }
  }, [activeCategory, reload]);

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

      <div className="flex items-center gap-5">
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
              } px-2 py-1 rounded-md  cursor-pointer`}
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
            </div>
          ))
        )}
      </div>

      {/* Top Video*/}
      <div className="flex items-center mt-10">
        {isTopVideoFetching ? (
          <Spinner />
        ) : topVideo ? (
          <div className="flex justify-center items-center gap-5">
            <div className="border border-gray-200 p-2 rounded-md">
              <img src={videoIcon} className="w-32 h-28 overflow-hidden" />
              <div className="text-lg">{nameElipse(topVideo?.name, 12)}</div>
            </div>

            <div>
              <div className="text-sm">{topVideo?.description}</div>
            </div>
          </div>
        ) : !topVideo && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Video Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their videos */}
      <div className="mt-10">
        {isVideoFetching ? (
          <Spinner />
        ) : videos?.length > 0 ? (
          videos?.map((video) => (
            <div className="mb-5">
              <div className="heading">{video?.sub_category_name}</div>
              <div className="video-card-container">
                {video?.video_result?.Videos?.map((video) => (
                  <VideoCard
                    video={video}
                    onClick={() => {
                      setCurrentVideo(video);
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
        onClose={() => setVideoModal(false)}
      />
    </Fragment>
  );
};

export default VideoMania;
