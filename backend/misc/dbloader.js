import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
import { DateTime } from 'luxon';

const API_URL = 'http://localhost:8001/api/v1/player'; // Update with your actual API endpoint

const importPlayersFromCSV = (filePath) => {
    const players = [];
    const stats = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const playerData = {
                name: row["Name"],
                university: row["University"],
                category: row["Category"],
                stats: {
                    "Total Runs": parseInt(row["Total Runs"], 10),
                    "Balls Faced": parseInt(row["Balls Faced"], 10),
                    "Innings Played": parseInt(row["Innings Played"], 10),
                    "Wickets": parseInt(row["Wickets"], 10),
                    "Overs Bowled": parseInt(row["Overs Bowled"], 10),
                    "Runs Conceded": parseInt(row["Runs Conceded"], 10),
                },
                createdAt: DateTime.now().toISO(),
                updatedAt: DateTime.now().toISO(),
            }
            players.push(playerData);
            const playerStats = {
                stats: {
                    "Total Runs": parseInt(row["Total Runs"], 10),
                    "Balls Faced": parseInt(row["Balls Faced"], 10),
                    "Innings Played": parseInt(row["Innings Played"], 10),
                    "Wickets": parseInt(row["Wickets"], 10),
                    "Overs Bowled": parseInt(row["Overs Bowled"], 10),
                    "Runs Conceded": parseInt(row["Runs Conceded"], 10),
                }
            }
            stats.push(playerStats);
        })
        .on('end', async () => {
            console.log(`Read ${players.length} players from CSV. Now importing...`);
            // console.log(players)
            console.log(stats)
            let count = 0;
            for (const player of players) {
                try {
                    const response = await axios.post(`${API_URL}/create-player`, player);
                    const id = response.data.data._id;
                    const originalStats = stats[count];
                    console.log(originalStats);
                    const mappedStats = {
                        stats: {
                            total_runs: originalStats.stats["Total Runs"],
                            balls_faced: originalStats.stats["Balls Faced"],
                            innings_played: originalStats.stats["Innings Played"],
                            wickets: originalStats.stats["Wickets"],
                            overs_bowled: originalStats.stats["Overs Bowled"],
                            runs_conceded: originalStats.stats["Runs Conceded"]
                        }
                    };
                    const response2 = await axios.put(`${API_URL}/update-player/${id}`, mappedStats);
                    count++;
                    console.log(`✅ Imported: ${player.name}`);
                } catch (error) {
                    console.error(`❌ Failed to import ${player.name}:`, error.response?.data || error.message);
                }
            }

            console.log('🎉 Import process completed!');
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
};

const filePath = 'sample_data.csv';

importPlayersFromCSV(filePath);
