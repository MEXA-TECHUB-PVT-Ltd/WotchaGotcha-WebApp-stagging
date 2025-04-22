import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../../components/breadcrumb";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import ThumbnailCard from "../../components/card/ThumbnailCard";
import { Spinner } from "../../components/theme/Loader";

import {
  getMondoByCategory,
  getMondoMarketCategories,
  getTopMondoMarket,
  searchMondoItem,
} from "../../app/features/mondomarket";

import { AddMondoItem, MondoDetailsViewer } from "../../services/mondomarket";
import Modal from "../../components/modal/Modal";

const MondoMarket = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [mondoModal, setMondoModal] = useState(false);
  const [reload, setReload] = useState(false);

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
    { id: "Africa", name: "Africa" },
    { id: "Europe", name: "Europe" },
    { id: "Americas", name: "Americas" },
    { id: "Asia", name: "Asia" },
    { id: "Middle East", name: "Middle East" },
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

      const results = await Promise.all(mondoItems);

      const categorizedData = mondoCategories?.map((category) => ({
        ...category,
        items: results
          .flatMap((res) => res.AllItems || [])
          .filter((item) => item?.item_category === category?.id),
      }));

      setItems(categorizedData);
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
    let timeout;
    if (mondoCategories.length > 0 && activeRegion) {
      if (searchQuery?.trim()?.length > 0) {
        timeout = setTimeout(() => {
          dispatch(searchMondoItem({ token, searchQuery }))
            .unwrap()
            .then((data) => {
              setItems(data?.letters || []);
            })
            .catch((error) => {
              console.error(error);
            });
        }, 300);
      } else {
        getItemsByCategory();
      }
    }

    return () => clearTimeout(timeout);
  }, [mondoCategories, activeRegion, searchQuery, reload]);

  return (
    <Fragment>
      {!isDashboard && (
        <Header
          title={<BreadCrumb items={[{ label: "Mondo Market" }]} />}
          buttonTitle={"Add"}
          buttonIcon={FaPlus}
          onSearch={onSearch}
          onAddButtonClick={() => setAddModal(true)}
          searchBy={"name"}
        />
      )}

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
            }}
          >
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topMondo?.images[0]?.image}
              alt={"topMondo"}
              className="video-thumbnail"
            />

            <div className="text-sm break-words whitespace-pre-line  max-w-[40%] md:max-w-[100%]">
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

      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : items?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {items?.map((item) => (
                  <ThumbnailCard
                    key={item.id}
                    image={item.images?.[0]?.image || ""}
                    title={item.title}
                    onClick={() => {
                      setCurrentMondo(item);
                      setMondoModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : items?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              No Items Found
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isFetching ? (
            <Spinner />
          ) : items?.length > 0 ? (
            items?.map((mondo) => {
              return (
                <div className="mb-5" key={mondo.id}>
                  <div className="heading">{mondo.name}</div>
                  <div className="cards-container">
                    {isMondoFetching ? (
                      <Spinner />
                    ) : mondo?.items?.length > 0 ? (
                      mondo?.items?.map((item) => (
                        <ThumbnailCard
                          key={item.id}
                          image={item.images?.[0]?.image || ""}
                          title={item.title}
                          onClick={() => {
                            setCurrentMondo(item);
                            setMondoModal(true);
                          }}
                        />
                      ))
                    ) : (
                      <div className="text-gray-400">No Items Found</div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center text-gray-400">
              No Items Found
            </div>
          )}
        </div>
      )}

      {/* //** Modals  */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title={"Add Item"}
      >
        <AddMondoItem
          setAddModal={setAddModal}
          setReload={setReload}
          dispatch={dispatch}
          regions={regions}
        />
      </Modal>

      {/* //**  Images Modal  */}

      <MondoDetailsViewer
        mondo={currentMondo}
        isOpen={mondoModal}
        onClose={() => setMondoModal(false)}
        token={token}
      />
    </Fragment>
  );
};

export default MondoMarket;
