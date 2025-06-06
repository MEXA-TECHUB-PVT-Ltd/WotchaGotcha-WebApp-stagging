import React, { Fragment, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header";
import { handleSearch } from "../../utils/common/fetchDataHelpers";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../components/theme/Loader";
import Modal from "../../components/modal/Modal";

import { AddOpenLetter, OpenLetterPreviewer } from "../../services/openletters";
import {
  getLetterByCategory,
  getLetterCategories,
  getTopLetter,
  searchLetters,
} from "../../app/features/openletters";
import LetterCard from "../../components/card/LetterCard";
import { useTranslation } from "react-i18next";

const OpenLetters = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [addModal, setAddModal] = useState(false);
  const [letterModal, setLetterModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [letters, setLetters] = useState([]);

  const [topLetter, setTopLetter] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentLetter, setCurrentLetter] = useState(null);

  // ** Redux ---
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const {
    categories,
    isFetching,
    isTopLetterFetching,
    isLetterFetching,
    isSearching,
  } = useSelector((state) => state.openletter);

  // ** Methods ---
  const onSearch = useCallback(handleSearch(setSearchQuery), [searchQuery]);

  // ** Hooks ---

  useEffect(() => {
    dispatch(getLetterCategories({ token }))
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
    dispatch(getTopLetter({ token }))
      .unwrap()
      .then((data) => {
        setTopLetter(data?.letters);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeCategory]);

  useEffect(() => {
    if (!activeCategory) return;

    let timeout;
    if (searchQuery?.trim()?.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchLetters({ token, searchQuery }))
          .unwrap()
          .then((data) => {
            setLetters(data?.letters);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 300);
    } else {
      dispatch(getLetterByCategory({ token, id: activeCategory?.id }))
        .unwrap()
        .then((data) => {
          setLetters(data?.letters);
          console.log(">>>>>", data);
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
          title={<BreadCrumb items={[{ label: t("openLetters") }]} />}
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

      {/* Top Letter*/}
      <div className="flex items-center mt-10">
        {isTopLetterFetching ? (
          <Spinner />
        ) : topLetter ? (
          <div className="mb-5">
            <div className="cards-container">
              {topLetter?.map((letter) => (
                <LetterCard
                  userImage={letter?.userimage}
                  date={letter?.post_date}
                  subject={letter?.subject_place}
                  address={letter?.address}
                  signImage={letter?.signature_image}
                  onClick={() => {
                    setCurrentLetter(letter);
                    setLetterModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : !topLetter && !isFetching ? (
          <div className="flex justify-center text-gray-400">
            {t("noTopLetterFound")}
          </div>
        ) : null}
      </div>

      {/* Sub Categories and their Pic */}
      {searchQuery?.trim()?.length > 0 ? (
        <div className="mt-10">
          {isSearching ? (
            <Spinner />
          ) : letters?.length > 0 ? (
            <div className="mb-5">
              <div className="cards-container">
                {letters?.map((letter) => (
                  <LetterCard
                    userImage={letter?.userimage}
                    date={letter?.post_date}
                    subject={letter?.subject_place}
                    address={letter?.address}
                    signImage={letter?.signature_image}
                    onClick={() => {
                      setCurrentLetter(letter);
                      setLetterModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : letters?.length === 0 && !isSearching ? (
            <div className="flex justify-center text-gray-400">
              {t("no-found-data")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10">
          {isLetterFetching ? (
            <Spinner />
          ) : letters?.length > 0 ? (
            letters?.map((letter) => (
              <div className="mb-5" key={letter?.id}>
                <div className="heading">{letter?.sub_category_name}</div>
                <div className="cards-container">
                  {letters?.map((letter) => (
                    <LetterCard
                      userImage={letter?.userimage}
                      date={letter?.post_date}
                      subject={letter?.subject_place}
                      address={letter?.address}
                      signImage={letter?.signature_image}
                      onClick={() => {
                        setCurrentLetter(letter);
                        setLetterModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : letters?.length === 0 && !isLetterFetching ? (
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
        title={t("addLetter")}
      >
        <AddOpenLetter
          setAddModal={setAddModal}
          dispatch={dispatch}
          setReload={setReload}
          categoryId={activeCategory?.id}
        />
      </Modal>

      {/* //**  Previewer Modal  */}
      <OpenLetterPreviewer
        letter={currentLetter}
        isOpen={letterModal}
        onClose={() => {
          setLetterModal(false);
        }}
      />
    </Fragment>
  );
};

export default OpenLetters;
