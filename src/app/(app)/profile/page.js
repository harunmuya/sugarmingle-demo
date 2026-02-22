'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { CameraIcon, VerifiedIcon, MapPinIcon, CheckIcon, SettingsIcon, CrownIcon, ShieldIcon } from '@/lib/icons'

const INTEREST_OPTIONS = [
    'Travel', 'Wine', 'Fine Dining', 'Art', 'Fitness', 'Music', 'Fashion',
    'Photography', 'Cooking', 'Dancing', 'Movies', 'Sports', 'Gaming',
    'Reading', 'Yoga', 'Beach', 'Hiking', 'Nightlife', 'Cars', 'Tech',
    'Business', 'Crypto', 'Shopping', 'Spa', 'Volunteering', 'Pets'
]

const ROLES = ['Sugar Mummy', 'Sugar Daddy', 'Sugar Baby', 'Sugarboy']
const GENDERS = ['Woman', 'Man', 'Non-binary', 'Other']
const ORIENTATIONS = ['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Prefer not to say']

function TierBadge({ tier }) {
    if (!tier || tier === 'free') return <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Account</span>
    const c = { silver: { l: 'Silver Member', c: '#C0C0C0' }, gold: { l: 'Gold Member', c: '#FFD700' }, platinum: { l: 'Platinum VIP', c: '#E5D3FF' } }[tier]
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: c.c, fontWeight: 700, fontSize: '0.85rem' }}><CrownIcon size={14} color={c.c} /> {c.l}</span>
}

export default function ProfilePage() {
    const router = useRouter()
    const { user, setUser, tier, showToast } = useApp()
    const fileRef = useRef(null)
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        name: user?.name || '',
        age: user?.age || '',
        bio: user?.bio || '',
        role: user?.role || 'Sugar Baby',
        gender: user?.gender || 'Woman',
        orientation: user?.orientation || 'Straight',
        location: user?.location || '',
        job: user?.job || '',
        height: user?.height || '',
        smoke: user?.smoke || 'No',
        drink: user?.drink || 'Socially',
        kids: user?.kids || 'No',
        zodiac: user?.zodiac || '',
        interests: user?.interests || [],
        preferences: user?.preferences || {
            minAge: 18,
            maxAge: 50,
            roles: ['Sugar Baby', 'Sugarboy'],
            maxDistance: 50
        }
    })

    const updateForm = (key, value) => setForm(f => ({ ...f, [key]: value }))
    const toggleInterest = (int) => setForm(f => ({
        ...f,
        interests: f.interests.includes(int) ? f.interests.filter(i => i !== int) : [...f.interests, int]
    }))

    const profileCompletion = () => {
        const fields = ['name', 'age', 'bio', 'role', 'gender', 'orientation', 'location', 'job']
        const filled = fields.filter(f => form[f])
        return Math.round((filled.length / fields.length) * 100)
    }

    const handleSave = () => {
        setUser({
            ...user,
            ...form,
            age: Number(form.age),
        })
        setEditing(false)
        showToast('Profile updated successfully!', 'success')
    }

    const handlePhoto = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
            const photos = [...(user?.photos || []), ev.target.result]
            setUser({ ...user, photos })
            showToast('Photo added!', 'success')
        }
        reader.readAsDataURL(file)
    }

    const removePhoto = (index) => {
        const photos = [...(user?.photos || [])].filter((_, i) => i !== index)
        setUser({ ...user, photos })
    }

    if (!user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', textAlign: 'center', padding: 40 }}>
                <CameraIcon size={64} color="var(--text-muted)" />
                <h2 style={{ marginTop: 20 }}>Create Your Profile</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Sign up to start building your Sugar Mingle Extra profile.</p>
                <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => router.push('/auth/register')}>Get Started</button>
            </div>
        )
    }

    const completion = profileCompletion()

    return (
        <div style={{ padding: '16px 20px', maxWidth: 600, margin: '0 auto' }}>
            {/* HEADER CARD */}
            <div className="card" style={{ textAlign: 'center', padding: '28px 20px', marginBottom: 20 }}>
                {/* Avatar */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                    <img
                        src={user.photos?.[0] || '/icon-512.png'}
                        alt={user.name}
                        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
                    />
                    {user.verified && (
                        <div style={{ position: 'absolute', bottom: 2, right: 2, background: 'var(--dark)', borderRadius: '50%', padding: 2 }}>
                            <VerifiedIcon size={20} />
                        </div>
                    )}
                </div>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>{user.name || 'Your Name'}{user.age ? `, ${user.age}` : ''}</h2>
                <div style={{ marginBottom: 8 }}><TierBadge tier={tier} /></div>
                {user.location && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <MapPinIcon size={14} /> {user.location}
                    </div>
                )}
                {user.role && <div style={{ marginTop: 8 }}><span className="badge badge-primary">{user.role}</span></div>}

                {/* Profile completion */}
                <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)' }}>Profile Completion</span>
                        <span style={{ color: completion === 100 ? 'var(--success)' : 'var(--primary)', fontWeight: 600 }}>{completion}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${completion}%` }} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => setEditing(!editing)}>
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push('/settings')}>
                        <SettingsIcon size={14} /> Settings
                    </button>
                    {tier === 'free' && (
                        <button className="btn btn-ghost btn-sm" style={{ color: '#FFD700' }} onClick={() => router.push('/pricing')}>
                            <CrownIcon size={14} color="#FFD700" /> Upgrade
                        </button>
                    )}
                </div>
            </div>

            {/* VERIFICATION CARD */}
            {!user.verified && (
                <div className="card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(233,30,144,0.05)', borderColor: 'rgba(233,30,144,0.2)' }}>
                    <ShieldIcon size={28} color="#E91E90" />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Get Verified</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified profiles get 3x more matches. Take a selfie to earn your badge.</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => showToast('Verification submitted! Review takes 2-24 hours.', 'success')}>Verify Now</button>
                </div>
            )}

            {/* PHOTOS */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '1rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CameraIcon size={16} color="var(--primary)" /> Photos
                </h3>
                <div className="photo-grid">
                    {[0, 1, 2, 3, 4, 5].map(i => {
                        const photo = user.photos?.[i]
                        return (
                            <div key={i} className={`photo-slot ${photo ? 'filled' : ''}`} onClick={() => !photo && fileRef.current?.click()}>
                                {photo ? (
                                    <>
                                        <img src={photo} alt={`Photo ${i + 1}`} />
                                        <button className="photo-remove" onClick={(e) => { e.stopPropagation(); removePhoto(i) }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </>
                                ) : (
                                    <div className="add-icon"><CameraIcon size={24} color="var(--text-muted)" /></div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
            </div>

            {/* EDIT FORM */}
            {editing && (
                <div className="card" style={{ marginBottom: 20, animation: 'slideUp 0.3s ease' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Edit Profile</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Name</label>
                            <input className="input" value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="Your name" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Age</label>
                            <input className="input" type="number" min="18" max="80" value={form.age} onChange={e => updateForm('age', e.target.value)} />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">I Am</label>
                            <select className="select" value={form.role} onChange={e => updateForm('role', e.target.value)}>
                                {ROLES.map(r => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Gender</label>
                            <select className="select" value={form.gender} onChange={e => updateForm('gender', e.target.value)}>
                                {GENDERS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Orientation</label>
                            <select className="select" value={form.orientation} onChange={e => updateForm('orientation', e.target.value)}>
                                {ORIENTATIONS.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Location</label>
                            <input className="input" value={form.location} onChange={e => updateForm('location', e.target.value)} placeholder="City, Country" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Job Title</label>
                            <input className="input" value={form.job} onChange={e => updateForm('job', e.target.value)} placeholder="Your profession" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Height</label>
                            <input className="input" value={form.height} onChange={e => updateForm('height', e.target.value)} placeholder={`5'7"`} />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Smoking</label>
                            <select className="select" value={form.smoke} onChange={e => updateForm('smoke', e.target.value)}>
                                {['No', 'Occasionally', 'Yes'].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Drinking</label>
                            <select className="select" value={form.drink} onChange={e => updateForm('drink', e.target.value)}>
                                {['No', 'Socially', 'Often'].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Kids</label>
                            <select className="select" value={form.kids} onChange={e => updateForm('kids', e.target.value)}>
                                {['No', 'Yes', 'Want someday', "Don't want"].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Zodiac</label>
                            <select className="select" value={form.zodiac} onChange={e => updateForm('zodiac', e.target.value)}>
                                <option value="">Select...</option>
                                {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(z => <option key={z}>{z}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="input-group" style={{ marginTop: 8, marginBottom: 8 }}>
                        <label className="input-label">Bio</label>
                        <textarea className="textarea" value={form.bio} onChange={e => updateForm('bio', e.target.value)} placeholder="Tell people about yourself..." rows={3} maxLength={500} />
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>{form.bio.length}/500</div>
                    </div>

                    {/* Interests */}
                    <div style={{ marginTop: 12 }}>
                        <label className="input-label" style={{ marginBottom: 8, display: 'block' }}>Interests ({form.interests.length}/10)</label>
                        <div className="interest-grid">
                            {INTEREST_OPTIONS.map(int => (
                                <span key={int} className={`interest-tag ${form.interests.includes(int) ? 'selected' : ''}`}
                                    onClick={() => form.interests.length < 10 || form.interests.includes(int) ? toggleInterest(int) : null}>{int}</span>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-primary w-full" style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }} onClick={handleSave}>
                        <CheckIcon size={16} color="#fff" /> Save Changes
                    </button>
                </div>
            )}

            {/* BIO DISPLAY */}
            {!editing && user.bio && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>About Me</h3>
                    <p style={{ fontSize: '0.9rem' }}>{user.bio}</p>
                </div>
            )}

            {/* INTERESTS DISPLAY */}
            {!editing && user.interests?.length > 0 && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Interests</h3>
                    <div className="interest-grid">
                        {user.interests.map(int => <span key={int} className="interest-tag selected">{int}</span>)}
                    </div>
                </div>
            )}

            {/* PREFERENCES DISPLAY */}
            {!editing && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3 style={{ fontSize: '1rem', margin: 0 }}>Dating Preferences</h3>
                        <ShieldIcon size={14} color="var(--primary)" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div style={{ padding: '8px 12px', background: 'var(--dark-surface)', borderRadius: 8 }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>Age Range</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.preferences?.minAge || 18} - {user.preferences?.maxAge || 50}</div>
                        </div>
                        <div style={{ padding: '8px 12px', background: 'var(--dark-surface)', borderRadius: 8 }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>Distance</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Up to {user.preferences?.maxDistance || 50} km</div>
                        </div>
                        <div style={{ padding: '8px 12px', background: 'var(--dark-surface)', borderRadius: 8, gridColumn: 'span 2' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>Seeking Roles</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 600, display: 'flex', gap: 6, marginTop: 4 }}>
                                {(user.preferences?.roles || ['Sugar Baby', 'Sugarboy']).map(r => (
                                    <span key={r} style={{ background: 'rgba(233,30,144,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem' }}>{r}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 12, fontStyle: 'italic' }}>
                        * These preferences help our algorithm find the best matches for your lifestyle.
                    </p>
                </div>
            )}

            {/* DETAILS DISPLAY */}
            {!editing && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>My Lifecycle Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {[
                            { label: 'Role', value: user.role },
                            { label: 'Gender', value: user.gender },
                            { label: 'Orientation', value: user.orientation },
                            { label: 'Height', value: user.height },
                            { label: 'Smoking', value: user.smoke },
                            { label: 'Drinking', value: user.drink },
                            { label: 'Kids', value: user.kids },
                            { label: 'Zodiac', value: user.zodiac },
                            { label: 'Job', value: user.job },
                        ].filter(d => d.value).map(d => (
                            <div key={d.label} style={{ padding: '8px 12px', background: 'var(--dark-surface)', borderRadius: 8 }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>{d.label}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
