import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import {
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearch,
} from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";
import { getVideoCategories, getVideosByCategory } from "../../app/features/videomania";
import { use } from "react";
import VideoCard from "../../components/card/VideoCard";

const VideoMania = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentId, setCurrentId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [videos, setVideos] = useState([]);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.video_mania);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  useEffect(() => {
    dispatch(getVideoCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(data.AllCategories[data?.AllCategories?.length - 1]);
        }
      });
  }, []);

  useEffect(() => {
    if (activeCategory) {
      dispatch(getVideosByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setVideos(data?.data);
        });
    }
  }, [activeCategory]);

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

      <div className="flex items-center gap-5">
        {categories?.AllCategories?.map((category) => (
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
        ))}
      </div>

      <div className="mt-10">
        {videos?.length > 0 &&
          videos?.map((video) => (
            <div className="mb-5">
              <div className="heading">{video?.sub_category_name}</div>
              <div className="video-card-container">
                {video?.video_result?.Videos?.map((video) => (
                  <VideoCard video={video} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default VideoMania;
