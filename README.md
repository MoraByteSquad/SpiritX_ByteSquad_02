"# SpiritX_ByteSquad_02"

## admin

- Players -
    - displays all the players in the game
    - CRUD
        - update details and stats
- Player Stats -
    - display detailed statistics of each player
    - Here the admin can click on a player and learn about the player’s details , stats , value and points
    - Points and Value are dynamically calculated
- Tournament Summary -
    - overall analysis of all players in the tournement,
    - this should provide the admin the overall idea of the statistics
        - Overall runs (Total runs scored by all the players in the tournement)
        - Overall wickets (Total wickets scored by all the players in the tournement)
        - Highest run Scorer
        - Highest wicket taker
- Admin-Only Authentication for the admin pane

- real-time updates without requiring a refresh, ensuring that any changes in player statistics and details instantly reflect in the Admin Panel

## UI

- User auth
    - when logged in user’s team details and everything he/she needs to proceed should be loaded
- players tab
    - users can view all available players
    - When a player is clicked, show their Detailed Profile and stats
    - do not show player point
    - Ensure users can only view players in the "Players" tab (no selection).
- select you team tab
    - player categories
    - when a category is selected all players in that category is listed
    - user can select a player from that list and add to his team
    - only name , university and budget of player is displayed here
    - user is not allowed to add a player already existing in his/her team unless removed from team
- team tab
    - selected players and total points
    - Total points is only displayed when the team is completed (when all 11 players are added)
    - user can remove a player from his/her team
        - undo?
- view - budget
    - budget tracking system for team selection
    - user can see his leftover budget
    - see how much he has spent on each player in his/her team
    - initial budget 9,000,000
- Display team completeness status always (e.g., "7/11 players selected”
- Implement a “Leaderboard” showing username & points.
    - This is ordered in the descending order of the points of each user.
    - The logged in user has to be highlighted

- Implement real-time updates without requiring a refresh, ensuring that any changes in player statistics , details and team updates instantly reflect in the User Interface
- Implement a fully responsive UI for all user-facing pages
