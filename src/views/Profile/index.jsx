import React, { useEffect, useState } from "react";
import { CountCard, ImageCard } from "../../services/profile";
import { useDispatch, useSelector } from "react-redux";
import { getVideosByUser } from "../../app/features/videomania";
import { getPicTourByUser } from "../../app/features/pictours";
import { getOnNewsByUser } from "../../app/features/onnews";
import { getLetterByUser } from "../../app/features/openletters";
import { getQafiByUser } from "../../app/features/qafi";
import { getEbicByUser } from "../../app/features/ebic";
import { getSportsAndSportsByUser } from "../../app/features/sportsandsports";
import { getCinematicByUser } from "../../app/features/cinematic";
import { getFanStarByUser } from "../../app/features/fanstarzone";
import { getKidVidsByUser } from "../../app/features/kidvids";
import { getTvProgmaxByUser } from "../../app/features/tvprogmax";
import { getLearningHobbiesByUser } from "../../app/features/learningandhobbies";
import { getMondoByUser } from "../../app/features/mondomarket";
import ThumbnailCard from "../../components/card/ThumbnailCard";
import LetterCard from "../../components/card/LetterCard";
import EmojiCard from "../../components/card/EmojiCard";
import {
  DeleteVideoMania,
  EditVideoMania,
  VideoManiaPlayer,
} from "../../services/videomania";
import {
  DeletePicTour,
  EditPicTour,
  PicTourPreviewer,
} from "../../services/pictours";
import {
  DeleteOpenLetter,
  EditOpenLetter,
  OpenLetterPreviewer,
} from "../../services/openletters";
import { DeleteNews, EditNews, NewsPreviewer } from "../../services/news";
import { DeleteQafi, EditQafi, QafiPreviewer } from "../../services/qafi";
import { DeleteEbic, EbicPreviewer, EditEbic } from "../../services/ebic";
import {
  DeleteSport,
  EditSports,
  SportsPreviewer,
} from "../../services/sports";
import {
  CinematicPlayer,
  DeleteCinematic,
  EditCinematic,
} from "../../services/cinematic";
import {
  DeleteFanStar,
  EditFanStar,
  FanStarPlayer,
} from "../../services/fanstarzone";
import {
  DeleteKidVids,
  EditKidVids,
  KidVidsPlayer,
} from "../../services/kidvids";
import {
  DeleteTvProgMax,
  EditTvProgmax,
  TvProgmaxPlayer,
} from "../../services/tvprogmax";
import {
  DeleteLearningHobbies,
  EditLearningHobbies,
  LearningHobbiesPlayer,
} from "../../services/learninghobbies";
import {
  DeleteMondo,
  EditMondoItem,
  MondoDetailsViewer,
} from "../../services/mondomarket";
import Modal from "../../components/modal/Modal";
import { use } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const [reload, setReload] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentPicTour, setCurrentPicTour] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [currentQafi, setCurrentQafi] = useState(null);
  const [currentEbic, setCurrentEbic] = useState(null);
  const [currentSports, setCurrentSports] = useState(null);
  const [currentCinematic, setCurrentCinematic] = useState(null);
  const [currentFanStar, setCurrentFanStar] = useState(null);
  const [currentKidVids, setCurrentKidVids] = useState(null);
  const [currentTvProgMax, setCurrentTvProgMax] = useState(null);
  const [currentLearningHobbies, setCurrentLearningHobbies] = useState(null);
  const [currentMondoMarket, setCurrentMondoMarket] = useState(null);

  const [videos, setVideos] = useState([]);
  const [picTours, setPicTours] = useState([]);
  const [news, setNews] = useState([]);
  const [letters, setLetters] = useState([]);
  const [qafi, setQafi] = useState([]);
  const [ebic, setEbic] = useState([]);
  const [sports, setSports] = useState([]);
  const [cinematics, setCinematics] = useState([]);
  const [mondomarket, setMondoMarket] = useState([]);
  const [fanstarzone, setFanStarZone] = useState([]);
  const [kidvids, setKidVids] = useState([]);
  const [tvprogmax, setTvProgMax] = useState([]);
  const [learningandhobbies, setLearningAndHobbies] = useState([]);

  const [videoManiaModal, setVideoManiaModal] = useState(false);
  const [picTourModal, setPicTourModal] = useState(false);
  const [newsModal, setNewsModal] = useState(false);
  const [letterModal, setLetterModal] = useState(false);
  const [qafiModal, setQafiModal] = useState(false);
  const [ebicModal, setEbicModal] = useState(false);
  const [sportsAndSportsModal, setSportsAndSportsModal] = useState(false);
  const [cinematicModal, setCinematicModal] = useState(false);
  const [fanstarzoneModal, setFanStarZoneModal] = useState(false);
  const [kidvidsModal, setKidVidsModal] = useState(false);
  const [tvprogmaxModal, setTvProgMaxModal] = useState(false);
  const [learningandhobbiesModal, setLearningAndHobbiesModal] = useState(false);
  const [mondomarketModal, setMondoMarketModal] = useState(false);

  const [deleteVideoModal, setDeleteVideoModal] = useState(false);
  const [deletePicTourModal, setDeletePicTourModal] = useState(false);
  const [deleteNewsModal, setDeleteNewsModal] = useState(false);
  const [deleteLetterModal, setDeleteLetterModal] = useState(false);
  const [deleteQafiModal, setDeleteQafiModal] = useState(false);
  const [deleteEbicModal, setDeleteEbicModal] = useState(false);
  const [deleteSportsModal, setDeleteSportsModal] = useState(false);
  const [deleteCinematicModal, setDeleteCinematicModal] = useState(false);
  const [deleteFanStarModal, setDeleteFanStarModal] = useState(false);
  const [deleteKidVidsModal, setDeleteKidVidsModal] = useState(false);
  const [deleteTvProgMaxModal, setDeleteTvProgMaxModal] = useState(false);
  const [deleteLearningModal, setDeleteLearningModal] = useState(false);
  const [deleteMondoMarketModal, setDeleteMondoMarketModal] = useState(false);

  const [editVideoModal, setEditVideoModal] = useState(false);
  const [editPicTourModal, setEditPicTourModal] = useState(false);
  const [editNewsModal, setEditNewsModal] = useState(false);
  const [editLetterModal, setEditLetterModal] = useState(false);
  const [editQafiModal, setEditQafiModal] = useState(false);
  const [editEbicModal, setEditEbicModal] = useState(false);
  const [editSportsModal, setEditSportsModal] = useState(false);
  const [editCinematicModal, setEditCinematicModal] = useState(false);
  const [editFanStarModal, setEditFanStarModal] = useState(false);
  const [editKidVidsModal, setEditKidVidsModal] = useState(false);
  const [editTvProgMaxModal, setEditTvProgMaxModal] = useState(false);
  const [editLearningModal, setEditLearningModal] = useState(false);
  const [editMondoMarketModal, setEditMondoMarketModal] = useState(false);

  const resetStates = () => {
    setCurrentVideo(null);
    setCurrentPicTour(null);
    setCurrentNews(null);
    setCurrentLetter(null);
    setCurrentQafi(null);
    setCurrentEbic(null);
    setCurrentSports(null);
    setCurrentCinematic(null);
    setCurrentFanStar(null);
    setCurrentKidVids(null);
    setCurrentTvProgMax(null);
    setCurrentLearningHobbies(null);
    setCurrentMondoMarket(null);
  };

  const fetchProfileData = async () => {
    if (!token || !user) return;

    try {
      const videoData = await dispatch(
        getVideosByUser({ token, id: user?.id })
      ).unwrap();
      setVideos(videoData);

      const picTourData = await dispatch(
        getPicTourByUser({ token, id: user?.id })
      ).unwrap();
      setPicTours(picTourData);

      const newsData = await dispatch(
        getOnNewsByUser({ token, id: user?.id })
      ).unwrap();
      setNews(newsData);

      const lettersData = await dispatch(
        getLetterByUser({ token, id: user?.id })
      ).unwrap();
      setLetters(lettersData);

      const qafiData = await dispatch(
        getQafiByUser({ token, id: user?.id })
      ).unwrap();
      setQafi(qafiData);

      const ebicData = await dispatch(
        getEbicByUser({ token, id: user?.id })
      ).unwrap();
      setEbic(ebicData);

      const sportsData = await dispatch(
        getSportsAndSportsByUser({ token, id: user?.id })
      ).unwrap();
      setSports(sportsData);

      const cinematicData = await dispatch(
        getCinematicByUser({ token, id: user?.id })
      ).unwrap();
      setCinematics(cinematicData);

      const fanStarZoneData = await dispatch(
        getFanStarByUser({ token, id: user?.id })
      ).unwrap();
      setFanStarZone(fanStarZoneData);

      const kidsVidsData = await dispatch(
        getKidVidsByUser({ token, id: user?.id })
      ).unwrap();
      setKidVids(kidsVidsData);

      const tvProgMaxData = await dispatch(
        getTvProgmaxByUser({ token, id: user?.id })
      ).unwrap();
      setTvProgMax(tvProgMaxData);

      const learningAndHobbiesData = await dispatch(
        getLearningHobbiesByUser({ token, id: user?.id })
      ).unwrap();
      setLearningAndHobbies(learningAndHobbiesData);

      const mondomarketData = await dispatch(
        getMondoByUser({ token, id: user?.id })
      ).unwrap();
      setMondoMarket(mondomarketData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [token, user?.id, reload]);

  const countCardData = [
    { id: 1, total: videos?.totalVideos || 0, title: "Video Mania" },
    { id: 2, total: picTours?.totalTours || 0, title: "Pic Tours" },
    { id: 3, total: news?.totalNews || 0, title: "On-News" },
    { id: 4, total: letters?.totalLetters || 0, title: "Open Letters" },
    { id: 5, total: qafi?.totalQAFIs || 0, title: "QAFI" },
    { id: 6, total: ebic?.totalGEBCs || 0, title: "EBIC" },
    { id: 7, total: sports?.totalSports || 0, title: "Sports & Sports" },
    { id: 8, total: cinematics?.totalVideos || 0, title: "Cinematics" },
    { id: 9, total: fanstarzone?.totalVideos || 0, title: "Fans Stars Zone" },
    { id: 10, total: kidvids?.totalVideos || 0, title: "Kid Vids" },
    { id: 11, total: tvprogmax?.totalVideos || 0, title: "TV Progmax" },
    {
      id: 12,
      total: learningandhobbies?.totalVideos || 0,
      title: "Learning & Hobbies",
    },
    { id: 13, total: mondomarket?.totalItems || 0, title: "Mondo Market" },
  ];

  return (
    <div className="w-full px-5 mt-3">
      <ImageCard
        image={user?.image}
        title={user?.username}
        Title={user?.email}
      />

      {/* ----------------------------------------------- */}
      {/* Counts of all modules */}
      {/* ----------------------------------------------- */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {countCardData?.map((item) => (
          <CountCard key={item.id} count={item.total} title={item.title} />
        ))}
      </div>

      {/* ----------------------------------------------- */}
      {/* Video Mania */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Video Mania</div>
        <div className="cards-container">
          {videos?.Videos?.map((v) => (
            <ThumbnailCard
              key={v?.video_id}
              for_modify={true}
              image={v?.thumbnail}
              title={v?.description}
              onEdit={() => {
                setCurrentVideo(v);
                setEditVideoModal(true);
              }}
              onDelete={() => {
                setCurrentVideo(v);
                setDeleteVideoModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentVideo(v);
                setVideoManiaModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Pic Tours */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Pic Tours</div>
        <div className="cards-container">
          {picTours?.Tours?.map((p) => (
            <ThumbnailCard
              key={p?.pic_tour_id}
              image={p?.image}
              for_modify={true}
              onEdit={() => {
                setCurrentPicTour(p);
                setEditPicTourModal(true);
              }}
              onDelete={() => {
                setCurrentPicTour(p);
                setDeletePicTourModal(true);
              }}
              title={p?.description}
              onClick={() => {
                resetStates();
                setCurrentPicTour({ ...p, tour_id: p.pic_tour_id });
                setPicTourModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Open Letters */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Open Letters</div>
        <div className="cards-container">
          {letters?.AllLetter?.map((letter) => (
            <LetterCard
              key={letter?.post_id}
              userImage={letter?.userimage}
              date={letter?.post_date}
              subject={letter?.subject_place}
              address={letter?.address}
              signImage={letter?.signature_image}
              for_modify={true}
              onDelete={() => {
                setCurrentLetter(letter);
                setDeleteLetterModal(true);
              }}
              onEdit={() => {
                setCurrentLetter(letter);
                setEditLetterModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentLetter(letter);
                setLetterModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* On-News */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My On-News</div>
        <div className="cards-container">
          {news?.News?.map((n) => (
            <ThumbnailCard
              key={n?.news_id}
              image={n?.image}
              for_modify={true}
              title={n?.description}
              onDelete={() => {
                setCurrentNews(n);
                setDeleteNewsModal(true);
              }}
              onEdit={() => {
                setCurrentNews(n);
                setEditNewsModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentNews(n);
                setNewsModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* QAFI */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My QAFI</div>
        <div className="cards-container">
          {qafi?.QAFIs?.map((q) => (
            <ThumbnailCard
              key={q?.qafi_id}
              image={q?.image}
              for_modify={true}
              title={q?.description}
              onDelete={() => {
                setCurrentQafi(q);
                setDeleteQafiModal(true);
              }}
              onEdit={() => {
                setCurrentQafi(q);
                setEditQafiModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentQafi(q);
                setQafiModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* EBIC */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My EBIC</div>
        <div className="cards-container">
          {ebic?.GEBCs?.map((e) => (
            <EmojiCard
              key={e?.gebc_id}
              image={e?.image}
              for_modify={true}
              title={e?.description}
              onDelete={() => {
                setCurrentEbic(e);
                setDeleteEbicModal(true);
              }}
              onEdit={() => {
                setCurrentEbic(e);
                setEditEbicModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentEbic(e);
                setEbicModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Sports */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Sports</div>
        <div className="cards-container">
          {sports?.sports?.map((p) => (
            <ThumbnailCard
              key={p?.sport_id}
              image={p?.image}
              for_modify={true}
              title={p?.description}
              onDelete={() => {
                setCurrentSports(p);
                setDeleteSportsModal(true);
              }}
              onEdit={() => {
                setCurrentSports(p);
                setEditSportsModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentSports(p);
                setSportsAndSportsModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Cinematics */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Cinematic</div>
        <div className="cards-container">
          {cinematics?.videos?.map((c) => (
            <ThumbnailCard
              key={c?.video_id}
              image={c?.thumbnail}
              for_modify={true}
              title={c?.description}
              onDelete={() => {
                setCurrentCinematic(c);
                setDeleteCinematicModal(true);
              }}
              onEdit={() => {
                setCurrentCinematic(c);
                setEditCinematicModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentCinematic(c);
                setCinematicModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Fans_star Zone */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Fans_star Zone</div>
        <div className="cards-container">
          {fanstarzone?.videos?.map((fan) => (
            <ThumbnailCard
              key={fan?.video_id}
              image={fan?.thumbnail}
              for_modify={true}
              title={fan?.description}
              onDelete={() => {
                setCurrentFanStar(fan);
                setDeleteFanStarModal(true);
              }}
              onEdit={() => {
                setCurrentFanStar(fan);
                setEditFanStarModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentFanStar(fan);
                setFanStarZoneModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Kid-Vids */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Kid-Vids</div>
        <div className="cards-container">
          {kidvids?.videos?.map((kid) => (
            <ThumbnailCard
              key={kid?.video_id}
              image={kid?.thumbnail}
              for_modify={true}
              title={kid?.description}
              onDelete={() => {
                setCurrentKidVids(kid);
                setDeleteKidVidsModal(true);
              }}
              onEdit={() => {
                setCurrentKidVids(kid);
                setEditKidVidsModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentKidVids(kid);
                setKidVidsModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* TV ProgMax */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My TV ProgMax</div>
        <div className="cards-container">
          {tvprogmax?.videos?.map((tv) => (
            <ThumbnailCard
              key={tv?.video_id}
              image={tv?.thumbnail}
              for_modify={true}
              title={tv?.description}
              onDelete={() => {
                setCurrentTvProgMax(tv);
                setDeleteTvProgMaxModal(true);
              }}
              onEdit={() => {
                setCurrentTvProgMax(tv);
                setEditTvProgMaxModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentTvProgMax(tv);
                setTvProgMaxModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Learning and Hobbies */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Learnings and Hobbies</div>
        <div className="cards-container">
          {learningandhobbies?.videos?.map((learning) => (
            <ThumbnailCard
              key={learning?.video_id}
              image={learning?.thumbnail}
              for_modify={true}
              title={learning?.description}
              onDelete={() => {
                setCurrentLearningHobbies(learning);
                setDeleteLearningModal(true);
              }}
              onEdit={() => {
                setCurrentLearningHobbies(learning);
                setEditLearningModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentLearningHobbies(learning);
                setLearningAndHobbiesModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Mondo Market */}
      {/* ----------------------------------------------- */}

      <div className="mt-10 mb-5">
        <div className="heading">My Mondo Market</div>
        <div className="cards-container">
          {mondomarket?.AllItems?.map((mondo) => (
            <ThumbnailCard
              key={mondo?.id}
              image={mondo?.images[0].image}
              for_modify={true}
              title={mondo?.title}
              onDelete={() => {
                setCurrentMondoMarket(mondo);
                setDeleteMondoMarketModal(true);
              }}
              onEdit={() => {
                setCurrentMondoMarket(mondo);
                setEditMondoMarketModal(true);
              }}
              onClick={() => {
                resetStates();
                setCurrentMondoMarket(mondo);
                setMondoMarketModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* Players */}
      {/* ----------------------------------------------- */}

      {/* //**  Video Modal  */}
      <VideoManiaPlayer
        video={currentVideo}
        isOpen={videoManiaModal}
        onClose={() => {
          resetStates();
          setVideoManiaModal(false);
        }}
        dispatch={dispatch}
      />

      <PicTourPreviewer
        image={currentPicTour}
        isOpen={picTourModal}
        onClose={() => {
          resetStates();
          setPicTourModal(false);
        }}
      />

      <OpenLetterPreviewer
        letter={currentLetter}
        isOpen={letterModal}
        onClose={() => {
          resetStates();
          setLetterModal(false);
        }}
      />

      <NewsPreviewer
        image={currentNews}
        isOpen={newsModal}
        onClose={() => {
          resetStates();
          setNewsModal(false);
        }}
      />

      <QafiPreviewer
        image={currentQafi}
        isOpen={qafiModal}
        onClose={() => {
          resetStates();
          setQafiModal(false);
        }}
      />

      <EbicPreviewer
        image={currentEbic}
        isOpen={ebicModal}
        onClose={() => {
          resetStates();
          setEbicModal(false);
        }}
      />

      <SportsPreviewer
        image={currentSports}
        isOpen={sportsAndSportsModal}
        onClose={() => {
          resetStates();
          setSportsAndSportsModal(false);
        }}
      />

      <CinematicPlayer
        video={currentCinematic}
        isOpen={cinematicModal}
        onClose={() => {
          resetStates();
          setCinematicModal(false);
        }}
        dispatch={dispatch}
      />

      <FanStarPlayer
        video={currentFanStar}
        isOpen={fanstarzoneModal}
        onClose={() => {
          resetStates();
          setFanStarZoneModal(false);
        }}
        dispatch={dispatch}
      />

      <KidVidsPlayer
        video={currentKidVids}
        isOpen={kidvidsModal}
        onClose={() => {
          resetStates();
          setKidVidsModal(false);
        }}
        dispatch={dispatch}
      />

      <TvProgmaxPlayer
        video={currentTvProgMax}
        isOpen={tvprogmaxModal}
        onClose={() => {
          resetStates();
          setTvProgMaxModal(false);
        }}
        dispatch={dispatch}
      />

      <LearningHobbiesPlayer
        video={currentLearningHobbies}
        isOpen={learningandhobbiesModal}
        onClose={() => {
          resetStates();
          setLearningAndHobbiesModal(false);
        }}
        dispatch={dispatch}
      />

      <MondoDetailsViewer
        mondo={currentMondoMarket}
        isOpen={mondomarketModal}
        onClose={() => {
          resetStates();
          setMondoMarketModal(false);
        }}
        token={token}
      />

      {/* ------------------------------------------------- */}
      {/* Video Mania Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteVideoModal}
        onClose={() => {
          setDeleteVideoModal(false);
          setCurrentVideo(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteVideoMania
          setDeleteModal={setDeleteVideoModal}
          id={currentVideo?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editVideoModal}
        onClose={() => {
          setEditVideoModal(false);
          setCurrentVideo(null);
        }}
        title="Edit"
      >
        <EditVideoMania
          setEditModal={setEditVideoModal}
          video={currentVideo}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Pic Tour Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deletePicTourModal}
        onClose={() => {
          setDeletePicTourModal(false);
          setCurrentPicTour(null);
        }}
        title="Delete Confirmation"
      >
        <DeletePicTour
          setDeleteModal={setDeletePicTourModal}
          id={currentPicTour?.pic_tour_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editPicTourModal}
        onClose={() => {
          setEditPicTourModal(false);
          setCurrentPicTour(null);
        }}
        title="Edit"
      >
        <EditPicTour
          setEditModal={setEditPicTourModal}
          picTour={currentPicTour}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Letter Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteLetterModal}
        onClose={() => {
          setDeleteLetterModal(false);
          setCurrentLetter(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteOpenLetter
          setDeleteModal={setDeleteLetterModal}
          id={currentLetter?.post_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editLetterModal}
        onClose={() => {
          setEditLetterModal(false);
          setCurrentLetter(null);
        }}
        title="Edit"
      >
        <EditOpenLetter
          setEditModal={setEditLetterModal}
          letterInfo={currentLetter}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* News Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteNewsModal}
        onClose={() => {
          setDeleteNewsModal(false);
          setCurrentNews(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteNews
          setDeleteModal={setDeleteNewsModal}
          id={currentNews?.news_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editNewsModal}
        onClose={() => {
          setEditNewsModal(false);
          setCurrentNews(null);
        }}
        title="Edit"
      >
        <EditNews
          setEditModal={setEditNewsModal}
          news={currentNews}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Qafi Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteQafiModal}
        onClose={() => {
          setDeleteQafiModal(false);
          setCurrentQafi(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteQafi
          setDeleteModal={setDeleteQafiModal}
          id={currentQafi?.qafi_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editQafiModal}
        onClose={() => {
          setEditQafiModal(false);
          setCurrentQafi(null);
        }}
        title="Edit"
      >
        <EditQafi
          setEditModal={setEditQafiModal}
          qafi={currentQafi}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Ebic Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteEbicModal}
        onClose={() => {
          setDeleteEbicModal(false);
          setCurrentEbic(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteEbic
          setDeleteModal={setDeleteEbicModal}
          id={currentEbic?.gebc_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editEbicModal}
        onClose={() => {
          setEditEbicModal(false);
          setCurrentEbic(null);
        }}
        title="Edit"
      >
        <EditEbic
          setEditModal={setEditEbicModal}
          ebic={currentEbic}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Sports Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteSportsModal}
        onClose={() => {
          setDeleteSportsModal(false);
          setCurrentSports(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteSport
          setDeleteModal={setDeleteSportsModal}
          id={currentSports?.sport_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editSportsModal}
        onClose={() => {
          setEditSportsModal(false);
          setCurrentSports(null);
        }}
        title="Edit"
      >
        <EditSports
          setEditModal={setEditSportsModal}
          sport={currentSports}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Cinematic Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteCinematicModal}
        onClose={() => {
          setDeleteCinematicModal(false);
          setCurrentCinematic(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteCinematic
          setDeleteModal={setDeleteCinematicModal}
          id={currentCinematic?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editCinematicModal}
        onClose={() => {
          setEditCinematicModal(false);
          setCurrentCinematic(null);
        }}
        title="Edit"
      >
        <EditCinematic
          setEditModal={setEditCinematicModal}
          cinematic={currentCinematic}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Fan Star Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteFanStarModal}
        onClose={() => {
          setDeleteFanStarModal(false);
          setCurrentFanStar(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteFanStar
          setDeleteModal={setDeleteFanStarModal}
          id={currentFanStar?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editFanStarModal}
        onClose={() => {
          setEditFanStarModal(false);
          setCurrentFanStar(null);
        }}
        title="Edit"
      >
        <EditFanStar
          setEditModal={setEditFanStarModal}
          fanStar={currentFanStar}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* KidVids Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteKidVidsModal}
        onClose={() => {
          setDeleteKidVidsModal(false);
          setCurrentKidVids(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteKidVids
          setDeleteModal={setDeleteKidVidsModal}
          id={currentKidVids?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editKidVidsModal}
        onClose={() => {
          setEditKidVidsModal(false);
          setCurrentKidVids(null);
        }}
        title="Edit"
      >
        <EditKidVids
          setEditModal={setEditKidVidsModal}
          kidVids={currentKidVids}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* TV Progmax Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteTvProgMaxModal}
        onClose={() => {
          setDeleteTvProgMaxModal(false);
          setCurrentTvProgMax(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteTvProgMax
          setDeleteModal={setDeleteTvProgMaxModal}
          id={currentTvProgMax?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editTvProgMaxModal}
        onClose={() => {
          setEditTvProgMaxModal(false);
          setCurrentTvProgMax(null);
        }}
        title="Edit"
      >
        <EditTvProgmax
          setEditModal={setEditTvProgMaxModal}
          tvProgmax={currentTvProgMax}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Learning and Hobbies Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteLearningModal}
        onClose={() => {
          setDeleteLearningModal(false);
          setCurrentLearningHobbies(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteLearningHobbies
          setDeleteModal={setDeleteLearningModal}
          id={currentLearningHobbies?.video_id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editLearningModal}
        onClose={() => {
          setEditLearningModal(false);
          setCurrentLearningHobbies(null);
        }}
        title="Edit"
      >
        <EditLearningHobbies
          setEditModal={setEditLearningModal}
          learning={currentLearningHobbies}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ------------------------------------------------- */}
      {/* Mondo Market Modals  */}
      {/* ------------------------------------------------- */}

      <Modal
        isOpen={deleteMondoMarketModal}
        onClose={() => {
          setDeleteMondoMarketModal(false);
          setCurrentMondoMarket(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteMondo
          setDeleteModal={setDeleteMondoMarketModal}
          id={currentMondoMarket?.id}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      <Modal
        isOpen={editMondoMarketModal}
        onClose={() => {
          setEditMondoMarketModal(false);
          setCurrentMondoMarket(null);
        }}
        title="Edit"
      >
        <EditMondoItem
          setEditModal={setEditMondoMarketModal}
          item={currentMondoMarket}
          dispatch={dispatch}
          setReload={setReload}
        />
      </Modal>

      {/* ============================================================ */}
      {/* END OF THE CODE */}
      {/* ============================================================ */}
    </div>
  );
};

export default Profile;
