import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '20px 0',
            marginTop: '20px',
            textAlign: 'center'
        }}>
            <div>
                <h3>FitHub</h3>
                <p>All rights reserved RBK 2024</p>
            </div>
            <div style={{ marginTop: '10px' }}>
                <a href="#" style={{ margin: '0 10px', color: 'white' }}>Facebook</a>
                <a href="#" style={{ margin: '0 10px', color: 'white' }}>Tik Tok</a>
                <a href="#" style={{ margin: '0 10px', color: 'white' }}>Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;
