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
  getPicTourByCategory,
  getPicTourCategories,
  getTopPicTour,
} from "../../app/features/pictours";
import { AddPicTour } from "../../services/pictours";
import ImagePreviewer from "../../components/imagePreviewer";

const PicTours = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [picTourModal, setPicTourModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const [picTours, setPicTours] = useState([]);

  const [topPicTour, setTopPicTour] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPicTour, setCurrentPicTour] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { categories, isFetching, isTopPicTourFetching, isPicTourFetching } =
    useSelector((state) => state.pictours);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  useEffect(() => {
    dispatch(getPicTourCategories({ token }))
      .unwrap()
      .then((data) => {
        if (data?.AllCategories?.length > 0) {
          setActiveCategory(data.AllCategories[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (activeCategory) {
      dispatch(getTopPicTour({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setTopPicTour(data?.topTour[0]);
        });

      dispatch(getPicTourByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setPicTours(data?.data);
        });
    }
  }, [activeCategory, reload]);

  return (
    <Fragment>
      <Header
        title={<BreadCrumb items={[{ label: "Pic Tours" }]} />}
        buttonTitle={"Add"}
        buttonIcon={FaPlus}
        onSearch={onSearch}
        onAddButtonClick={() => setAddModal(true)}
        searchBy={"name"}
      />

      {/* All Categories */}

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
              } px-2 py-1 rounded-md  cursor-pointer min-w-fit`}
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
            </div>
          ))
        )}
      </div>

      {/* Top PicTour*/}
      <div className="flex items-center mt-10">
        {isTopPicTourFetching ? (
          <Spinner />
        ) : topPicTour ? (
          <div
            className="flex justify-center items-center gap-5"
            onClick={() => {
              setCurrentPicTour(topPicTour);
              setPicTourModal(true);
              setIsTop(true);
            }}
          >
            <img
              src={topPicTour?.image}
              alt={"topPicTour"}
              className="video-thumbnail"
            />

            <div className="text-sm break-words whitespace-pre-line">
              {topPicTour?.description}
            </div>
          </div>
        ) : !topPicTour && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Pic Tour Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      <div className="mt-10">
        {isPicTourFetching ? (
          <Spinner />
        ) : picTours?.length > 0 ? (
          picTours?.map((pictour) => (
            <div className="mb-5">
              <div className="heading">{pictour?.sub_category_name}</div>
              <div className="video-card-container">
                {pictour?.tour_result?.Tours?.map((pictour) => (
                  <ThumbnailCard
                    id={pictour?.id}
                    image={pictour?.image}
                    title={pictour?.name}
                    onClick={() => {
                      setCurrentPicTour(pictour);
                      setPicTourModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        ) : picTours?.length === 0 && !isPicTourFetching ? (
          <div className="flex justify-center text-gray-400">
            No Pic Tours Found
          </div>
        ) : null}
      </div>

      {/* //** Modals  */}

      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add Pic Tour"
      >
        <AddPicTour
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <ImagePreviewer
        image={currentPicTour}
        isOpen={picTourModal}
        onClose={() => {
          setPicTourModal(false);
          setIsTop(false);
        }}
        isTop={isTop}
      />
    </Fragment>
  );
};

export default PicTours;
