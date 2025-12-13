const pdfData = [
  // ========= PDF NOTES =========
  {
    title: "CURRENT AFFAIRS FULL COMPILATION",
    pdfLink: "https://drive.google.com/file/d/15eB06EmYE1-BaAw23pdJr0Vpb1sqlNxM/view",
    category: "PDF Notes",
  },
  {
    title: "A zeluno-ancient-india-master",
    pdfLink: "https://drive.google.com/file/d/1nD0uvt1e3GvSJgko5H6FSHkG7LB5WaTY/view",
    category: "PDF Notes",
  },
  {
    title: "A zeluno-medieval-india-master",
    pdfLink: "https://drive.google.com/file/d/1KRVmYmJ-am353glW4Ip4uiMfHCvV1kbX/view",
    category: "PDF Notes",
  },
  {
    title: "A zeluno-modern-india-master",
    pdfLink: "https://drive.google.com/file/d/1_-gYqLJPKyZ_A4mve4zW8cD2JzCdmeeu/view",
    category: "PDF Notes",
  },
  {
    title: "Quick General Science for Compe - Disha Experts",
    pdfLink: "https://drive.google.com/file/d/1Oh102vqaf44O5y8PUz7tDz6LFHkyKV3p/view",
    category: "PDF Notes",
  },
  {
    title: "Spectrum",
    pdfLink: "https://drive.google.com/file/d/13fkMwsjEKMeigXBW_eDtOLA7Bu21A34K/view",
    category: "PDF Notes",
  },
  {
    title: "IPG_const_copy",
    pdfLink: "https://drive.google.com/file/d/1w2zuqWXY4AwgxXn73KXQuBPaBoumCXmy/view",
    category: "PDF Notes",
  },
   {
    title: "Dances India",
    pdfLink: "https://drive.google.com/file/d/1FmDfmvHQ8uBkX9e4JMi1A0AajMzdCS43/view",
    category: "PDF Notes",
  },
];

// Auto-generate IDs (same style as pictorial notes)
const enrichedPdfs = pdfData.map((pdf, index) => ({
  id: index + 1, // Start IDs from 1
  type: "pdf",   // Required for viewer switch
  ...pdf,
}));

export default enrichedPdfs;
