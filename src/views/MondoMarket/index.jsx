import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";

import ThumbnailCard from "../../components/card/ThumbnailCard";
import { Spinner } from "../../components/theme/Loader";
import Modal from "../../components/modal/Modal";
import ImagePreviewer, { AddPicTour } from "../../services/pictours";
import {
  getMondoByCategory,
  getMondoMarketCategories,
  getTopMondoMarket,
} from "../../app/features/mondomarket";

const MondoMarket = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [mondoModal, setMondoModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const [mondoCategories, setMondoCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [topMondo, setTopMondo] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [currentMondo, setCurrentMondo] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { isFetching, isTopFetching, isMondoFetching, isSearching } =
    useSelector((state) => state.mondomarket);

  const regions = [
    { id: 1, name: "Africa" },
    { id: 2, name: "Europe" },
    { id: 3, name: "Americas" },
    { id: 4, name: "Asia" },
    { id: 5, name: "Middle East" },
  ];

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  const getItemsByCategory = async () => {
    try {
      const mondoItems = mondoCategories?.map((category) =>
        dispatch(
          getMondoByCategory({
            token,
            id: category.id,
            region: activeRegion?.name,
          })
        ).unwrap()
      );

      const result = await Promise.all(mondoItems);

      setItems(result[0]?.AllItems || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ** Hooks ---

  useEffect(() => {
    setActiveRegion(regions[0]);
  }, []);

  useEffect(() => {
    dispatch(getTopMondoMarket({ token }))
      .unwrap()
      .then((data) => {
        setTopMondo(data?.AllItems[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    dispatch(getMondoMarketCategories({ token }))
      .unwrap()
      .then((data) => {
        setMondoCategories(data?.AllCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!activeRegion) return;

    getItemsByCategory();
  }, [activeRegion]);

  return (
    <Fragment>
      <Header
        title={<BreadCrumb items={[{ label: "Mondo Market" }]} />}
        buttonTitle={"Add"}
        buttonIcon={FaPlus}
        onSearch={onSearch}
        onAddButtonClick={() => setAddModal(true)}
        searchBy={"name"}
      />

      {/* All Regions */}
      <div className="flex items-center gap-5 overflow-x-auto flex-1 scrollbar-hidden">
        {regions?.map((region) => (
          <div
            key={region.id}
            className={` ${
              activeRegion?.name === region?.name
                ? `${bgColor} text-white`
                : "border border-gray-300 text-dark_bg_5 dark:text-dark_text_1"
            } px-2 py-1 rounded-md  cursor-pointer min-w-fit`}
            onClick={() => setActiveRegion(region)}
          >
            {region.name}
          </div>
        ))}
      </div>

      {/* Top Mondo Market*/}
      <div className="flex items-center mt-10">
        {isTopFetching ? (
          <Spinner />
        ) : topMondo ? (
          <div
            className="flex justify-center items-center gap-5"
            onClick={() => {
              setCurrentMondo(topMondo);
              setMondoModal(true);
              setIsTop(true);
            }}
          >
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topMondo?.images[0]?.image}
              alt={"topMondo"}
              className="video-thumbnail"
            />

            <div className="text-sm break-words whitespace-pre-line">
              {topMondo?.description}
            </div>
          </div>
        ) : !topMondo && !isTopFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Mondo Market Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Data */}

      <div className="mt-10">
        {isFetching ? (
          <Spinner />
        ) : mondoCategories?.length > 0 ? (
          mondoCategories?.map((mondo) => (
            <div className="mb-5" key={mondo?.id}>
              <div className="heading">{mondo?.name}</div>
              <div className="cards-container">
                {isMondoFetching ? (
                  <Spinner />
                ) : (
                  items?.map((item) => (
                    <ThumbnailCard
                      key={item?.tour_id}
                      image={item?.images[0]?.image}
                      title={item?.title}
                      onClick={() => {
                        setCurrentMondo(item);
                        setMondoModal(true);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          ))
        ) : mondoCategories?.length === 0 && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Items Found
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
          categoryId={activeRegion?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <ImagePreviewer
        image={currentMondo}
        isOpen={mondoModal}
        onClose={() => {
          setMondoModal(false);
          setIsTop(false);
        }}
        isTop={isTop}
      />
    </Fragment>
  );
};

export default MondoMarket;
