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
  getTopSportsAndSportsLikes,
  searchSportsAndSports,
} from "../../app/features/sportsandsports";
import { AddSports, SportsPreviewer } from "../../services/sports";
import { useTranslation } from "react-i18next";

const SportsAndSports = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [addModal, setAddModal] = useState(false);
  const [sportModal, setSportModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [sports, setSports] = useState([]);

  const [topSports, setTopSports] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentSport, setCurrentSport] = useState(null);

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
    console.log(">>>>>>>>>>>>>>>>88888888888888>>>>>>>>>>>>>>>>>>>>>");
    if (!activeCategory) return;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const fetchTopSports = async () => {
      try {
        const result = await dispatch(
          getTopSportsAndSports({ token })
        ).unwrap();
        setTopSports(result.data);
        console.log("object>>", result?.data);
        // if (result?.data?.length > 0) {
      } catch (error) {
        console.error("Error fetching top sports:", error);
      }
    };

    fetchTopSports();
  }, [activeCategory]);

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
          setSports(data?.sports);
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
          title={<BreadCrumb items={[{ label: t("sportsandsports") }]} />}
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
        {isTopSportsFetching ? (
          <Spinner />
        ) : topSports ? (
          <div className="cards-container">
            {topSports?.map((sport) => (
              <div className="mb-5" key={sport?.id}>
                <div className="heading">{sport?.sub_category_name}</div>
                <ThumbnailCard
                  key={sport?.sports_id}
                  image={sport?.image}
                  title={sport?.name}
                  onClick={() => {
                    setCurrentSport(sport);
                    setSportModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : !topSports && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            {t("no-found-sports")}
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
                      setCurrentSport(pic);
                      setSportModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : sports?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-data")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isSportsFetching ? (
            <Spinner />
          ) : sports?.length > 0 ? (
            <div className="cards-container">
              {sports?.map((sport) => (
                <div className="mb-5" key={sport?.id}>
                  <div className="heading">{sport?.sub_category_name}</div>
                  <ThumbnailCard
                    key={sport?.sports_id}
                    image={sport?.image}
                    title={sport?.name}
                    onClick={() => {
                      setCurrentSport(sport);
                      setSportModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : sports?.length === 0 && !isSportsFetching ? (
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
        title={t("add-sports")}
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
        image={currentSport}
        isOpen={sportModal}
        onClose={() => {
          setSportModal(false);
        }}
      />
    </Fragment>
  );
};

export default SportsAndSports;
