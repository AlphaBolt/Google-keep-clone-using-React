import React from "react";

// const year = new Date().getFullYear();

function Footer(){
    return (
        <footer>
            <p>Copyright © {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;