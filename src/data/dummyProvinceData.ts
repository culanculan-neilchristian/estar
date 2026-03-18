export interface DistrictStats {
  name: string;
  churches: number;
  joined: string;
  baptized: string;
  coordinates: [number, number]; // [lng, lat]
}

export interface TimelineStateData {
  label: string;
  date: string;
  churches: number;
  joined: string;
  baptized: string;
  description: string;
  bulletPoints: string[];
  districts: DistrictStats[];
}

export const NAKHON_SAWAN_DUMMY_DATA: Record<number, TimelineStateData> = {
  0: { // The Start
    label: 'The Start',
    date: '2024 JANUARY',
    churches: 0,
    joined: "0",
    baptized: "0",
    description: "Aimed to reach 311 house churches and 3 district churches in 3 districts in the province of Nakhon Sawan. Throughout 2024, we have reached a total of 325 house churches. To date, we have reached a total of 361 village churches, including 3 district churches.",
    bulletPoints: [
      "Targeted 3 districts in Nakhon Sawan",
      "Projected 311 village house churches"
    ],
    districts: [
      { name: "Lat Yao", churches: 0, joined: "0", baptized: "0", coordinates: [99.7891, 15.7516] },
      { name: "Tak Fa", churches: 0, joined: "0", baptized: "0", coordinates: [100.4851, 15.3400] },
      { name: "Khaisali", churches: 0, joined: "0", baptized: "0", coordinates: [100.6500, 15.5800] }
    ]
  },
  1: { // One Year In
    label: 'One Year In',
    date: '2024 DECEMBER',
    churches: 325,
    joined: "3,782",
    baptized: "2,144",
    description: "By December 2024, we witnessed explosive growth. With over 325 house churches planted, we reached over 2,000 new believers. The leadership training movements matured significantly, exceeding our 2026 goals two years earlier than projected.",
    bulletPoints: [
      "Planted 325 house churches",
      "Reached over 2,000 new believers",
      "Exceeded expectations by completing 2026 goals two years early"
    ],
    districts: [
      { name: "Lat Yao", churches: 126, joined: "1,489", baptized: "855", coordinates: [99.7891, 15.7516] },
      { name: "Tak Fa", churches: 107, joined: "1,268", baptized: "717", coordinates: [100.4851, 15.3400] },
      { name: "Khaisali", churches: 92, joined: "1,025", baptized: "572", coordinates: [100.6500, 15.5800] }
    ]
  },
  2: { // Today
    label: 'Today',
    date: '2025 JULY',
    churches: 361,
    joined: "4,923",
    baptized: "3,291",
    description: "As of July 2025, we continue to see sustainable acceleration. All 3 target districts are now fully integrated into the planting movement. We are transitioning to a self-multiplying phase, with 361 village house churches currently active.",
    bulletPoints: [
      "To date, we have reached a total of 361 village churches",
      "These includes 3 district churches, one per district",
      "Reached over 3,000 new believers"
    ],
    districts: [
      { name: "Lat Yao", churches: 142, joined: "1,882", baptized: "1,357", coordinates: [99.7891, 15.7516] },
      { name: "Tak Fa", churches: 119, joined: "1,633", baptized: "1,074", coordinates: [100.4851, 15.3400] },
      { name: "Khaisali", churches: 100, joined: "1,408", baptized: "860", coordinates: [100.6500, 15.5800] }
    ]
  },
  3: { // Next Year Expectations
    label: 'Next Year Expectations',
    date: '2026 DECEMBER',
    churches: 385,
    joined: "7,000",
    baptized: "4,500",
    description: "By the end of 2026, we expect to achieve complete gospel saturation across the province. Projected growth suggests over 385 churches and reaching more than 7,000 new disciples through exponential multiplication.",
    bulletPoints: [
      "Projected 385 churches by end of 2026",
      "Expected over 4,500 new believers",
      "Continued exponential growth beyond initial donation"
    ],
    districts: [
      { name: "Lat Yao", churches: 155, joined: "2,600", baptized: "1,800", coordinates: [99.7891, 15.7516] },
      { name: "Tak Fa", churches: 125, joined: "2,400", baptized: "1,450", coordinates: [100.4851, 15.3400] },
      { name: "Khaisali", churches: 105, joined: "2,000", baptized: "1,250", coordinates: [100.6500, 15.5800] }
    ]
  }
};

