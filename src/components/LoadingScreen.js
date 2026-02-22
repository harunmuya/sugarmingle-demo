'use client'

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <img src="/icon-512.png" alt="Sugar Mingle Extra" className="loading-logo" style={{ width: 80, height: 80 }} />
            <div className="loading-text">
                <span className="gradient-text">Sugar Mingle</span> Extra
            </div>
        </div>
    )
}
