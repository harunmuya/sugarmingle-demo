/**
 * Sugar Mingle Extra Matching Algorithm
 * Ranked composite score for profile discovery
 */

export function scoreProfile(profile, currentUser) {
    let score = 0

    // 1. Profile completeness (0–20 pts)
    const fields = ['bio', 'job', 'height', 'zodiac', 'smoke', 'drink', 'kids']
    const filled = fields.filter(f => profile[f] && profile[f] !== '').length
    score += (filled / fields.length) * 20

    // 2. Photos (0–15 pts)
    const photoCount = (profile.photos || []).length
    score += Math.min(photoCount * 5, 15)

    // 3. Verified badge (10 pts)
    if (profile.verified) score += 10

    // 4. Premium tier (0–8 pts)
    const tierBoost = { free: 0, silver: 3, gold: 6, platinum: 8 }
    score += tierBoost[profile.premium] || 0

    // 5. Attractiveness score (0–25 pts)
    score += (profile.attractiveness || 0.5) * 25

    // 6. Recency/Activity (0–20 pts)
    const hoursSinceActive = (Date.now() - (profile.lastActive || 0)) / 3600000
    if (hoursSinceActive < 1) score += 20
    else if (hoursSinceActive < 6) score += 15
    else if (hoursSinceActive < 24) score += 10
    else if (hoursSinceActive < 72) score += 5

    // 7. Distance (0–10 pts) — closer is better
    const dist = profile.distance || 50
    score += Math.max(0, 10 - dist / 5)

    // 8. New user boost (3-day)
    if (profile.isNew) score += 15

    // 9. Behavior (reports reduce score)
    score -= (profile.reports || 0) * 5

    return Math.max(0, score)
}

export function rankProfiles(profiles, currentUser) {
    return [...profiles]
        .map(p => ({ ...p, _score: scoreProfile(p, currentUser) }))
        .sort((a, b) => b._score - a._score)
}

export function filterProfiles(profiles, filters, currentUser) {
    return profiles.filter(p => {
        // Strict Role-Based Matching
        if (currentUser?.role === 'Sugar Mummy' || currentUser?.role === 'Woman') {
            // Women see Sugarboys and Men
            if (p.role !== 'Sugarboy' && p.role !== 'Man') return false
        } else if (currentUser?.role === 'Sugar Daddy' || currentUser?.role === 'Man') {
            // Men see Sugar Babies and Sugar Mummies
            if (p.role !== 'Sugar Baby' && p.role !== 'Sugar Mummy') return false
        } else if (currentUser?.role === 'Sugarboy') {
            // Sugarboys see Sugar Mummies
            if (p.role !== 'Sugar Mummy') return false
        } else if (currentUser?.role === 'Sugar Baby') {
            // Sugar Babies see Sugar Daddies
            if (p.role !== 'Sugar Daddy') return false
        }

        if (filters.minAge && p.age < filters.minAge) return false
        if (filters.maxAge && p.age > filters.maxAge) return false
        if (filters.maxDistance && p.distance > filters.maxDistance) return false
        if (filters.gender && filters.gender !== 'Everyone' && p.gender !== filters.gender) return false
        if (filters.role && p.role !== filters.role) return false
        if (filters.intention && p.intention !== filters.intention) return false
        return true
    })
}
