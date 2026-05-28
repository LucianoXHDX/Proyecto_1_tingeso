const Background = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
        }}>
            <div style={{
                minHeight: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}>
                {children}
            </div>
        </div>
    );
};

export default Background;