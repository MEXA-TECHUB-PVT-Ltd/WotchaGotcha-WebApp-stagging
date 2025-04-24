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
import { VideoManiaPlayer } from "../../services/videomania";
import { PicTourPreviewer } from "../../services/pictours";
import { OpenLetterPreviewer } from "../../services/openletters";
import { NewsPreviewer } from "../../services/news";
import { QafiPreviewer } from "../../services/qafi";
import { EbicPreviewer } from "../../services/ebic";
import { SportsPreviewer } from "../../services/sports";
import { CinematicPlayer } from "../../services/cinematic";
import { FanStarPlayer } from "../../services/fanstarzone";
import { KidVidsPlayer } from "../../services/kidvids";
import { TvProgmaxPlayer } from "../../services/tvprogmax";
import { LearningHobbiesPlayer } from "../../services/learninghobbies";
import { MondoDetailsViewer } from "../../services/mondomarket";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

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
  }, [token, user?.id]);

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
        subTitle={user?.email}
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
              image={v?.thumbnail}
              title={v?.description}
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
              title={n?.description}
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
              title={q?.description}
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
              title={e?.description}
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
              title={p?.description}
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
              title={c?.description}
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
              title={fan?.description}
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
              title={kid?.description}
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
              title={tv?.description}
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
              title={learning?.description}
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
              title={mondo?.title}
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

      {/* ============================================================ */}
      {/* END OF THE CODE */}
      {/* ============================================================ */}
    </div>
  );
};

export default Profile;
