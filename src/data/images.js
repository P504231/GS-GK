const pictorialNotesRaw = [
  // ==========PICTORIAL NOTES ==========
  {
    ImageLink: "https://u1.oliveboard.in/exams/solution/oliveimg/p7318/image007.png",
    Description: "Spring Tides: When the sun, the moon and the earth are in a straight line, the height of the tide will be higher. These are called spring tides and they occur twice a month, one on full moon period and another during the new moon period. \n Neap Tides: Occurs between two spring tides, when sun and moon are in right angle.\nDiurnal tides: Some tides occur daily which are known as diurnal tides. There are only one high tide and one low tide each day. The successive high and low tides are approximate of the same height.",
    category: "Pictorial Notes",
  },
  {
    ImageLink: "https://i.postimg.cc/FRZhKMhS/Screenshot-2025-12-09-at-21-49-33.png",
    Description: "",
    category: "Pictorial Notes",
  },
  // Add more notes here - they will automatically get IDs
];

// Auto-generate IDs based on index
const pictorialNotesWithIds = pictorialNotesRaw.map((note, index) => ({
  id: index + 1, // Starts from 1 instead of 0
  ...note
}));

export default pictorialNotesWithIds;


//https://i.postimg.cc/FRZhKMhS/Screenshot-2025-12-09-at-21-49-33.png

//{ \n } is used to break line in description