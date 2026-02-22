'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

// 20 AI-generated seed profiles with real Unsplash photos so new members always see content
const SEED_PROFILES = [
    { id: 'p9', name: 'Eleanor W.', age: 42, role: 'Sugar Mummy', gender: 'Woman', orientation: 'Straight', bio: 'Fashion designer with a passion for haute couture. Looking for someone to share glamorous evenings and quiet Sunday mornings. Must love art galleries.', location: 'Paris, France', distance: 15, photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=face'], interests: ['Fashion', 'Art', 'Wine', 'Travel'], verified: true, premium: 'gold', lastActive: Date.now() - 270000, height: '5\'8"', smoke: 'No', drink: 'Wine', kids: 'No', zodiac: 'Pisces', job: 'Fashion Designer', online: true, attractiveness: 0.93, likes: [], passes: [] },
    { id: 'p10', name: 'Richard A.', age: 52, role: 'Sugar Daddy', gender: 'Man', orientation: 'Straight', bio: 'Tech entrepreneur turned investor. I believe the best things in life are shared. Looking for a bright, ambitious woman who wants to experience the world.', location: 'San Francisco, USA', distance: 25, photos: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face'], interests: ['Tech', 'Travel', 'Golf', 'Wine'], verified: true, premium: 'platinum', lastActive: Date.now() - 450000, height: '6\'2"', smoke: 'No', drink: 'Socially', kids: 'Yes', zodiac: 'Aquarius', job: 'Angel Investor', online: true, attractiveness: 0.87, likes: [], passes: [] },
    { id: 'p11', name: 'Naomi K.', age: 24, role: 'Sugar Baby', gender: 'Woman', orientation: 'Straight', bio: 'Medical student and aspiring surgeon. I study hard and play harder. Love spontaneous trips, sushi dates, and deep late-night conversations.', location: 'Kampala, Uganda', distance: 7, photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face'], interests: ['Medicine', 'Travel', 'Cooking', 'Movies'], verified: true, premium: 'free', lastActive: Date.now() - 600000, height: '5\'5"', smoke: 'No', drink: 'Occasionally', kids: 'No', zodiac: 'Gemini', job: 'Medical Student', online: true, attractiveness: 0.9, likes: [], passes: [] },
    { id: 'p12', name: 'Kevin T.', age: 33, role: 'Sugarboy', gender: 'Man', orientation: 'Straight', bio: 'Pilot and adrenaline junkie. I travel the world and want someone to share sunsets in different time zones. Romantic at heart, adventurous by nature.', location: 'Dar es Salaam, Tanzania', distance: 9, photos: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face'], interests: ['Aviation', 'Travel', 'Photography', 'Diving'], verified: true, premium: 'silver', lastActive: Date.now() - 300000, height: '6\'0"', smoke: 'No', drink: 'Socially', kids: 'No', zodiac: 'Sagittarius', job: 'Commercial Pilot', online: true, attractiveness: 0.86, likes: [], passes: [] },
    { id: 'p13', name: 'Grace O.', age: 36, role: 'Sugar Mummy', gender: 'Woman', orientation: 'Bisexual', bio: 'Banking executive who works hard and rewards generously. I want someone who can match my energy and appreciate the lifestyle I can offer. No drama.', location: 'Abuja, Nigeria', distance: 14, photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop&crop=face'], interests: ['Finance', 'Nightlife', 'Fashion', 'Travel'], verified: true, premium: 'gold', lastActive: Date.now() - 200000, height: '5\'7"', smoke: 'No', drink: 'Yes', kids: 'No', zodiac: 'Scorpio', job: 'VP, First Bank', online: true, attractiveness: 0.88, likes: [], passes: [] },
    { id: 'p14', name: 'Omar H.', age: 47, role: 'Sugar Daddy', gender: 'Man', orientation: 'Straight', bio: 'Hotel chain owner. I can show you the world — literally. Looking for elegance, warmth and genuine companionship. Age is just a number when chemistry is real.', location: 'Cairo, Egypt', distance: 22, photos: ['https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=600&h=800&fit=crop&crop=face'], interests: ['Hospitality', 'Travel', 'Architecture', 'Food'], verified: true, premium: 'platinum', lastActive: Date.now() - 150000, height: '5\'11"', smoke: 'No', drink: 'No', kids: 'Yes', zodiac: 'Taurus', job: 'Hotel Chain Owner', online: true, attractiveness: 0.84, likes: [], passes: [] },
    { id: 'p15', name: 'Isabella R.', age: 28, role: 'Sugar Baby', gender: 'Woman', orientation: 'Straight', bio: 'Law graduate and part-time DJ. I mix beats by night and argue cases by day. Looking for someone who can keep up with my lifestyle and spoil me right.', location: 'Mombasa, Kenya', distance: 4, photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop&crop=face'], interests: ['Music', 'Law', 'Nightlife', 'Fitness'], verified: true, premium: 'silver', lastActive: Date.now() - 500000, height: '5\'6"', smoke: 'No', drink: 'Socially', kids: 'No', zodiac: 'Leo', job: 'Lawyer & DJ', online: false, attractiveness: 0.94, likes: [], passes: [] },
    { id: 'p16', name: 'David N.', age: 30, role: 'Sugarboy', gender: 'Man', orientation: 'Straight', bio: 'Model and brand ambassador. Born to stand out. I bring style, substance and good company to every table. Your friends will love me.', location: 'Cape Town, SA', distance: 11, photos: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=800&fit=crop&crop=face'], interests: ['Fashion', 'Fitness', 'Photography', 'Travel'], verified: true, premium: 'free', lastActive: Date.now() - 800000, height: '6\'1"', smoke: 'No', drink: 'Socially', kids: 'No', zodiac: 'Libra', job: 'Model', online: false, attractiveness: 0.91, likes: [], passes: [] },
    { id: 'p17', name: 'Fatima Z.', age: 40, role: 'Sugar Mummy', gender: 'Woman', orientation: 'Straight', bio: 'Pharmaceutical CEO. I built my empire from scratch. Now looking for a genuine, charming man who can make me laugh and enjoy life with no strings attached.', location: 'Casablanca, Morocco', distance: 19, photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face'], interests: ['Business', 'Yoga', 'Travel', 'Cooking'], verified: true, premium: 'platinum', lastActive: Date.now() - 100000, height: '5\'5"', smoke: 'No', drink: 'Wine only', kids: 'No', zodiac: 'Capricorn', job: 'CEO, ZenPharma', online: true, attractiveness: 0.9, likes: [], passes: [] },
    { id: 'p18', name: 'Anthony B.', age: 55, role: 'Sugar Daddy', gender: 'Man', orientation: 'Straight', bio: 'Retired diplomat now living the good life. I have stories from every continent and want someone to create new chapters with. Generous and gentle.', location: 'Addis Ababa, Ethiopia', distance: 16, photos: ['https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=800&fit=crop&crop=face'], interests: ['Politics', 'Literature', 'Travel', 'Wine'], verified: true, premium: 'gold', lastActive: Date.now() - 400000, height: '5\'10"', smoke: 'No', drink: 'Socially', kids: 'Yes', zodiac: 'Virgo', job: 'Ex-Diplomat', online: false, attractiveness: 0.83, likes: [], passes: [] },
    { id: 'p19', name: 'Chloe M.', age: 23, role: 'Sugar Baby', gender: 'Woman', orientation: 'Bisexual', bio: 'University student studying luxury brand management. I know the difference between Chanel and Prada and I want someone who does too. Smart, sassy, classy.', location: 'Kigali, Rwanda', distance: 3, photos: ['https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=800&fit=crop&crop=face'], interests: ['Fashion', 'Art', 'Coffee', 'Movies'], verified: true, premium: 'free', lastActive: Date.now() - 250000, height: '5\'4"', smoke: 'No', drink: 'Occasionally', kids: 'No', zodiac: 'Aries', job: 'Student', online: true, attractiveness: 0.92, likes: [], passes: [] },
    { id: 'p20', name: 'Brian W.', age: 35, role: 'Sugarboy', gender: 'Man', orientation: 'Straight', bio: 'Software engineer by day, musician by night. I write code and love songs. Looking for a sophisticated woman who appreciates both tech and tenderness.', location: 'Lusaka, Zambia', distance: 13, photos: ['https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&h=800&fit=crop&crop=face'], interests: ['Music', 'Tech', 'Cooking', 'Travel'], verified: true, premium: 'silver', lastActive: Date.now() - 700000, height: '5\'11"', smoke: 'No', drink: 'Socially', kids: 'No', zodiac: 'Pisces', job: 'Software Engineer', online: false, attractiveness: 0.85, likes: [], passes: [] },
]

export function AppProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profiles, setProfiles] = useState(SEED_PROFILES)
    const [matches, setMatches] = useState([])
    const [conversations, setConversations] = useState({})
    const [notifications, setNotifications] = useState([])
    const [tier, setTier] = useState('free') // free | silver | gold | platinum
    const [dailyLikes, setDailyLikes] = useState(0)
    const [dailyMessages, setDailyMessages] = useState(0)
    const [swipeIndex, setSwipeIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)
    const [matchPopup, setMatchPopup] = useState(null)

    useEffect(() => {
        try {
            const saved = localStorage.getItem('sm_user')
            const savedTier = localStorage.getItem('sm_tier')
            const savedMatches = localStorage.getItem('sm_matches')
            const savedConvos = localStorage.getItem('sm_convos')
            const savedDailyLikes = localStorage.getItem('sm_daily_likes')
            const savedDailyMessages = localStorage.getItem('sm_daily_msgs')
            const savedDailyDate = localStorage.getItem('sm_likes_date')

            if (saved) {
                const parsedUser = JSON.parse(saved)
                setUser(parsedUser)
                if (parsedUser?.email === 'marygagency' || parsedUser?.email === 'marygagency@gmail.com') {
                    setTier('platinum')
                    localStorage.setItem('sm_tier', 'platinum')
                }
            }
            if (savedTier) setTier(savedTier)
            if (savedMatches) setMatches(JSON.parse(savedMatches))
            if (savedConvos) setConversations(JSON.parse(savedConvos))

            const today = new Date().toDateString()
            if (savedDailyDate !== today) {
                setDailyLikes(0)
                setDailyMessages(0)
                localStorage.setItem('sm_likes_date', today)
                localStorage.setItem('sm_daily_likes', '0')
                localStorage.setItem('sm_daily_msgs', '0')
            } else {
                if (savedDailyLikes) setDailyLikes(parseInt(savedDailyLikes))
                if (savedDailyMessages) setDailyMessages(parseInt(savedDailyMessages))
            }
        } catch (e) { }
        setLoading(false)
    }, [])

    const saveUser = (u) => { setUser(u); localStorage.setItem('sm_user', JSON.stringify(u)) }
    const saveTier = (t) => { setTier(t); localStorage.setItem('sm_tier', t) }

    const showToast = (msg, type = 'info') => {
        setToast({ msg, type, id: Date.now() })
        setTimeout(() => setToast(null), 3500)
    }

    const DAILY_LIMIT = { free: 5, silver: 999, gold: 999, platinum: 999 }
    const MESSAGE_LIMIT = { free: 3, silver: 50, gold: 999, platinum: 999 }

    const handleLike = (profileId) => {
        if (tier === 'free' && dailyLikes >= DAILY_LIMIT.free) {
            showToast('Swipe limit reached! Upgrade to Silver to unlock unlimited swipes.', 'error')
            return false
        }
        const newCount = dailyLikes + 1
        setDailyLikes(newCount)
        localStorage.setItem('sm_daily_likes', String(newCount))

        const isMatch = Math.random() < 0.3
        if (isMatch) {
            const profile = profiles.find(p => p.id === profileId)
            if (profile && !matches.find(m => m.id === profileId)) {
                const newMatches = [...matches, profile]
                setMatches(newMatches)
                localStorage.setItem('sm_matches', JSON.stringify(newMatches))
                setMatchPopup(profile)
                const newConvos = { ...conversations, [profileId]: [] }
                setConversations(newConvos)
                localStorage.setItem('sm_convos', JSON.stringify(newConvos))
            }
        }
        return true
    }

    const sendMessage = (matchId, text) => {
        if (tier === 'free' && dailyMessages >= MESSAGE_LIMIT.free) {
            showToast('Message limit reached! Choose a plan to continue interacting.', 'error')

            // AI "Limit Hit" Engagement Message
            const profile = profiles.find(p => p.id === matchId)
            if (profile) {
                setTimeout(() => {
                    const reply = {
                        id: Date.now() + 99,
                        text: "I really want to tell you my secret... but you're at your limit! Upgrade so we can keep talking? 😘",
                        sender: matchId,
                        timestamp: Date.now(),
                        read: false
                    }
                    setConversations(prev => {
                        const u = { ...prev, [matchId]: [...(prev[matchId] || []), reply] }
                        localStorage.setItem('sm_convos', JSON.stringify(u))
                        return u
                    })
                }, 5000)
            }
            return false
        }

        const msg = {
            id: Date.now(),
            text,
            sender: 'me',
            timestamp: Date.now(),
            read: false
        }
        const updated = { ...conversations, [matchId]: [...(conversations[matchId] || []), msg] }
        setConversations(updated)
        localStorage.setItem('sm_convos', JSON.stringify(updated))

        const newMsgCount = dailyMessages + 1
        setDailyMessages(newMsgCount)
        localStorage.setItem('sm_daily_msgs', String(newMsgCount))

        // AI Human-like Delayed Reply (30s - 180s randomly)
        const profile = profiles.find(p => p.id === matchId)
        if (profile) {
            const replies = [
                "I was just thinking about you... tell me more. 😉",
                "You're very direct, I like that in a man.",
                "Mm, you caught me at a good time. What's on your mind?",
                "That sounds tempting... shall we meet tonight?",
                "You're making me blush. Are you always this charming?",
                "I'm looking for someone who knows how to treat a lady well.",
                "Let's move this to a more private place? Video call?",
                "I've been lonely lately, you seem like the perfect company.",
                "Wow, you're handsome. Are you free this weekend?",
                "I like where this is going... don't stop.",
            ]

            // AI Human-like Delayed Reply (3 to 8 seconds randomly)
            // min: 3s, max: 8s
            const delay = (3 + Math.random() * 5) * 1000

            setTimeout(() => {
                const reply = {
                    id: Date.now() + 1,
                    text: replies[Math.floor(Math.random() * replies.length)],
                    sender: matchId,
                    timestamp: Date.now(),
                    read: false
                }
                setConversations(prev => {
                    const u = { ...prev, [matchId]: [...(prev[matchId] || []), reply] }
                    localStorage.setItem('sm_convos', JSON.stringify(u))
                    return u
                })
            }, delay)
        }
        return true
    }

    return (
        <AppContext.Provider value={{
            user, setUser: saveUser, profiles, matches, conversations, notifications,
            tier, setTier: saveTier, dailyLikes, dailyMessages, swipeIndex, setSwipeIndex,
            loading, toast, matchPopup, setMatchPopup,
            handleLike, sendMessage, showToast, DAILY_LIMIT, MESSAGE_LIMIT
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
