import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { ArrowUpward, SportsCricket } from '@mui/icons-material';

const TournamentSummary = () => {
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
    <div className="h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-7xl p-4 sm:p-8">
        <Typography variant="h4" className="text-center text-orange-600 mb-6">
          Tournament Summary
        </Typography>
        <Grid container spacing={4}>
          {/* Total Runs */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-maroon-600 shadow-lg">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <SportsCricket sx={{ color: 'orange', fontSize: 40 }} />
                  <Typography variant="h5" className="ml-4">
                    {stats.totalRuns}
                  </Typography>
                </Box>
                <Typography color="textSecondary" className="text-center mt-2">
                  Total Runs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Wickets */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-orange-600 shadow-lg">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ArrowUpward sx={{ color: 'black', fontSize: 40 }} />
                  <Typography variant="h5" className="ml-4">
                    {stats.totalWickets}
                  </Typography>
                </Box>
                <Typography color="textSecondary" className="text-center mt-2">
                  Total Wickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Highest Run Scorer */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-maroon-600 shadow-lg">
              <CardContent>
                <Typography variant="h6" className="text-center text-orange-600">
                  Highest Run Scorer
                </Typography>
                <Typography variant="h5" className="text-center text-white">
                  {stats.highestRunScorer.name} - {stats.highestRunScorer.runs} Runs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Highest Wicket Taker */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-black shadow-lg">
              <CardContent>
                <Typography variant="h6" className="text-center text-orange-600">
                  Highest Wicket Taker
                </Typography>
                <Typography variant="h5" className="text-center text-white">
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

export default TournamentSummary;
