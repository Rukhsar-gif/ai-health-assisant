// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_KEY = "AIzaSyBr28Z7FupSMZBxqvJiLbauKtKaqO77wYE"; // 🔥 Replace with your YouTube API key

// const FirstAid = () => {
//   const [videos, setVideos] = useState([]);
//   const [search, setSearch] = useState("first aid");

//   // 🔍 Fetch videos from YouTube
//   const fetchVideos = async (query) => {
//     try {
//       const res = await axios.get(
//         "https://www.googleapis.com/youtube/v3/search",
//         {
//           params: {
//             part: "snippet",
//             q: query,
//             key: API_KEY,
//             maxResults: 6,
//             type: "video"
//           }
//         }
//       );

//       setVideos(res.data.items);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   // 🚀 Load default videos
//   useEffect(() => {
//     fetchVideos(search);
//   }, []);

//   // 🎤 Voice Search
//   const handleVoiceSearch = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Voice search not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.start();

//     recognition.onresult = (event) => {
//       const voiceText = event.results[0][0].transcript;
//       setSearch(voiceText);
//       fetchVideos(voiceText);
//     };
//   };

//   // 📂 Categories
//   const categories = ["CPR", "Burns", "Fracture", "Bleeding", "Heart Attack"];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-6xl mx-auto">

//         {/* Heading */}
//         <h1 className="text-3xl font-bold text-red-600 mb-6">
//           🚑 First Aid Video Guide
//         </h1>

//         {/* 🔍 Search + Voice */}
//         <div className="flex gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Search first aid videos..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-400"
//           />

//           <button
//             onClick={() => fetchVideos(search)}
//             className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
//           >
//             Search
//           </button>

//           <button
//             onClick={handleVoiceSearch}
//             className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
//           >
//             🎤
//           </button>
//         </div>

//         {/* 📂 Categories */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setSearch(cat);
//                 fetchVideos(cat);
//               }}
//               className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* 🎥 Videos */}
//         {videos.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No videos found 😔
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">

//             {videos.map((video) => (
//               <div
//                 key={video.id.videoId}
//                 className="bg-white p-4 rounded-2xl shadow hover:scale-105 transition"
//               >
//                 <iframe
//                   width="100%"
//                   height="200"
//                   src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                   title={video.snippet.title}
//                   frameBorder="0"
//                   allowFullScreen
//                   className="rounded-xl"
//                 ></iframe>

//                 <h2 className="mt-3 font-semibold text-lg">
//                   {video.snippet.title}
//                 </h2>
//               </div>
//             ))}

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default FirstAid;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyBr28Z7FupSMZBxqvJiLbauKtKaqO77wYE"; // 🔥 Replace with your YouTube API key

const FirstAid = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("first aid");

  // 🔍 Fetch videos from YouTube
  const fetchVideos = async (query) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            key: API_KEY,
            maxResults: 6,
            type: "video"
          }
        }
      );

      setVideos(res.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // 🚀 Load default videos
  useEffect(() => {
    fetchVideos(search);
  }, []);

  // 🎤 Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSearch(voiceText);
      fetchVideos(voiceText);
    };
  };

  // 📂 Categories
  const categories = ["CPR", "Burns", "Fracture", "Bleeding", "Heart Attack"];


 return (
  <div className="min-h-screen bg-gray-950 text-white p-6">

    {/* 🔥 TITLE */}
    <h1 className="text-3xl font-bold mb-6">
      🚑 First Aid Assistant
    </h1>

    {/* 🔍 SEARCH + VOICE */}
    <div className="flex gap-3 mb-6 flex-wrap">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search first aid videos..."
        className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
      />

      <button
        onClick={() => fetchVideos(search)}
        className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>

      <button
        onClick={handleVoiceSearch}
        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        🎤
      </button>

    </div>

    {/* 🎯 CATEGORY BUTTONS */}
    <div className="flex gap-3 mb-6 flex-wrap">
      {categories.map((cat, index) => (
        <button
          key={index}
          onClick={() => {
            setSearch(cat);
            fetchVideos(cat);
          }}
          className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
        >
          {cat}
        </button>
      ))}
    </div>

    {/* 🎥 VIDEO GRID */}
    {videos.length === 0 ? (
      <p className="text-center text-gray-400">
        No videos found 😔
      </p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow hover:scale-105 transition"
          >
            {/* 🎥 Video */}
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
              className="rounded-lg"
            ></iframe>

            {/* 📌 Info */}
            <h2 className="mt-3 font-semibold line-clamp-2">
              {video.snippet.title}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {video.snippet.channelTitle}
            </p>
          </div>
        ))}

      </div>
    )}

  </div>
);
};

export default FirstAid;