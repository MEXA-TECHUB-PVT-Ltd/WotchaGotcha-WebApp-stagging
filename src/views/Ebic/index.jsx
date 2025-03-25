import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../components/theme/Loader";
import Modal from "../../components/modal/Modal";

import { AddEbic, EbicPreviewer } from "../../services/ebic";
import {
  getEbicCategories,
  getTopEbic,
  getEbicByCategory,
  searchEbic,
} from "../../app/features/ebic";
import EmojiCard from "../../components/card/EmojiCard";

const Ebic = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [ebicModal, setEbicModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [ebic, setEbic] = useState([]);

  const [topEbic, setTopEbic] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentEbic, setCurrentEbic] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isEbicFetching,
    isTopEbicFetching,
    isSearching,
  } = useSelector((state) => state.ebic);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getEbicCategories({ token }))
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
    dispatch(getTopEbic({ token }))
      .unwrap()
      .then((data) => {
        setTopEbic(data?.data);
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
        dispatch(searchEbic({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setEbic(data?.GEBCs);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getEbicByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setEbic(data?.data);
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
        title={<BreadCrumb items={[{ label: "EBIC" }]} />}
        buttonTitle={"Add"}
        buttonIcon={FaPlus}
        onSearch={onSearch}
        onAddButtonClick={() => setAddModal(true)}
        searchBy={"name"}
      />

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

      {/* Top EBIC*/}
      <div className="flex items-center mt-10">
        {isTopEbicFetching ? (
          <Spinner />
        ) : topEbic ? (
          <div
            className="flex justify-center gap-5 items-center"
            onClick={() => {
              setCurrentEbic(topEbic);
              setEbicModal(true);
            }}
          >
            <div className="video-thumbnail flex justify-center items-center">
              <span className="text-5xl">{topEbic?.image}</span>
            </div>

            <div className="text-sm break-words whitespace-pre-line">
              {topEbic?.description}
            </div>
          </div>
        ) : !topEbic && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Ebic Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : ebic?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {ebic?.map((pic) => (
                  <EmojiCard
                    key={pic?.news_id}
                    image={pic?.image}
                    title={pic?.username}
                    onClick={() => {
                      setCurrentEbic(pic);
                      setEbicModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : ebic?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              No Data Found
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isEbicFetching ? (
            <Spinner />
          ) : ebic?.length > 0 ? (
            ebic?.map((ebic) => (
              <div className="mb-5" key={ebic?.id}>
                <div className="heading">
                  {ebic?.sub_category_name || "Others"}
                </div>
                <div className="cards-container">
                  {ebic?.GEBC_result?.GEBCs?.length > 0 ? (
                    ebic?.GEBC_result?.GEBCs?.map((ebic) => (
                      <EmojiCard
                        key={ebic?.news_id}
                        image={ebic?.image}
                        title={ebic?.username}
                        onClick={() => {
                          setCurrentEbic(ebic);
                          setEbicModal(true);
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
          ) : ebic?.length === 0 && !isEbicFetching ? (
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
        title="Add Ebic"
      >
        <AddEbic
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <EbicPreviewer
        image={currentEbic}
        isOpen={ebicModal}
        onClose={() => {
          setEbicModal(false);
        }}
      />
    </Fragment>
  );
};

export default Ebic;
