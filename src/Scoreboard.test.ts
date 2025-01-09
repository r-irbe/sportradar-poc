import { Scoreboard } from './Scoreboard'
import { Team } from './types/Match'

describe('Scoreboard', () => {
  let scoreboard: Scoreboard
  const TEAM_SPAIN: Team = { name: 'Spain' }
  const TEAM_BRAZIL: Team = { name: 'Brazil' }

  beforeEach(() => {
    scoreboard = new Scoreboard()
  })

  const startMatchWithDefaultScore = (): void => {
    scoreboard.startMatch(TEAM_SPAIN, TEAM_BRAZIL)
  }

  test('should start a new match with 0-0 score', () => {
    startMatchWithDefaultScore()

    const summary = scoreboard.getSummary()

    expect(summary.length).toBe(1)
    expect(summary[0].score).toEqual({ home: 0, away: 0 })
  })

  test('should update match score', () => {
    startMatchWithDefaultScore()

    scoreboard.updateScore(TEAM_SPAIN, TEAM_BRAZIL, { home: 10, away: 2 })
    const summary = scoreboard.getSummary()

    expect(summary[0].score).toEqual({ home: 10, away: 2 })
  })

  test('should finish a match', () => {
    startMatchWithDefaultScore()

    scoreboard.finishMatch(TEAM_SPAIN, TEAM_BRAZIL)

    const summary = scoreboard.getSummary()
    expect(summary.length).toBe(0)
  })

  test('should handle starting the same match more than once', () => {
    startMatchWithDefaultScore()

    expect(() => {
      startMatchWithDefaultScore()
    }).toThrow('Match is already started')

    const summary = scoreboard.getSummary()
    const firstMatch = summary[0]

    expect(summary.length).toBe(1)
    expect(firstMatch.homeTeam.name).toBe('Spain')
    expect(firstMatch.awayTeam.name).toBe('Brazil')
    expect(firstMatch.score).toEqual({ home: 0, away: 0 })
  })

  test('should handle calling finishMatch multiple times for the same match', () => {
    startMatchWithDefaultScore()
    scoreboard.finishMatch(TEAM_SPAIN, TEAM_BRAZIL)

    expect(() => {
      scoreboard.finishMatch(TEAM_SPAIN, TEAM_BRAZIL)
    }).toThrow('Match not found')
  })

  test('should order matches by total score and start time', () => {
    const matches = [
      { home: 'Mexico', away: 'Canada', score: { home: 0, away: 5 } },
      { home: 'Spain', away: 'Brazil', score: { home: 10, away: 2 } },
      { home: 'Germany', away: 'France', score: { home: 2, away: 2 } },
      { home: 'Uruguay', away: 'Italy', score: { home: 6, away: 6 } },
      { home: 'Argentina', away: 'Australia', score: { home: 3, away: 1 } },
    ]

    matches.forEach((m) => {
      scoreboard.startMatch({ name: m.home }, { name: m.away })
      scoreboard.updateScore({ name: m.home }, { name: m.away }, m.score)
    })

    const summary = scoreboard.getSummary()

    expect(summary[0].homeTeam.name).toBe('Uruguay')
    expect(summary[1].homeTeam.name).toBe('Spain')
    expect(summary[2].homeTeam.name).toBe('Mexico')
    expect(summary[3].homeTeam.name).toBe('Argentina')
    expect(summary[4].homeTeam.name).toBe('Germany')
  })
  test('should throw an error when updating score for a non-started match', () => {
    expect(() => {
      scoreboard.updateScore(TEAM_SPAIN, TEAM_BRAZIL, { home: 1, away: 0 })
    }).toThrow('Match not found')
  })
})
