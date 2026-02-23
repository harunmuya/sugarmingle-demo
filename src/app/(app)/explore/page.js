'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { SearchIcon, FilterIcon, MapPinIcon, VerifiedIcon, CrownIcon, HeartIcon, StarIcon, CheckIcon } from '@/lib/icons'

// Real locations for geolocation filters
const LOCATIONS = [
    'All Locations',
    'Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya',
    'Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria',
    'Accra, Ghana', 'Kumasi, Ghana',
    'Kampala, Uganda', 'Dar es Salaam, Tanzania',
    'Johannesburg, South Africa', 'Cape Town, South Africa',
    'London, UK', 'Manchester, UK',
    'Dubai, UAE', 'Abu Dhabi, UAE',
    'New York, USA', 'Los Angeles, USA', 'Miami, USA',
    'Paris, France', 'Toronto, Canada',
    'Sydney, Australia', 'Mumbai, India',
]

const GENDERS = ['All', 'Woman', 'Man', 'Non-binary']
const ORIENTATIONS = ['All', 'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual']
const AGE_RANGES = ['All', '18-25', '26-35', '36-45', '46-55', '55+']
const PREMIUM_FILTERS = ['All', 'Verified Only', 'Gold+', 'Platinum Only']
const SORT_OPTIONS = ['Best Match', 'Newest', 'Closest', 'Most Active', 'Most Popular']
const INTERESTS_LIST = [
    'Travel', 'Wine', 'Fine Dining', 'Art', 'Fitness', 'Music', 'Fashion',
    'Photography', 'Cooking', 'Dancing', 'Movies', 'Sports', 'Gaming',
    'Reading', 'Yoga', 'Beach', 'Hiking', 'Nightlife', 'Cars', 'Tech',
    'Business', 'Crypto', 'Shopping', 'Spa', 'Volunteering'
]

function TierBadge({ tier }) {
    if (!tier || tier === 'free') return null
    const c = { silver: { l: 'Silver', c: '#C0C0C0' }, gold: { l: 'Gold', c: '#FFD700' }, platinum: { l: 'Platinum', c: '#E5D3FF' } }[tier]
    if (!c) return null
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: `${c.c}22`, border: `1px solid ${c.c}44`, borderRadius: 10, padding: '1px 6px', fontSize: '0.6rem', fontWeight: 700, color: c.c }}><CrownIcon size={8} color={c.c} /> {c.l}</span>
}

export default function ExplorePage() {
    const router = useRouter()
    const { getDiscoverProfiles, user, handleLike, showToast, tier } = useApp()
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        gender: 'All', orientation: 'All', age: 'All',
        location: 'All Locations', premium: 'All', sort: 'Best Match',
        interests: [], onlineOnly: false, verifiedOnly: false,
        minDistance: 0, maxDistance: 500,
    })

    const updateFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }))
    const toggleInterest = (int) => setFilters(f => ({
        ...f,
        interests: f.interests.includes(int) ? f.interests.filter(i => i !== int) : [...f.interests, int]
    }))

    const filtered = useMemo(() => {
        // Start with gender-appropriate profiles (opposite gender by default)
        let result = getDiscoverProfiles(user)

        // Text search
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.bio?.toLowerCase().includes(q) ||
                p.location?.toLowerCase().includes(q) ||
                p.job?.toLowerCase().includes(q)
            )
        }

        // Gender filter (manual override)
        if (filters.gender !== 'All') result = result.filter(p => p.gender === filters.gender)

        // Orientation filter
        if (filters.orientation !== 'All') result = result.filter(p => p.orientation === filters.orientation)

        // Age filter
        if (filters.age !== 'All') {
            const [min, max] = filters.age === '55+' ? [55, 200] : filters.age.split('-').map(Number)
            result = result.filter(p => p.age >= min && p.age <= max)
        }

        // Location filter
        if (filters.location !== 'All Locations') result = result.filter(p => p.location === filters.location)

        // Premium filter
        if (filters.premium === 'Verified Only') result = result.filter(p => p.verified)
        else if (filters.premium === 'Gold+') result = result.filter(p => p.premium === 'gold' || p.premium === 'platinum')
        else if (filters.premium === 'Platinum Only') result = result.filter(p => p.premium === 'platinum')

        // Online only
        if (filters.onlineOnly) result = result.filter(p => p.online)

        // Verified only
        if (filters.verifiedOnly) result = result.filter(p => p.verified)

        // Interests filter
        if (filters.interests.length > 0) {
            result = result.filter(p => p.interests?.some(i => filters.interests.includes(i)))
        }

        // Distance filter
        result = result.filter(p => (p.distance || 0) >= filters.minDistance && (p.distance || 0) <= filters.maxDistance)

        // Sort
        if (filters.sort === 'Newest') result.sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))
        else if (filters.sort === 'Closest') result.sort((a, b) => (a.distance || 999) - (b.distance || 999))
        else if (filters.sort === 'Most Active') result.sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))
        else if (filters.sort === 'Most Popular') result.sort((a, b) => (b.attractiveness || 0) - (a.attractiveness || 0))
        else result.sort((a, b) => (b.attractiveness || 0) - (a.attractiveness || 0)) // Best Match

        return result
    }, [user, getDiscoverProfiles, search, filters])

    return (
        <div style={{ padding: '16px 20px' }}>
            {/* SEARCH BAR */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                        <SearchIcon size={18} color="var(--text-muted)" />
                    </div>
                    <input
                        className="input"
                        style={{ paddingLeft: 42, borderRadius: 'var(--radius-full)' }}
                        placeholder="Search by name, location, role, interests..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button
                    className={`btn ${showFilters ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ borderRadius: 'var(--radius-full)', padding: '12px 20px' }}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FilterIcon size={18} /> Filters
                    {Object.values(filters).filter(v => v !== 'All' && v !== 'All Locations' && v !== 'Best Match' && v !== false && !(Array.isArray(v) && v.length === 0) && v !== 0 && v !== 500).length > 0 && (
                        <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
                            {Object.values(filters).filter(v => v !== 'All' && v !== 'All Locations' && v !== 'Best Match' && v !== false && !(Array.isArray(v) && v.length === 0) && v !== 0 && v !== 500).length}
                        </span>
                    )}
                </button>
            </div>

            {/* ADVANCED FILTERS PANEL */}
            {showFilters && (
                <div className="card" style={{ marginBottom: 20, animation: 'slideUp 0.3s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FilterIcon size={18} color="var(--primary)" /> Advanced Search
                        </h3>
                        <button className="btn btn-ghost btn-sm" onClick={() => setFilters({
                            role: 'All', gender: 'All', orientation: 'All', age: 'All',
                            location: 'All Locations', premium: 'All', sort: 'Best Match',
                            interests: [], onlineOnly: false, verifiedOnly: false,
                            minDistance: 0, maxDistance: 500,
                        })}>Clear All</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                        {/* Gender */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Show Me</label>
                            <select className="select" value={filters.gender} onChange={e => updateFilter('gender', e.target.value)}>
                                {GENDERS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>

                        {/* Orientation */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Orientation</label>
                            <select className="select" value={filters.orientation} onChange={e => updateFilter('orientation', e.target.value)}>
                                {ORIENTATIONS.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>

                        {/* Age */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Age Range</label>
                            <select className="select" value={filters.age} onChange={e => updateFilter('age', e.target.value)}>
                                {AGE_RANGES.map(a => <option key={a}>{a}</option>)}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <MapPinIcon size={12} color="var(--primary)" /> Location
                            </label>
                            <select className="select" value={filters.location} onChange={e => updateFilter('location', e.target.value)}>
                                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>

                        {/* Premium */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Membership</label>
                            <select className="select" value={filters.premium} onChange={e => updateFilter('premium', e.target.value)}>
                                {PREMIUM_FILTERS.map(p => <option key={p}>{p}</option>)}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Sort By</label>
                            <select className="select" value={filters.sort} onChange={e => updateFilter('sort', e.target.value)}>
                                {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Distance */}
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Max Distance: {filters.maxDistance} km</label>
                            <input type="range" className="range-slider" min="1" max="500" value={filters.maxDistance}
                                onChange={e => updateFilter('maxDistance', Number(e.target.value))} />
                        </div>
                    </div>

                    {/* Toggles */}
                    <div style={{ display: 'flex', gap: 16, margin: '12px 0', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <input type="checkbox" checked={filters.onlineOnly} onChange={e => updateFilter('onlineOnly', e.target.checked)}
                                style={{ accentColor: '#E91E90' }} />
                            Online Now
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <input type="checkbox" checked={filters.verifiedOnly} onChange={e => updateFilter('verifiedOnly', e.target.checked)}
                                style={{ accentColor: '#E91E90' }} />
                            <VerifiedIcon size={14} /> Verified Only
                        </label>
                    </div>

                    {/* Interests */}
                    <div style={{ marginTop: 8 }}>
                        <label className="input-label" style={{ marginBottom: 8, display: 'block' }}>Interests</label>
                        <div className="interest-grid">
                            {INTERESTS_LIST.map(int => (
                                <span key={int} className={`interest-tag ${filters.interests.includes(int) ? 'selected' : ''}`}
                                    onClick={() => toggleInterest(int)}>{int}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* RESULTS COUNT */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {filtered.length} profile{filtered.length !== 1 ? 's' : ''} found
                </span>
            </div>

            {/* PROFILE GRID */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <SearchIcon size={48} color="var(--text-muted)" />
                    <h3 style={{ marginTop: 16 }}>No Results</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <div className="profile-grid">
                    {filtered.map(p => (
                        <div key={p.id} className="profile-card" onClick={() => {
                            // Quick like from explore
                        }}>
                            <img src={p.photos[0]} alt={p.name} />
                            {p.online && <div className="online-dot" />}
                            <div className="profile-card-role">{p.role}</div>
                            <div className="profile-card-overlay">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span className="profile-card-name">{p.name}, {p.age}</span>
                                    {p.verified && <VerifiedIcon size={14} />}
                                </div>
                                <div className="profile-card-info" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <MapPinIcon size={10} color="rgba(255,255,255,0.7)" /> {p.location}
                                    {p.distance && <span> · {p.distance} km</span>}
                                </div>
                                <div style={{ marginTop: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                                    <TierBadge tier={p.premium} />
                                </div>
                            </div>
                            {/* Quick action overlay on hover */}
                            <div style={{
                                position: 'absolute', top: 8, left: 8, display: 'flex', gap: 6,
                                opacity: 0, transition: 'opacity 0.2s'
                            }} className="profile-card-actions">
                                <button className="btn-icon-sm" style={{
                                    background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }} onClick={(e) => { e.stopPropagation(); handleLike(p.id) }}>
                                    <HeartIcon size={16} color="#E91E90" />
                                </button>
                                <button className="btn-icon-sm" style={{
                                    background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }} onClick={(e) => { e.stopPropagation(); handleLike(p.id); showToast(`Super Liked ${p.name}!`, 'success') }}>
                                    <StarIcon size={16} color="#4ECDC4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .profile-card:hover .profile-card-actions { opacity: 1 !important; }
            `}</style>
        </div>
    )
}
