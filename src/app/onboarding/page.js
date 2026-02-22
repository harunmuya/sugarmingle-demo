'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { CameraIcon, MapPinIcon, HeartIcon, CheckIcon, CrownIcon, VerifiedIcon, StarIcon } from '@/lib/icons'

const STEPS = [
    { title: 'Add Your Photo', subtitle: 'A great photo gets 10x more matches' },
    { title: 'About You', subtitle: 'Tell potential matches who you are' },
    { title: 'Your Role', subtitle: 'What are you looking for on SugarMingle?' },
    { title: 'Your Gender & Orientation', subtitle: 'Who do you want to meet?' },
    { title: 'Your Location', subtitle: 'Find matches near you' },
    { title: 'Your Lifestyle', subtitle: 'Share what makes you unique' },
    { title: 'Your Interests', subtitle: 'Pick your top interests to match with like-minded people' },
    { title: "You're All Set!", subtitle: 'Start discovering amazing connections' },
]

const INTERESTS = [
    'Travel', 'Wine', 'Fine Dining', 'Art', 'Fitness', 'Music', 'Fashion',
    'Photography', 'Cooking', 'Dancing', 'Movies', 'Sports', 'Gaming',
    'Reading', 'Yoga', 'Beach', 'Hiking', 'Nightlife', 'Cars', 'Tech',
    'Business', 'Crypto', 'Shopping', 'Spa', 'Volunteering', 'Pets'
]

function OnboardingWizard() {
    const router = useRouter()
    const { user, setUser, showToast } = useApp()
    const fileRef = useRef(null)
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({
        photo: user?.photos?.[0] || null,
        name: user?.name || '',
        bio: user?.bio || '',
        age: user?.age || '',
        role: user?.role || '',
        gender: user?.gender || '',
        orientation: user?.orientation || 'Straight',
        location: user?.location || '',
        job: user?.job || '',
        height: user?.height || '',
        smoke: user?.smoke || 'No',
        drink: user?.drink || 'Socially',
        kids: user?.kids || 'No',
        zodiac: user?.zodiac || '',
        interests: user?.interests || [],
    })

    const update = (key, value) => setForm(f => ({ ...f, [key]: value }))
    const toggleInterest = (int) => setForm(f => ({
        ...f,
        interests: f.interests.includes(int) ? f.interests.filter(i => i !== int) : f.interests.length < 10 ? [...f.interests, int] : f.interests
    }))

    const handlePhoto = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => update('photo', ev.target.result)
        reader.readAsDataURL(file)
    }

    const next = () => {
        if (step < STEPS.length - 1) setStep(step + 1)
    }
    const back = () => {
        if (step > 0) setStep(step - 1)
    }

    const finish = () => {
        setUser({
            ...user,
            name: form.name || user?.name,
            bio: form.bio,
            age: Number(form.age) || user?.age,
            role: form.role || user?.role,
            gender: form.gender || user?.gender,
            orientation: form.orientation,
            location: form.location,
            job: form.job,
            height: form.height,
            smoke: form.smoke,
            drink: form.drink,
            kids: form.kids,
            zodiac: form.zodiac,
            interests: form.interests,
            photos: form.photo ? [form.photo] : (user?.photos || []),
            onboarded: true,
        })
        showToast('Profile complete! Start discovering amazing connections.', 'success')
        router.push('/discover')
    }

    const progress = ((step + 1) / STEPS.length) * 100

    return (
        <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column' }}>
            {/* Progress bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 4, background: 'var(--dark-border)', zIndex: 100 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gradient)', transition: 'width 0.3s ease', borderRadius: 2 }} />
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{ width: '100%', maxWidth: 480 }}>
                    {/* Step header */}
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 8 }}>Step {step + 1} of {STEPS.length}</div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: 4 }}>{STEPS[step].title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{STEPS[step].subtitle}</p>
                    </div>

                    <div className="card" style={{ padding: 28, animation: 'slideUp 0.3s ease' }}>
                        {/* STEP 0: Photo */}
                        {step === 0 && (
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    style={{
                                        width: 160, height: 160, borderRadius: '50%', margin: '0 auto 20px',
                                        border: `3px dashed ${form.photo ? 'var(--primary)' : 'var(--dark-border)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        overflow: 'hidden', background: 'var(--dark-surface)'
                                    }}
                                >
                                    {form.photo ? (
                                        <img src={form.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <CameraIcon size={40} color="var(--text-muted)" />
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>Tap to upload</div>
                                        </div>
                                    )}
                                </div>
                                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Profiles with photos get 10x more matches
                                </p>
                            </div>
                        )}

                        {/* STEP 1: About You */}
                        {step === 1 && (
                            <>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Display Name</label>
                                    <input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Age</label>
                                    <input className="input" type="number" min="18" max="80" value={form.age} onChange={e => update('age', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Bio</label>
                                    <textarea className="textarea" value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Tell people about yourself..." rows={3} maxLength={500} />
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right' }}>{form.bio.length}/500</div>
                                </div>
                            </>
                        )}

                        {/* STEP 2: Role */}
                        {step === 2 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {[
                                    { role: 'Sugar Mummy', desc: 'Successful woman seeking companionship', icon: <CrownIcon size={24} color="#E91E90" /> },
                                    { role: 'Sugar Daddy', desc: 'Wealthy man offering generous arrangements', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E91E90" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" /></svg> },
                                    { role: 'Sugar Baby', desc: 'Young woman seeking luxury & mentorship', icon: <HeartIcon size={24} color="#E91E90" /> },
                                    { role: 'Sugarboy', desc: 'Charming gentleman seeking companionship', icon: <StarIcon size={24} color="#E91E90" /> },
                                ].map(r => (
                                    <div key={r.role} onClick={() => update('role', r.role)} style={{
                                        padding: '20px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'center',
                                        border: `2px solid ${form.role === r.role ? 'var(--primary)' : 'var(--dark-border)'}`,
                                        background: form.role === r.role ? 'rgba(233,30,144,0.08)' : 'var(--dark-surface)',
                                        transition: 'all 0.2s'
                                    }}>
                                        <div style={{ marginBottom: 8 }}>{r.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.role}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{r.desc}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* STEP 3: Gender & Orientation */}
                        {step === 3 && (
                            <>
                                <div className="input-group" style={{ marginBottom: 20 }}>
                                    <label className="input-label">Gender</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                                        {['Woman', 'Man', 'Non-binary', 'Other'].map(g => (
                                            <div key={g} onClick={() => update('gender', g)} style={{
                                                padding: '12px', borderRadius: 12, textAlign: 'center', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                                                border: `2px solid ${form.gender === g ? 'var(--primary)' : 'var(--dark-border)'}`,
                                                background: form.gender === g ? 'rgba(233,30,144,0.08)' : 'var(--dark-surface)',
                                            }}>{g}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Orientation</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Prefer not to say'].map(o => (
                                            <span key={o} onClick={() => update('orientation', o)} style={{
                                                padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                                                border: `1px solid ${form.orientation === o ? 'var(--primary)' : 'var(--dark-border)'}`,
                                                background: form.orientation === o ? 'rgba(233,30,144,0.12)' : 'transparent',
                                                color: form.orientation === o ? 'var(--primary)' : 'var(--text-secondary)',
                                            }}>{o}</span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* STEP 4: Location */}
                        {step === 4 && (
                            <>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <MapPinIcon size={14} color="var(--primary)" /> City & Country
                                    </label>
                                    <input className="input" value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Nairobi, Kenya" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Job / Profession</label>
                                    <input className="input" value={form.job} onChange={e => update('job', e.target.value)} placeholder="What do you do?" />
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ marginTop: 12, fontSize: '0.8rem' }} onClick={() => {
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition((pos) => {
                                            showToast('Location detected!', 'success')
                                        }, () => showToast('Location access denied', 'error'))
                                    }
                                }}>
                                    <MapPinIcon size={14} /> Detect My Location
                                </button>
                            </>
                        )}

                        {/* STEP 5: Lifestyle */}
                        {step === 5 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div className="input-group">
                                    <label className="input-label">Height</label>
                                    <input className="input" value={form.height} onChange={e => update('height', e.target.value)} placeholder={`5'7"`} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Zodiac</label>
                                    <select className="select" value={form.zodiac} onChange={e => update('zodiac', e.target.value)}>
                                        <option value="">Select...</option>
                                        {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(z => <option key={z}>{z}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Smoking</label>
                                    <select className="select" value={form.smoke} onChange={e => update('smoke', e.target.value)}>
                                        {['No', 'Occasionally', 'Yes'].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Drinking</label>
                                    <select className="select" value={form.drink} onChange={e => update('drink', e.target.value)}>
                                        {['No', 'Socially', 'Often'].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="input-label">Kids</label>
                                    <select className="select" value={form.kids} onChange={e => update('kids', e.target.value)}>
                                        {['No', 'Yes', 'Want someday', "Don't want"].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* STEP 6: Interests */}
                        {step === 6 && (
                            <>
                                <div style={{ marginBottom: 12, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pick at least 3 interests ({form.interests.length}/10)</div>
                                <div className="interest-grid">
                                    {INTERESTS.map(int => (
                                        <span key={int} className={`interest-tag ${form.interests.includes(int) ? 'selected' : ''}`}
                                            onClick={() => toggleInterest(int)}>{int}</span>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* STEP 7: Complete */}
                        {step === 7 && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <CheckIcon size={40} color="#fff" />
                                </div>
                                <h3 style={{ marginBottom: 8 }}>Profile Complete!</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>You're ready to start discovering amazing connections on SugarMingle.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', marginBottom: 20 }}>
                                    {[
                                        { icon: <VerifiedIcon size={16} />, text: 'Get verified to boost your visibility' },
                                        { icon: <CrownIcon size={16} color="#FFD700" />, text: 'Upgrade to unlock unlimited likes & features' },
                                        { icon: <HeartIcon size={16} color="#E91E90" />, text: 'Start swiping to find your perfect match' },
                                    ].map(tip => (
                                        <div key={tip.text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--dark-surface)', borderRadius: 10 }}>
                                            {tip.icon}
                                            <span style={{ fontSize: '0.85rem' }}>{tip.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                        {step > 0 && step < 7 && (
                            <button className="btn btn-ghost" onClick={back}>Back</button>
                        )}
                        <div style={{ flex: 1 }} />
                        {step < 7 && (
                            <button className="btn btn-primary" onClick={next}>
                                {step === 0 && !form.photo ? 'Skip for Now' : 'Continue'}
                            </button>
                        )}
                        {step === 7 && (
                            <button className="btn btn-primary btn-lg w-full" onClick={finish} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <HeartIcon size={18} color="#fff" fill="#fff" /> Start Discovering
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OnboardingPage() {
    return <OnboardingWizard />
}
