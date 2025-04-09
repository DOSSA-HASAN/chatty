import React from 'react'
import { THEMES } from "../../constants/index"
import { useThemeStore } from '../../store/useThemeStore'
import "./settings.scss"
import { Send } from "lucide-react"

function Settings() {

  const { theme, setTheme } = useThemeStore();

  const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: true, timestamp: "12:03 am" },
    { id: 2, content: "I'm doing great! Just working on some new features.I'm doing great! Just working on some new features.I'm doing great! Just working on some new features.", isSent: false, timestamp: "12:03 am" }
  ]

  return (
    <section className='settings-section'>
      <main>
        {
          THEMES.map((t) => (
            <button className='theme-btn' data-theme={t} onClick={() => setTheme(t)}>
              <div className='bg-primary'></div>
              <div className='bg-secondary'></div>
              <div className='bg-accent'></div>
              <div className='bg-neutral'></div>
            </button>
          ))
        }
      </main>
      <article className="preview-cont bg-base-200" data-theme={theme} >
        <main className="preview bg-base-100">
          <header className="user-info">
            <div className='user-initial bg-base-300'>J</div>
            <div className='user-status'>
              <p>John Doe</p>
              <p>Online</p>
            </div>
          </header>
          <div className="messages-cont">
            {
              PREVIEW_MESSAGES.map((mssg) => (
                <div key={mssg.id} className={mssg.isSent ? "message sent" : "message not-sent"}>
                  <p className={mssg.isSent ? 'message-content bg-primary text-primary-content' : 'message-content bg-secondary text-secondary-content'}>{mssg.content}</p>
                  <p className='message-timestamp text-base-content'>{mssg.timestamp}</p>
                </div>
              ))
            }
          </div>
          <form className='preview-form'>
            <input type="text" value="This is a preview" readOnly className='border-2 rounded-md p-3 border-base-300 h-13' />
            <button className='btn btn-primary p-3 h-13 rounded-md'>
              <Send  className='send-icon ' size={40} />
            </button>
          </form>
        </main>
      </article>
    </section>
  )
}

export default Settings
