'use client'

import { useState } from 'react'

interface FormData {
  email: string
  name: string
  connect_with: string[]
  distance: string
  devices: string[]
  game_experience: number
  game_preferences: string[]
  connection_challenges?: string
  hear_about?: string
  early_tester: boolean
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({
    email: '',
    name: '',
    connect_with: [],
    distance: '',
    devices: [],
    game_experience: 3,
    game_preferences: [],
    connection_challenges: '',
    hear_about: '',
    early_tester: false
  })

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const target = e.target

  if (target instanceof HTMLInputElement && target.type === 'checkbox' && target.name !== 'early_tester') {
    const arrayName = target.name as keyof FormData
    const selectedValues = new Set(form[arrayName] as string[])
    target.checked ? selectedValues.add(target.value) : selectedValues.delete(target.value)
    setForm({ ...form, [arrayName]: Array.from(selectedValues) })
  } else if (target instanceof HTMLInputElement && target.name === 'early_tester') {
    setForm({ ...form, early_tester: target.checked })
  } else {
    setForm({ ...form, [target.name]: target.value })
  }
}


  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, game_experience: parseInt(e.target.value) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // ✅ Manual validation for required checkbox groups
  if (form.connect_with.length === 0) {
    alert('Please select at least one option for who you want to connect with.')
    return
  }

  if (form.devices.length === 0) {
    alert('Please select at least one device you use.')
    return
  }

  if (form.game_preferences.length === 0) {
    alert('Please select at least one game type you like.')
    return
  }

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      alert('✅ Thanks for joining the waitlist!')
      setForm({
        email: '',
        name: '',
        connect_with: [],
        distance: '',
        devices: [],
        game_experience: 3,
        game_preferences: [],
        connection_challenges: '',
        hear_about: '',
        early_tester: false
      })
    } else {
      alert('❌ Failed to submit. Please try again.')
    }
  } catch (error) {
    console.error('❌ Submit error:', error)
    alert('❌ Something went wrong. Please try again.')
  }
}



  const checkboxGroup = (name: keyof FormData, options: { id: string; label: string }[]) => (
    <div className="flex flex-wrap gap-4 mt-2">
      {options.map((opt) => (
        <label key={opt.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={opt.id}
            name={name}
            value={opt.id}
            onChange={handleChange}
            checked={(form[name] as string[]).includes(opt.id)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">Join The Waitlist</h2>
      <p className="text-sm text-gray-500">Fill out the form to secure your spot and help us build the perfect platform for you.</p>

      <div>
        <label className="block font-medium mb-1">Email Address *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="px-4 py-2 mt-1 mb-2 border border-gray-300 rounded focus:outline-none focus:border-[#4361ee] w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Name *</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name"className="px-4 py-2 mt-1 mb-2 border border-gray-300 rounded focus:outline-none focus:border-[#4361ee] w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Who do you most want to connect with? *</label>
        {checkboxGroup('connect_with', [
          { id: 'friends', label: 'Friends' },
          { id: 'family', label: 'Family' },
          { id: 'partner', label: 'Partner' },
          { id: 'colleagues', label: 'Colleagues' },
          { id: 'new_people', label: 'New People' }
        ])}
      </div>

      <div>
        <label className="block font-medium mb-1">How far away are they? *</label>
        <select name="distance" required value={form.distance} onChange={handleChange} className="px-4 py-2 mt-1 mb-2 border border-gray-300 rounded focus:outline-none focus:border-[#4361ee] w-full">
          <option value="">Select an option</option>
          <option value="same_city">Same city but busy schedules</option>
          <option value="different_city">Different city (same country)</option>
          <option value="different_country">Different country</option>
          <option value="mixed">Mix of near and far</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Devices you use *</label>
        {checkboxGroup('devices', [
          { id: 'smartphone', label: 'Smartphone' },
          { id: 'tablet', label: 'Tablet' },
          { id: 'laptop', label: 'Laptop' },
          { id: 'desktop', label: 'Desktop' }
        ])}
      </div>

      <div>
        <label className="block font-medium mb-1">Online Game Experience *</label>
        <input
          type="range"
          min="1"
          max="5"
          value={form.game_experience}
          onChange={handleRange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Complete Beginner</span>
          <span>Expert Gamer</span>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Game Types You Like *</label>
        {checkboxGroup('game_preferences', [
          { id: 'casual', label: 'Casual/Simple Games' },
          { id: 'board', label: 'Digital Board Games' },
          { id: 'card', label: 'Card Games' },
          { id: 'puzzle', label: 'Puzzle Games' },
          { id: 'strategy', label: 'Strategy Games' },
          { id: 'party', label: 'Party Games' },
          { id: 'trivia', label: 'Trivia/Quiz Games' }
        ])}
      </div>

      <div>
        <label className="block font-medium mb-1">Connection Challenges (optional)</label>
        <textarea name="connection_challenges" value={form.connection_challenges} onChange={handleChange} placeholder="Tell us about your biggest challenges..." className="px-4 py-2 mt-1 mb-2 border border-gray-300 rounded focus:outline-none focus:border-[#4361ee] w-full" rows={3} />
      </div>

      <div>
        <label className="block font-medium mb-1">How did you hear about us? (optional)</label>
        <select name="hear_about" value={form.hear_about} onChange={handleChange} className="px-4 py-2 mt-1 mb-2 border border-gray-300 rounded w-full">
          <option value="">Select an option</option>
          <option value="social_media">Social Media</option>
          <option value="friend">Friend or Family</option>
          <option value="search">Search Engine</option>
          <option value="blog">Blog or Article</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="early_tester" checked={form.early_tester} onChange={handleChange} />
        <label htmlFor="early_tester">I'm interested in being an early tester and providing feedback</label>
      </div>

      <button type="submit" className="bg-[#f72585] text-white py-2 px-4 rounded hover:bg-[#d81b70] transition w-full">Join Waitlist</button>
    </form>
  )
}
