import { Scoreboard } from './Scoreboard.ts'

const scoreboard = new Scoreboard()

// Start matches
scoreboard.startMatch({ name: 'Mexico' }, { name: 'Canada' })
scoreboard.startMatch({ name: 'Spain' }, { name: 'Brazil' })
scoreboard.startMatch({ name: 'Germany' }, { name: 'France' })
scoreboard.startMatch({ name: 'Uruguay' }, { name: 'Italy' })
scoreboard.startMatch({ name: 'Argentina' }, { name: 'Australia' })

// Update scores
scoreboard.updateScore(
  { name: 'Mexico' },
  { name: 'Canada' },
  { home: 0, away: 5 },
)
scoreboard.updateScore(
  { name: 'Spain' },
  { name: 'Brazil' },
  { home: 10, away: 2 },
)
scoreboard.updateScore(
  { name: 'Germany' },
  { name: 'France' },
  { home: 2, away: 2 },
)
scoreboard.updateScore(
  { name: 'Uruguay' },
  { name: 'Italy' },
  { home: 6, away: 6 },
)
scoreboard.updateScore(
  { name: 'Argentina' },
  { name: 'Australia' },
  { home: 3, away: 1 },
)

// Get and display summary
const summary = scoreboard.getSummary()
console.log('World Cup Scoreboard Summary:')
console.log('-----------------------------')
summary.forEach((match, index) => {
  console.log(
    `${index + 1}. ${match.homeTeam.name} ${match.score.home} - ${match.awayTeam.name} ${match.score.away}`,
  )
})
