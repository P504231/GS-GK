// src/data/videos.js
const gsVideos = [
   /* ===========================================-Geography=========================================== */
  {
    youtubeLink: "https://www.youtube.com/shorts/PuFKh-lxPlU",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=2t5JqtQT9a4",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/DQL2OqfjN_g",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/G87JXurMk6A",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/IVOctG_RJtE",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/Zw1m0SLYikQ",
    category: "Geography",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/5oOH3884PzE",
    category: "Geography",
  },

 /* ===========================================Polity=========================================== */
  {
    youtubeLink: "https://www.youtube.com/shorts/bvQjqnz37qY",
    category: "Polity",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/VzewpZThMO4",
    category: "Polity",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/0_nhrV9ocwU",
    category: "Polity",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/bFy3ThMiJ_E",
    category: "Polity",
  },
   /* ===========================================Science=========================================== */
  {
    youtubeLink: "https://www.youtube.com/shorts/Q0iUkZrhi4k",
    category: "Science",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/anYAY7CVcyE",
    category: "Science",
  },
   /* ===========================================Scheme=========================================== */
  {
    youtubeLink: "https://www.youtube.com/watch?v=ZDUajSr43FQ",
    category: "Scheme",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/nJ6DzJJ5Kv4",
    category: "Scheme",
  },
  {
    youtubeLink: "https://www.youtube.com/shorts/75XeEnSpbbI",
    category: "Scheme",
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=dyDHX04aRSU",
    category: "Scheme",
  },
    /* ===========================================AEDO=========================================== */
  {
    youtubeLink:"https://www.youtube.com/watch?v=MfH8civCJFc",
    category:"AEDO"
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=zUg1IeEulPM",
    category: "AEDO",
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=AUOoqXK-6f4",
    category: "AEDO",
  },
  {
    youtubeLink:"https://www.youtube.com/watch?v=ussyAgk_mZ0",
    category:"AEDO",
  },
  {
    youtubeLink:"https://www.youtube.com/watch?v=AS7tehVnw5g",
    category:"AEDO",
  },
  {
    youtubeLink:"https://www.youtube.com/watch?v=S9Nfq4OyX0I",
    category:"AEDO",
  },
  {
    youtubeLink:"https://www.youtube.com/watch?v=Zn6F8xVftX4",
    category:"AEDO",
  }
];

// Auto-generate IDs based on index
const videosWithIds = gsVideos.map((video, index) => ({
  id: index + 1, // Starts from 1 instead of 0
  ...video
}));

export default videosWithIds;

// Categories array (keep as reference)
// const categories = ["All", "Polity", "History", "Geography", "Economics", "Science", "Scheme", "Current Affairs", "Static GK", "AEDO"];