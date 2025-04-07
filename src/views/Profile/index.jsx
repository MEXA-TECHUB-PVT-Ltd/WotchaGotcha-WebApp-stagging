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

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

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
        getCinematicByUser({ token, id: user?.id, type: "cinematics" })
      ).unwrap();
      setCinematics(cinematicData);

      const fanStarZoneData = await dispatch(
        getFanStarByUser({ token, id: user?.id, type: "fanstarzone" })
      ).unwrap();
      setFanStarZone(fanStarZoneData);

      const kidsVidsData = await dispatch(
        getKidVidsByUser({ token, id: user?.id, type: "kidvids" })
      ).unwrap();
      setKidVids(kidsVidsData);

      const tvProgMaxData = await dispatch(
        getTvProgmaxByUser({ token, id: user?.id, type: "tvprogmax" })
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {countCardData?.map((item) => (
          <CountCard key={item.id} count={item.total} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
