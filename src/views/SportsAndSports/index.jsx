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
  getSportsAndSportsByCategory,
  getSportsAndSportsCategories,
  getTopSportsAndSports,
  searchSportsAndSports,
} from "../../app/features/sportsandsports";
import { AddSports, SportsPreviewer } from "../../services/sports";

const SportsAndSports = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [picTourModal, setPicTourModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const [sports, setSports] = useState([]);

  const [topSports, setTopSports] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPicTour, setCurrentPicTour] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isTopSportsFetching,
    isSportsFetching,
    isSearching,
  } = useSelector((state) => state.sportsandsports);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getSportsAndSportsCategories({ token }))
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
    dispatch(getTopSportsAndSports({ token }))
      .unwrap()
      .then((data) => {
        setTopSports(data?.data);
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
        dispatch(searchSportsAndSports({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setSports(data?.sports);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getSportsAndSportsByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setSports(data?.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => clearTimeout(timeout);
  }, [activeCategory, reload, searchQuery]);

  return (
    <Fragment>
      <Header
        title={<BreadCrumb items={[{ label: "Sports & Sports" }]} />}
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
        {isTopSportsFetching ? (
          <Spinner />
        ) : topSports ? (
          <div
            className="flex justify-center items-center gap-5"
            onClick={() => {
              setCurrentPicTour(topSports);
              setPicTourModal(true);
              setIsTop(true);
            }}
          >
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topSports?.image}
              alt={"topSports"}
              className="video-thumbnail"
            />

            <div className="text-sm break-words whitespace-pre-line">
              {topSports?.description}
            </div>
          </div>
        ) : !topSports && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Sports Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : sports?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {sports?.map((pic) => (
                  <ThumbnailCard
                    key={pic?.sports_id}
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
          ) : sports?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              No Data Found
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isSportsFetching ? (
            <Spinner />
          ) : sports?.length > 0 ? (
            sports?.map((sport) => (
              <div className="mb-5" key={sport?.id}>
                <div className="heading">{sport?.sub_category_name}</div>
                <div className="cards-container">
                  {sport?.Sport_result?.Sports?.length > 0 ? (
                    sport?.Sport_result?.Sports?.map((pic) => (
                      <ThumbnailCard
                        key={pic?.sports_id}
                        image={pic?.image}
                        title={pic?.name}
                        onClick={() => {
                          setCurrentPicTour(pic);
                          setPicTourModal(true);
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
          ) : sports?.length === 0 && !isSportsFetching ? (
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
        title="Add Sports"
      >
        <AddSports
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <SportsPreviewer
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

export default SportsAndSports;
