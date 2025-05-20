import WaitlistForm from './WaitlistForm'

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#f5f7ff] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="text-4xl font-bold text-[#4361ee]">PlayConnect</div>
          <div className="text-lg text-[#212529] opacity-80">Bond Through Play, No Matter the Distance</div>
        </header>

        <section className="bg-gradient-to-br from-[#4361ee] to-[#3f37c9] text-white rounded-xl p-6 text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">Be The First To Connect</h1>
          <p>Join our exclusive waitlist for early access to the platform that&rsquo;s revolutionizing how we connect through online gaming.</p>
        </section>

        <WaitlistForm />

        <section className="mt-12">
          <h3 className="text-xl font-semibold text-center mb-6">Waitlist Perks</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {[
              { icon: '🚀', title: 'Early Access', desc: 'Be among the first to experience our platform' },
              { icon: '🎮', title: 'Bonus Games', desc: 'Exclusive access to beta games' },
              { icon: '💎', title: 'Founder Status', desc: 'Special profile badge for waitlist members' },
            ].map((perk) => (
              <div key={perk.title} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-3xl">{perk.icon}</div>
                <h4 className="font-semibold mt-2">{perk.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
