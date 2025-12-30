import React, { useState } from 'react'

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div style={{maxWidth:720,margin:'40px auto',fontFamily:'Arial, sans-serif'}}>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:10}}>
          <label>Name</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div style={{marginBottom:10}}>
          <label>Email</label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div style={{marginBottom:10}}>
          <label>Message</label><br />
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit">Send</button>
      </form>
      <div style={{marginTop:20}}>
        {status === 'sending' && <span>Sending...</span>}
        {status === 'sent' && <span>Sent successfully!</span>}
        {status === 'error' && <span>There was an error.</span>}
      </div>
    </div>
  )
}
