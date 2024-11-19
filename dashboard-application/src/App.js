import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ProductSubcategoryChart from './ProductSubcategoryChart';
import ReviewsPerSubcategoryChart from './ReviewsPerSubcategoryChart';
import AverageReviewSizeChart from './AverageReviewSizeChart';
import JanuaryReviewsCountChart from './JanuaryReviewsCountChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';


const drawerWidth = 240;

function App() {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState({
    quantitative: false,
    fuzzyExact: false,
    hybrid: false
  });
  const [lastClickedAnswer, setLastClickedAnswer] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category) => {
    setCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  const handleChartClick = (query) => {
    console.log('Rendering chart for:', query);
    if (query === 'productsPerSubcategory') {
      setLastClickedAnswer({
        type: 'productSubcategory',
        data: [
          { subcategory: 'Appliances > Parts & Accessories', count: 1152 },
          { subcategory: 'Appliances > Parts & Accessories > Refrigerator Parts & Accessories > Water Filters', count: 859 },
          { subcategory: 'Appliances > Refrigerators', count: 576 },
          { subcategory: 'Appliances > Parts & Accessories > Range Parts & Accessories', count: 459 },
          { subcategory: 'Appliances > Parts & Accessories > Refrigerator Parts & Accessories', count: 397 },
        ]
      });
    } else if (query === 'reviewsPerSubcategory') {
      setLastClickedAnswer({
        type: 'reviewSubcategory',
        data: [
          { subcategory: 'Appliances > Appliance Services', count: 5 },
          { subcategory: 'Appliances > Beer Keg Refrigerators', count: 478 },
          { subcategory: 'Appliances > Beverage Refrigerators', count: 311 },
          { subcategory: 'Appliances > Cooktops', count: 682 },
          { subcategory: 'Appliances > Dishwashers > Built-In Dishwashers', count: 2119 },
        ]
      });
    } else if (query === 'averageReviewSize') {
      setLastClickedAnswer({
        type: 'averageReviewSize',
        data: { characterLength: 359.44, wordLength: 66.28 }
      });
    } else if (query === 'januaryReviewsCount') {
      setLastClickedAnswer({
        type: 'januaryReviewsCount',
        data: 10554
      });
    }
  };

  const renderQuantitativeQueries = (handleChartClick) => (
    <>
      <ListItem button>
        <ListItemText primary="How many products are there in every product subcategory?" onClick={() => handleChartClick('productsPerSubcategory')} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="How many reviews for every product subcategory?" onClick={() => handleChartClick('reviewsPerSubcategory')} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="What is the average size (characters/words) of the review text/body?" onClick={() => handleChartClick('averageReviewSize')} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="How many reviews submitted every January for years: 2011, 2012, 2013, 2014?" onClick={() => handleChartClick('januaryReviewsCount')} />
      </ListItem>
    </>
  );

  const renderFuzzyExactQueries = (handleChartClick, setLastClickedAnswer) => {
    const handleFiveStarReviewsClick = () => {
      const fiveStarReviews = [
        { text: "Could have been longer though. well made and e...", rating: 4.0 },
        { text: "I like these containers so much i have ordered...", rating: 5.0 },
        { text: "It works, no fires, etc. Why not 5 stars? Ho...", rating: 4.0 },
        { text: "Fast shipping. Works great", rating: 5.0 },
        { text: "What can I say? It is the usual Leviton high q...", rating: 5.0 },
        // Add more reviews as needed
      ];
      setLastClickedAnswer({
        type: "fiveStarReviews",
        data: fiveStarReviews,
      });
    };

    const handleJohnSmithReviewsClick = () => {
      // Functionality for displaying reviews by reviewers named "John Smith"
      const johnSmithReviews = [
        {
          reviewerID: "ID-A3G21NOKS1P4EO",
          asin: "B00004U9JO",
          reviewText: "The unit is just over 3 years old with a 2 year...",
          overall: 1.0,
          summary: "Insinkerator Badger 5 - is garbage"
        },
        {
          reviewerID: "ID-A23WMNH6Q4B714",
          asin: "B00009W3AA",
          reviewText: "This is what you need to charge a Tesla Model ...",
          overall: 5.0,
          summary: "Best EV charger available"
        }
      ];
      setLastClickedAnswer({
        type: "johnSmithReviews",
        data: johnSmithReviews,
      });
    };

    const handleDefectiveRefundReviewsClick = () => {
      const defectiveRefundReviews = [
        { text: "[1, 2] DEFECTIVE PRODUCT!!!!!!! I PURCHASED THIS FOR...", rating: 1 },
        { text: "[9, 10] I bought one of these for my electric stove ab...", rating: 1 },
        { text: "[0, 0] I have been wanting one of these for the kitch...", rating: 5 },
        { text: "[1, 1] I placed one order for 2 InterDesign dishwashe...", rating: 1 },
        { text: "[0, 0] We moved from my condo to a house, and because...", rating: 5 },
        // Add more reviews as needed
      ];
      setLastClickedAnswer({
        type: "defectiveRefundReviews",
        data: defectiveRefundReviews,
      });
    };


    return (
      <>
        {[ // Fuzzy/Exact-Search Queries
          { text: 'Get reviews that have ratings close to "five stars"', icon: <AssignmentIcon />, onClick: handleFiveStarReviewsClick },
          { text: 'Search for reviewers whose names correspond to "John Smith"', icon: <AssignmentIcon />, onClick: handleJohnSmithReviewsClick },
          { text: 'Look up reviews using "defective" and "refund" keywords', icon: <AssignmentIcon />,onClick: handleDefectiveRefundReviewsClick}
        ].map((item, index) => (
          <ListItem button key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </>
    );
  };


  const handleHighlyRatedReviewersClick = () => {
    // Data for reviewers with consistently high ratings (average rating >= 4.5)
    const highlyRatedReviewersData = [
      { reviewerName: '1-in-million', overall: 5.0 },
      { reviewerName: '1rene0', overall: 5.0 },
      { reviewerName: 'A Customer', overall: 5.0 },
      { reviewerName: 'A Shell', overall: 5.0 },
      { reviewerName: 'A. Bolin', overall: 5.0 },
      // Add more reviewers as needed
    ];
  
    setLastClickedAnswer({
      type: 'highlyRatedReviewers',
      data: highlyRatedReviewersData,
    });
  };

  const handleHybridQueryClick = () => {
    // Define the list of years
    const years = [2011, 2012, 2013, 2014];

    // Array to store promises for fetching reviews for each year
    const fetchPromises = years.map(year => {
      return axios.post('http://localhost:9200/mini_dataset_amazon_product_reviews/_search', {
        "query": {
          "bool": {
            "must": [
              {"match": {"reviewTime": year.toString()}} // Match the year
            ]
          }
        },
        "size": 3 // Get top 3 results for each year
      });
    });

    // Execute all promises concurrently
    Promise.all(fetchPromises)
      .then(responses => {
        const similarReviewsByYear = {};

        // Process each response
        responses.forEach((response, index) => {
          const year = years[index];
          const hits = response.data.hits.hits;
          const reviews = hits.map(hit => hit._source);
          similarReviewsByYear[year] = reviews;
        });

        setLastClickedAnswer({
          type: 'similarReviewsByYear',
          data: similarReviewsByYear,
        });
      })
      .catch(error => {
        console.error('Error fetching similar reviews:', error);
      });
  };

  const handleSimilarReviewsByCategory = () => {
    // Define the list of categories
    const categories = ['Refrigerator Parts & Accessories', 'Humidifier Parts & Accessories', 'Range Parts & Accessories', 'Dishwasher Parts & Accessories'];
  
    // Array to store promises for fetching reviews for each category
    const fetchPromises = categories.map(category => {
      return axios.post('http://localhost:9200/mini_dataset_amazon_product_reviews/_search', {
        "query": {
          "bool": {
            "must": [
              {"match": {"category": category}} // Match the category
            ]
          }
        },
        "size": 3 // Get top 3 results for each category
      });
    });
  
    // Execute all promises concurrently
    Promise.all(fetchPromises)
      .then(responses => {
        const similarReviewsByCategory = {};
  
        // Process each response
        responses.forEach((response, index) => {
          const category = categories[index];
          const hits = response.data.hits.hits;
          const reviews = hits.map(hit => hit._source);
          similarReviewsByCategory[category] = reviews;
        });
  
        setLastClickedAnswer({
          type: 'similarReviewsByCategory',
          data: similarReviewsByCategory,
        });
      })
      .catch(error => {
        console.error('Error fetching similar reviews by category:', error);
      });
  };
  

  
  const renderHybridQueries = () => (
    <>
      {[ // Hybrid Search Queries
        { text: 'Top 3 most similar reviews for every year in the following list: 2011, 2012, 2013, 2014', icon: <AssignmentIcon />, onClick: handleHybridQueryClick },
        { text: 'Top 3 most similar reviews for every product category in the following list: Refrigerator Parts & Accessories, Humidifier Parts & Accessories, Range Parts & Accessories, Dishwasher Parts & Accessories', icon: <AssignmentIcon />, onClick: handleSimilarReviewsByCategory },
        { text: 'Track down reviewers who give high ratings in a variety of areas on a regular basis', icon: <AssignmentIcon />, onClick: handleHighlyRatedReviewersClick }
      ].map((item, index) => (
        <ListItem button key={item.text} onClick={item.onClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </>
  );
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ marginRight: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
          <div style={{ width: 48 }} /> {/* Adjust space for centering */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div style={{ width: drawerWidth }}>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
          <Divider />
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon /> },
              { text: 'Illustrations', icon: <BarChartIcon /> },
              { text: 'Settings', icon: <SettingsIcon /> },
              { text: 'Help', icon: <HelpIcon /> },
              { text: 'Quantitative Queries', icon: <LayersIcon />, key: 'quantitative' },
              { text: 'Fuzzy/Exact-Search Queries', icon: <LayersIcon />, key: 'fuzzyExact' },
              { text: 'Hybrid-Search Queries', icon: <LayersIcon />, key: 'hybrid' },
            ].map((item) => (
              <React.Fragment key={item.text}>
                <ListItem button onClick={() => handleCategoryClick(item.key)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                {categories[item.key] && (
                  <List>
                    <React.Fragment>
                      {item.key === 'quantitative' && renderQuantitativeQueries(handleChartClick)}
                      {item.key === 'fuzzyExact' && renderFuzzyExactQueries(handleChartClick, setLastClickedAnswer)}
                      {item.key === 'hybrid' && renderHybridQueries(handleHighlyRatedReviewersClick)}
                    </React.Fragment>
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </div>
      </Drawer>
      <Box sx={{ flexGrow: 1, ml: { sm: 0, xs: -drawerWidth }, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Toolbar />
        <Typography paragraph>
          Main Content Area
        </Typography>
        {lastClickedAnswer && (
          <RenderAnswer type={lastClickedAnswer.type} data={lastClickedAnswer.data} />
        )}
      </Box>
      <Box sx={{ ml: { sm: 0, xs: -drawerWidth } }}>
        <footer style={{ backgroundColor: '#f0f0f0', padding: '10px', borderTop: '1px solid #ccc' }}>
          <Toolbar>
            <Typography variant="body1" align="center">
              Footer
            </Typography>
          </Toolbar>
        </footer>
      </Box>
    </div>
  );
}

const RenderAnswer = ({ type, data }) => {
  switch (type) {
    case 'productSubcategory':
      return (
        <ProductSubcategoryChart data={data} />
      );
    case 'reviewSubcategory':
      return (
        <ReviewsPerSubcategoryChart data={data} />
      );
    case 'averageReviewSize':
      return (
        <AverageReviewSizeChart characterLength={data.characterLength} wordLength={data.wordLength} />
      );
    case 'januaryReviewsCount':
      return (
        <JanuaryReviewsCountChart count={data} />
      );
      case 'fiveStarReviews':
        return (
          <div>
            <h2>Reviews with Ratings Close to Five Stars</h2>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="text" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rating" fill="#8884d8" />
            </BarChart>
          </div>
        );
      case 'johnSmithReviews':
          return (
            <div>
              <h2>Reviews by Reviewers Named "John Smith"</h2>
              <BarChart
                width={800}
                height={400}
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="reviewerID" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="overall" fill="#8884d8" />
              </BarChart>
            </div>
          );

          case 'defectiveRefundReviews':
            return (
              <div>
                <h2>Reviews with "defective" and "refund" keywords</h2>
                <ul>
                  {data.map((review, index) => (
                    <li key={index}>
                      <p>Rating: {review.rating}</p>
                      <p>{review.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          
    case 'highlyRatedReviewers':
  return (
    <div>
      <h2>Reviewers with Consistently High Ratings (average rating &gt;= 4.5)</h2>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="reviewerName" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="overall" fill="#8884d8" />
      </BarChart>
    </div>
  );

  case 'similarReviewsByYear':
      return (
        <div>
          <h2>Top 3 most similar reviews for every year:</h2>
          {Object.entries(data).map(([year, reviews]) => (
            <div key={year}>
              <h3>{year}</h3>
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <p>Reviewer: {review.reviewerName}</p>
                    <p>Review Text: {review.reviewText}</p>
                    <p>Overall Rating: {review.overall}</p>
                    <p>Review Time: {review.reviewTime}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

      case 'similarReviewsByCategory':
        return (
          <div>
            <h2>Top 3 most similar reviews for every category:</h2>
            {Object.entries(data).map(([category, reviews]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {reviews.map((review, index) => (
                    <li key={index}>
                      <p>Reviewer: {review.reviewerName}</p>
                      <p>Review Text: {review.reviewText}</p>
                      <p>Overall Rating: {review.overall}</p>
                      <p>Review Time: {review.reviewTime}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
             
           default:
            return null;
        }
      };

export default App;
