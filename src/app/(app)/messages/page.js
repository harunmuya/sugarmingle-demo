'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/lib/context'
import { SendIcon, VideoIcon, VerifiedIcon, MapPinIcon, MessageIcon, HeartIcon, PhoneOffIcon, MicIcon, RadioIcon, CrownIcon } from '@/lib/icons'
import UpgradeModal from '@/components/UpgradeModal'

export default function MessagesPage() {
    const router = useRouter()
    const { matches, profiles, conversations, sendMessage, user, tier, dailyMessages, MESSAGE_LIMIT, showToast } = useApp()
    const [activeChat, setActiveChat] = useState(null)
    const [msgInput, setMsgInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [recording, setRecording] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [showVideoCall, setShowVideoCall] = useState(false)
    const [upgradeType, setUpgradeType] = useState(null)
    const messagesEndRef = useRef(null)
    const searchParams = useSearchParams()
    const initialChat = searchParams.get('chat')

    // On mount, if there's a chat ID in the URL, set it as active
    useEffect(() => {
        if (initialChat) {
            setActiveChat(initialChat)
            setShowSidebar(false)
        }
    }, [initialChat])

    const freeMessagesLeft = Math.max(0, MESSAGE_LIMIT.free - dailyMessages)

    // Build chat list from real matches only
    const chatList = matches
        .map(m => {
            const profile = profiles.find(p => p.id === m.id)
            if (!profile) return null
            const convo = conversations[m.id] || []
            const lastMsg = convo[convo.length - 1]
            return { ...profile, convo, lastMsg, matchedAt: m.matchedAt }
        })
        .filter(Boolean)
        .sort((a, b) => {
            const aTime = a.lastMsg?.timestamp || a.matchedAt || 0
            const bTime = b.lastMsg?.timestamp || b.matchedAt || 0
            return bTime - aTime
        })

    const active = activeChat ? (chatList.find(c => c.id === activeChat) || profiles.find(p => p.id === activeChat)) : null
    const activeConvo = active ? (conversations[active.id] || []) : []

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        // Stop typing indicator when a new message from the match is received
        if (activeConvo.length > 0) {
            const last = activeConvo[activeConvo.length - 1]
            if (last.sender !== 'me') setTyping(false)
        }
    }, [activeConvo.length, activeChat])

    useEffect(() => {
        // Clear typing indicator when switching chats
        setTyping(false)
    }, [activeChat])

    const handleSend = () => {
        if (!msgInput.trim() || !active) return

        const success = sendMessage(active.id, msgInput.trim())
        if (success) {
            setMsgInput('')
            // Simulate typing indicator after a short delay, representing AI "thinking" before actually starting to type
            setTimeout(() => {
                setTyping(true)
                // Typing will stop when the message actually arrives (logic in context)
                // But for UI feedback we can stop it after a few seconds or when convo changes
            }, 2000)
        } else {
            setUpgradeType('Unlimited Messages')
        }
    }

    const sendAudio = () => {
        if (tier === 'free') {
            setUpgradeType('Audio Messages')
            return
        }
        setRecording(true)
        setTimeout(() => {
            setRecording(false)
            sendMessage(active.id, "🎤 [Audio Message 0:12]")
            showToast('Audio message sent!', 'success')
        }, 2000)
    }

    const formatTime = (ts) => {
        if (!ts) return ''
        const d = new Date(ts)
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const startVideoCall = async () => {
        if (tier === 'free' || tier === 'silver') {
            setUpgradeType('Video Calling')
            return
        }
        setShowVideoCall(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            if (localVideoRef.current) localVideoRef.current.srcObject = stream
        } catch (e) {
            showToast('Camera access denied. Please allow camera to make video calls.', 'error')
        }
    }

    const endVideoCall = () => {
        if (localVideoRef.current?.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(t => t.stop())
        }
        setShowVideoCall(false)
    }

    return (
        <div className="chat-layout">
            {/* SIDEBAR */}
            <div className={`chat-sidebar ${showSidebar ? 'mobile-open' : ''}`}>
                <div className="chat-sidebar-header">
                    <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <MessageIcon size={18} color="var(--primary)" /> Messages
                    </h3>
                </div>
                {chatList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <MessageIcon size={40} color="var(--text-muted)" />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 12 }}>No conversations yet. Match with someone to start chatting!</p>
                    </div>
                ) : (
                    chatList.map(c => (
                        <div key={c.id} className={`chat-item ${activeChat === c.id ? 'active' : ''}`}
                            onClick={() => { setActiveChat(c.id); setShowSidebar(false) }}>
                            <div style={{ position: 'relative' }}>
                                <img src={c.photos[0]} alt={c.name} className="avatar avatar-md" />
                                {c.online && <div style={{
                                    position: 'absolute', bottom: 0, right: 0, width: 10, height: 10,
                                    borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--dark-card)'
                                }} />}
                            </div>
                            <div className="chat-item-info">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span className="chat-item-name">{c.name.split(' ')[0]}</span>
                                    {c.verified && <VerifiedIcon size={12} />}
                                </div>
                                <div className="chat-item-preview">
                                    {c.lastMsg ? (c.lastMsg.fromMe ? 'You: ' : '') + c.lastMsg.text : `Matched! Say hi to ${c.name.split(' ')[0]}`}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                                <span className="chat-item-time">{c.lastMsg ? formatTime(c.lastMsg.ts) : ''}</span>
                                {c.convo.filter(m => !m.fromMe && !m.read).length > 0 && (
                                    <div className="chat-unread">{c.convo.filter(m => !m.fromMe && !m.read).length}</div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CHAT WINDOW */}
            <div className="chat-window">
                {!active ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                        <MessageIcon size={64} color="var(--text-muted)" />
                        <h3 style={{ color: 'var(--text-secondary)' }}>Select a conversation</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Choose someone from your matches to start chatting</p>
                    </div>
                ) : (
                    <>
                        {/* Chat header */}
                        <div className="chat-header">
                            <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}
                                className="mobile-back" onClick={() => setShowSidebar(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <img src={active.photos[0]} alt={active.name} className="avatar avatar-md avatar-ring" />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{active.name}</span>
                                    {active.verified && <VerifiedIcon size={14} />}
                                    {active.premium && active.premium !== 'free' && <CrownIcon size={12} />}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: active.online ? 'var(--success)' : 'var(--text-muted)' }}>
                                    {active.online ? 'Online now' : 'Last seen recently'}
                                </div>
                            </div>
                            {tier === 'free' && (
                                <div style={{ marginRight: 12, textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: freeMessagesLeft <= 1 ? 'var(--error)' : 'var(--primary)' }}>
                                        {freeMessagesLeft} msgs left
                                    </div>
                                    <button onClick={() => setUpgradeType('Unlimited Messages')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 800, padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>
                                        UPGRADE
                                    </button>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="btn btn-ghost btn-icon-sm" onClick={startVideoCall}>
                                    <VideoIcon size={18} color="var(--primary)" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {/* Match notification */}
                            <div style={{ textAlign: 'center', padding: '16px 0' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--dark-surface)', borderRadius: 20, padding: '6px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <HeartIcon size={12} color="var(--primary)" fill="var(--primary)" /> You matched with {active.name.split(' ')[0]}
                                </div>
                            </div>

                            {activeConvo.map((msg, i) => {
                                const isMe = msg.sender === 'me'
                                return (
                                    <div key={i} className={`message ${isMe ? 'sent' : 'received'}`} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: isMe ? 'flex-end' : 'flex-start',
                                        marginBottom: 12
                                    }}>
                                        <div className="message-bubble" style={{
                                            maxWidth: '75%',
                                            padding: '10px 16px',
                                            borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                            background: isMe ? 'var(--primary)' : 'var(--bg-surface)',
                                            color: isMe ? '#fff' : 'var(--text-primary)',
                                            fontSize: '0.92rem',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                            position: 'relative'
                                        }}>
                                            {msg.text}
                                            <div style={{
                                                fontSize: '0.65rem',
                                                marginTop: 4,
                                                textAlign: 'right',
                                                opacity: 0.7,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: 4
                                            }}>
                                                {formatTime(msg.timestamp)}
                                                {isMe && <span>{msg.read ? '✓✓' : '✓'}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Typing indicator */}
                            {typing && (
                                <div className="message received">
                                    <div className="message-bubble">
                                        <div className="typing-indicator">
                                            <div className="typing-dot" />
                                            <div className="typing-dot" />
                                            <div className="typing-dot" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area" style={{ position: 'relative' }}>
                            {recording && (
                                <div style={{
                                    position: 'absolute', top: -40, left: 16, right: 16,
                                    background: 'var(--error)', borderRadius: 20, padding: '4px 16px',
                                    display: 'flex', alignItems: 'center', gap: 8, color: '#fff',
                                    fontSize: '0.8rem', fontWeight: 600, animation: 'pulse 1s infinite'
                                }}>
                                    <RadioIcon size={14} color="#fff" /> Recording audio...
                                </div>
                            )}
                            <button className="btn btn-ghost btn-icon" onClick={sendAudio}
                                style={{ color: recording ? 'var(--error)' : 'var(--text-muted)' }}>
                                <MicIcon size={20} />
                            </button>
                            <textarea
                                className="chat-input"
                                placeholder={tier === 'free' && dailyMessages >= MESSAGE_LIMIT.free ? 'Upgrade to send more messages' : `Message ${active.name.split(' ')[0]}...`}
                                value={msgInput}
                                onChange={e => setMsgInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                                rows={1}
                                disabled={tier === 'free' && dailyMessages >= MESSAGE_LIMIT.free}
                            />
                            <button className={`btn btn-primary btn-icon ${tier === 'free' && dailyMessages >= MESSAGE_LIMIT.free ? 'disabled' : ''}`}
                                onClick={handleSend}
                                style={{ width: 44, height: 44, padding: 0 }}
                                disabled={tier === 'free' && dailyMessages >= MESSAGE_LIMIT.free}>
                                <SendIcon size={18} color="#fff" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* VIDEO CALL MODAL */}
            {showVideoCall && (
                <div className="video-modal-overlay">
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <h3>Video Call with {active?.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Connecting...</p>
                    </div>
                    <div className="video-remote" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={active?.photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(8px)', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', textAlign: 'center' }}>
                            <img src={active?.photos[0]} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }} />
                            <div style={{ marginTop: 12, fontWeight: 600 }}>Ringing...</div>
                        </div>
                    </div>
                    <div className="video-local">
                        <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="video-controls">
                        <button className="swipe-btn" style={{ width: 56, height: 56, background: 'var(--error)' }} onClick={endVideoCall}>
                            <PhoneOffIcon size={24} color="#fff" />
                        </button>
                    </div>
                </div>
            )}

            {upgradeType && <UpgradeModal feature={upgradeType} onClose={() => setUpgradeType(null)} />}
        </div>
    )
}
