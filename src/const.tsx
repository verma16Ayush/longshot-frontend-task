import { createTheme } from '@mui/material/styles';
// https://4bb2025d-9b96-4f89-a6ea-9022cbce010c.mock.pstmn.io/getdata

export const BASEURL =
  "https://4bb2025d-9b96-4f89-a6ea-9022cbce010c.mock.pstmn.io/";

export const API_URLS = {
  getdata: "getdata/",
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
export const intentIndexMap : {[key: string] : number} = {
  'Commercial': 0,
  'Informational': 1,
  'Navigational': 2,
  'Transactional': 3,
}
export const intentMap = (intentNum: number) => {
  const array = [
    {
      type: "Commercial",
      hoverText: "The user wants to investigate brands or services.",
      color: { bg: "#FCE081", text: "#A75800", hover: "#ffca6e" },
    },
    {
      type: "Informational",
      hoverText: "The user wants to find an answer to a specific question.",
      color: { bg: "#C4E5FE", text: "#006DCA", hover: "#61c6ff" },
    },
    {
      type: "Navigational",
      hoverText: "The user wants to find a specific page or site.",
      color: { bg: "#EDD9FF", text: "#8649E1", hover: "#c59dfa" },
    },
    {
      type: "Transactional",
      hoverText: "The user wants to complete an action (conversion).",
      color: { bg: "#9EF2C9", text: "#007C65", hover: "#11d6a6" },
    },
  ]
  return array[intentNum]
};

export const keywordDifficultyMap = function(value : number) : {rating: string; text: string; color: string} {
    if (value > 85) {
      return {
        rating: "Very hard",
        text:
          "The absolute hardest keywords to compete for, especially for a new website. These will demand a lot of on page SEO, link building, and content promotion efforts to eventually rank and acquire traffic.",
        color: "#D1002F",
      };
    } else if (value >= 70) {
      return {
        rating: "Hard",
        text:
          "Even stiffer competition. These keywords will demand more effort in terms of getting higher authority referring domains in order to rank your well-optimized and helpful content among the top pages.",
        color: "#FF4953",
      };
    } else if (value >= 50) {
      return {
        rating: "Difficult",
        text:
          "You'll need to have some backlinks in addition to your well-structured, helpful and optimized content in order to compete here.",
        color: "#FF8C43",
      };
    } else if (value >= 30) {
      return {
        rating: "Possible",
        text:
          "Slightly more competition. You'll need well-structured and unique content appropriately optimized for your keywords.",
        color: "#FDC23C",
      };
    } else if (value >= 15) {
      return {
        rating: "Easy",
        text:
          "These keywords have some competition but are still possible to rank for when you're starting out. To be able to rank for these, you'll need quality content focused on the keyword's intent.",
        color: "#59DDAA",
      };
    } else {
      return {
        rating: "Very easy",
        text:
          "These are the best opportunities to start ranking new webpages on Google as soon as possible without backlinks.",
        color: "#009F81",
      };
    }
  }
 

export const THEME = createTheme({
  palette: {
    primary: {
      main: "#6C58EA",
    },
    secondary:{
      main: "#5E7C8A",
    },
    common: {
      white: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    button: {
      textTransform: 'none'
    }
  }
});

export const indexMap = {
  "keyword": 0,
  "Search Volume": 1,
  "Intent": 2,
  "CPC": 3,
  "Competition": 4,
  "Number of Results": 5,
  "Trends": 6,
  "Keyword Diffuculty": 7
}