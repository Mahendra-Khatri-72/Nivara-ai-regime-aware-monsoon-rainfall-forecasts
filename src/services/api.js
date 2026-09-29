// Ye file backend dev ke liye ready-to-connect hai
export const getDashboardData = async () => {
  // Simulating real network delay of 1 second (1000ms)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Teammate yahan API se aane wala JSON return karega
      resolve({
        location: "Bhopal, Madhya Pradesh",
        date: "30 Sep 2026",
        forecastDuration: "24h Forecast",
        correctedRainfall: 101,
        rainfallDiff: "+19",
        heavyRainRisk: 78,
        riskLevel: "High",
        regime: "Active Monsoon",
        confidence: 91
      });
      // reject(new Error("Server error")); // Error test karne ke liye ise uncomment kar sakte ho
    }, 1000); 
  });
};

export const getForecastData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rawNwp: 82,
        aiCorrected: 101,
        difference: "+19",
        chartData: [
          { time: '6h', raw: 30, corrected: 40, observed: 35 },
          { time: '12h', raw: 60, corrected: 80, observed: 75 },
          { time: '18h', raw: 75, corrected: 95, observed: 90 },
          { time: '24h', raw: 82, corrected: 101, observed: null },
        ]
      });
    }, 1000);
  });
};

export const getAnalysisData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        insights: [
          "Monsoon regime is active in your region.",
          "AI correction reduces 19 mm bias in forecast.",
          "High risk of heavy rainfall (78%).",
          "Keep an eye on low-lying areas."
        ],
        metrics: {
          mae: "6.8", maeImprovement: "32%",
          rmse: "12.4", rmseImprovement: "28%",
          r2: "0.86", r2Improvement: "18%"
        },
        historicalData: [
          { date: '26 Sep', raw: 50, corrected: 65 },
          { date: '27 Sep', raw: 45, corrected: 55 },
          { date: '28 Sep', raw: 70, corrected: 85 },
          { date: '29 Sep', raw: 60, corrected: 75 },
          { date: '30 Sep', raw: 82, corrected: 101 },
        ]
      });
    }, 1000); // 1 second loading simulation
  });
};

export const getMapData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        location: "Bhopal",
        state: "Madhya Pradesh",
        currentRainfall: "101 mm",
        rawNwp: "82 mm",
        corrected: "101 mm",
        heavyRainRisk: "78%"
      });
    }, 800); // Network delay simulation
  });
};

export const getProfileData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Teammate yahan database se user data fetch karke return karega
      resolve({
        name: "Kunal Badvi",
        role: "Student",
        location: "Bhopal",
        notifications: "3",
        appVersion: "1.0.0"
      });
    }, 800); // 0.8 seconds loading delay
  });
};