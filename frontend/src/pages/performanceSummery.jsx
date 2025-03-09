import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { ArrowUpward, SportsCricket } from '@mui/icons-material';
import background from '../assets/wallpapers/2.jpg'; // Add your image path here

const PerformanceSummery = () => {
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    highestRunScorer: { name: 'Player 1', runs: 100 },
    highestWicketTaker: { name: 'Player 2', wickets: 5 },
  });

  useEffect(() => {
    // Fetch data here or calculate stats from a source (for example, API call)
    setStats({
      totalRuns: 1500,
      totalWickets: 70,
      highestRunScorer: { name: 'Player 1', runs: 500 },
      highestWicketTaker: { name: 'Player 3', wickets: 20 },
    });
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        color: 'white',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="bg-gradient-to-r from-maroon-600 py-24 sm:py-32"
      />
      <div className="w-full max-w-7xl p-4 sm:p-8" style={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'orange', mb: 8 }}>
          Tournament Summary
        </Typography>

        {/* Grid Layout for Cards with responsive design */}
        <Grid container spacing={4} justifyContent="center">
          {/* Total Runs */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(to right, #FF5733, #C70039)',
                boxShadow: 6,
                borderRadius: 2,
                padding: 2,
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #C70039, #900000, #3A0000)',
                  opacity: 0.8,
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <SportsCricket sx={{ color: 'white', fontSize: 40 }} />
                  <Typography variant="h5" sx={{ color: 'white', marginLeft: 2 }}>
                    {stats.totalRuns}
                  </Typography>
                </Box>
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
                  Total Runs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Wickets */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(to right, #FF5733, #C70039)',
                boxShadow: 6,
                borderRadius: 2,
                padding: 2,
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #C70039, #900000, #3A0000)',
                  opacity: 0.8,
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowUpward sx={{ color: 'white', fontSize: 40 }} />
                  <Typography variant="h5" sx={{ color: 'white', marginLeft: 2 }}>
                    {stats.totalWickets}
                  </Typography>
                </Box>
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
                  Total Wickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Highest Run Scorer */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(to right, #FF5733, #C70039)',
                boxShadow: 6,
                borderRadius: 2,
                padding: 2,
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #C70039, #900000, #3A0000)',
                  opacity: 0.8,
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                  Highest Run Scorer
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', marginTop: 1 }}>
                  {stats.highestRunScorer.name} - {stats.highestRunScorer.runs} Runs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Highest Wicket Taker */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(to right, #FF5733, #C70039)',
                boxShadow: 6,
                borderRadius: 2,
                padding: 2,
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #C70039, #900000, #3A0000)',
                  opacity: 0.8,
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                  Highest Wicket Taker
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', marginTop: 1 }}>
                  {stats.highestWicketTaker.name} - {stats.highestWicketTaker.wickets} Wickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PerformanceSummery;
