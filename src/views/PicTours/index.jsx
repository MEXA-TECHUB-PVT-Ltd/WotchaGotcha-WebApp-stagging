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
  getTopPicTourLikesComments,
  searchPicTour,
} from "../../app/features/pictours";
import { AddPicTour, PicTourPreviewer } from "../../services/pictours";
import { useTranslation } from "react-i18next";

const PicTours = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
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
  const {
    categories,
    isFetching,
    isTopPicTourFetching,
    isPicTourFetching,
    isSearching,
  } = useSelector((state) => state.pictours);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getPicTourCategories({ token }))
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
    if (!activeCategory) return;

    const fetchTopTour = async () => {
      try {
        const result = await dispatch(
          getTopPicTour({ token, id: activeCategory.id })
        ).unwrap();

        if (false) {
          // if (result?.topTour?.length > 0) {
          setTopPicTour(result.topTour[0]);
        } else {
          // fallback if empty
          const fallback = await dispatch(
            getTopPicTourLikesComments({ token, id: activeCategory.id })
          ).unwrap();
          console.log("fallback>>>", fallback);

          if (fallback?.data) {
            setTopPicTour(fallback.data);
          }
        }
      } catch (error) {
        console.error("Error fetching top tour:", error);
      }
    };

    fetchTopTour();
  }, [activeCategory]);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;
    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchPicTour({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setPicTours(
              data?.Tours?.map((tour) => ({
                ...tour,
                tour_id: tour?.pic_tour_id,
              })) || []
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getPicTourByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          console.log("Data>>>", data);

          setPicTours(data?.Tours);
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
          title={<BreadCrumb items={[{ label: t("pic-tours") }]} />}
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
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topPicTour?.image}
              alt={"topPicTour"}
              className="video-thumbnail"
            />

            <div className="long-desc">{topPicTour?.description}</div>
          </div>
        ) : !topPicTour && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            {t("noTourFound")}
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : picTours?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {picTours?.map((pic) => (
                  <ThumbnailCard
                    key={pic?.tour_id}
                    image={pic?.image}
                    title={pic?.name}
                    onClick={() => {
                      setCurrentPicTour(pic);
                      setPicTourModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : picTours?.Tours?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-data")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isPicTourFetching ? (
            <Spinner />
          ) : picTours?.length > 0 ? (
            picTours?.map((pictour) => (
              <div className="mb-5" key={pictour?.id}>
                <div className="heading">{pictour?.sub_category_name}</div>
                <div className="cards-container">
                  <ThumbnailCard
                    key={pictour?.tour_id}
                    image={pictour?.image}
                    title={pictour?.name}
                    onClick={() => {
                      setCurrentPicTour(pictour);
                      setPicTourModal(true);
                    }}
                  />
                </div>
              </div>
            ))
          ) : picTours?.length === 0 && !isPicTourFetching ? (
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
        title={t("add-pic-tour")}
      >
        <AddPicTour
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <PicTourPreviewer
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
