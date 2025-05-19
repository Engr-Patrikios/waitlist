import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  console.log('📦 Received data:', req.body) // 👈 Log the form data

  const scriptURL = process.env.GOOGLE_SCRIPT_URL as string

 try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    const result = await response.text()
    console.log('📤 Google Sheets response:', result)

    if (!response.ok) {
      return res.status(500).json({ error: 'Google Sheets error', details: result })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('❌ Server Error:', err)
    return res.status(500).json({ error: 'Internal error', details: (err as any).message })
  }
}