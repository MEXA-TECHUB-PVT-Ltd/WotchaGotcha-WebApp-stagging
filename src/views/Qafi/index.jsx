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
  getQafiByCategory,
  getQafiCategories,
  getTopQafi,
  searchQafi,
} from "../../app/features/qafi";
import { AddQafi, QafiPreviewer } from "../../services/qafi";
const Qafi = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [qafiModal, setQafiModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [qafi, setQafi] = useState([]);

  const [topQafi, setTopQafi] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentQafi, setCurrentQafi] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isQafiFetching,
    isTopQafiFetching,
    isSearching,
  } = useSelector((state) => state.qafi);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getQafiCategories({ token }))
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
    dispatch(getTopQafi({ token }))
      .unwrap()
      .then((data) => {
        setTopQafi(data?.data);
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
        dispatch(searchQafi({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setQafi(data?.QAFIs);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getQafiByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setQafi(data?.data);
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
          title={<BreadCrumb items={[{ label: "QAFI" }]} />}
          buttonTitle={"Add"}
          buttonIcon={FaPlus}
          onSearch={onSearch}
          onAddButtonClick={() => setAddModal(true)}
          searchBy={"name"}
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

      {/* Top Qafi*/}
      <div className="flex items-center mt-10">
        {isTopQafiFetching ? (
          <Spinner />
        ) : topQafi ? (
          <div
            className="flex justify-center gap-5 items-center"
            onClick={() => {
              setCurrentQafi(topQafi);
              setQafiModal(true);
            }}
          >
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={topQafi?.image}
              alt={"topQafi"}
              className="video-thumbnail"
            />

            <div className="text-sm break-words whitespace-pre-line">
              {topQafi?.description}
            </div>
          </div>
        ) : !topQafi && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            No Top Qafi Found
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : qafi?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {qafi?.map((pic) => (
                  <ThumbnailCard
                    key={pic?.news_id}
                    image={pic?.image}
                    title={pic?.username}
                    onClick={() => {
                      setCurrentQafi(pic);
                      setQafiModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : qafi?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              No Data Found
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isQafiFetching ? (
            <Spinner />
          ) : qafi?.length > 0 ? (
            qafi?.map((qafi) => (
              <div className="mb-5" key={qafi?.id}>
                <div className="heading">
                  {qafi?.sub_category_name || "Others"}
                </div>
                <div className="cards-container">
                  {qafi?.QAFI_result?.QAFIs?.length > 0 ? (
                    qafi?.QAFI_result?.QAFIs?.map((qafi) => (
                      <ThumbnailCard
                        key={qafi?.news_id}
                        image={qafi?.image}
                        title={qafi?.username}
                        onClick={() => {
                          setCurrentQafi(qafi);
                          setQafiModal(true);
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
          ) : qafi?.length === 0 && !isQafiFetching ? (
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
        title="Add Qafi"
      >
        <AddQafi
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Image Modal  */}
      <QafiPreviewer
        image={currentQafi}
        isOpen={qafiModal}
        onClose={() => {
          setQafiModal(false);
        }}
      />
    </Fragment>
  );
};

export default Qafi;
