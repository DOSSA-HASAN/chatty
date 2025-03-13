import React from 'react'
import "./authImagePattern.scss"

function AuthImagePattern({ title, text }) {

    const pattern = new Array(9).fill("")

    return (
        <>
            <main className="grid-cont">
                {
                    pattern.map((item, index) => (
                        <div key={index} className="animate-pulse grid-item"></div>
                    ))
                }
            </main>
            <article className="content-text">
                <h4>{title}</h4>
                <p>{text}</p>
            </article>
        </>
    )
}

export default AuthImagePattern
