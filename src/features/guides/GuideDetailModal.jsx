import React, { useState } from 'react';
import { Close, Star, MapPin, Award, CheckCircle2, MessageSquare, Clock, Ticket, ShieldAlert } from '../../components/icons';

export function GuideDetailModal({ guide, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiryDate, setInquiryDate] = useState('');
  const [groupSize, setGroupSize] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!guide) return null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sampleReviews = [
    {
      author: 'Sarah Jenkins (UK)',
      date: 'August 2026',
      rating: 5,
      comment: `Exploring Delhi with ${guide.name} was the highlight of our trip to India. Extraordinary depth of knowledge and warm hospitality!`
    },
    {
      author: 'Amit & Priya Patel (Mumbai)',
      date: 'July 2026',
      rating: 5,
      comment: `Safe, reliable, and deeply passionate storytelling. Revealed hidden spots in ${guide.zoneName} we would never have found on our own.`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#17130F] border border-[#2E271F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close guide details modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-[#1B1613] hover:bg-[#241E1A] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] transition-colors cursor-pointer"
        >
          <Close size={18} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <img
            src={guide.avatarUrl}
            alt={guide.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#2E271F] shrink-0 shadow-lg"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                <Award size={13} />
                <span>{guide.badge}</span>
              </span>
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-[#1B1613] px-2.5 py-0.5 rounded-full border border-[#2E271F]">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{guide.rating} ({guide.toursCompleted} Tours)</span>
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F3EBDC]">
              {guide.name}
            </h2>

            <p className="text-xs text-[#9C9186] font-medium leading-snug">
              {guide.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A24B]">
              <MapPin size={13} />
              <span>{guide.zoneName}</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#241F19] pb-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Bio' },
            { id: 'tours', label: 'Signature Tours' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'inquire', label: 'Book Inquiry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C9A24B] text-[#0F0D0B] shadow-md'
                  : 'bg-[#1B1613] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & BIO */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B]">
                About the Storyteller
              </h3>
              <p className="text-xs sm:text-sm text-[#9C9186] leading-relaxed bg-[#1B1613] p-4 rounded-2xl border border-[#2E271F]">
                {guide.fullBio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#1B1613] border border-[#2E271F] font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#6E655B] uppercase block">Languages Spoken:</span>
                <span className="font-bold text-[#F3EBDC]">{guide.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E655B] uppercase block">Experience & Record:</span>
                <span className="font-bold text-[#F3EBDC]">{guide.yearsExperience} Years • {guide.toursCompleted} Tours</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIGNATURE TOURS */}
        {activeTab === 'tours' && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B]">
              Popular Custom Expeditions
            </h3>
            <div className="space-y-2.5">
              {guide.popularTours.map((tour, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#1B1613] border border-[#2E271F] text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-[#F3EBDC]">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>{tour}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#C9A24B] bg-[#17130F] px-2 py-0.5 rounded border border-[#2E271F]">
                      Custom Duration
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9C9186] pl-6">
                    Tailored itinerary including monument entry, local commentary, and safe photo stops.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B]">
              Verified Traveler Ratings & Feedback
            </h3>
            <div className="space-y-3">
              {sampleReviews.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#1B1613] border border-[#2E271F] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F3EBDC]">{rev.author}</span>
                    <span className="text-[10px] font-mono text-[#9C9186]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-[#9C9186] italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BOOK INQUIRY */}
        {activeTab === 'inquire' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B] flex items-center gap-2">
              <MessageSquare size={14} />
              <span>Send Direct Tour Inquiry</span>
            </h3>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
                <p className="font-bold">Inquiry Sent Successfully!</p>
                <p className="text-[11px] text-emerald-400/80">
                  {guide.name} will respond to your tour inquiry within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-[#9C9186] uppercase block mb-1">Preferred Date:</label>
                    <input
                      type="date"
                      required
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                      className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#9C9186] uppercase block mb-1">Group Size:</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none"
                    >
                      <option value="1">Solo Traveler (1)</option>
                      <option value="2">Couple (2)</option>
                      <option value="4">Family / Small Group (3-5)</option>
                      <option value="10">Large Group (6+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9C9186] uppercase block mb-1">Custom Notes / Special Interests:</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention any specific places or dietary needs..."
                    className="w-full bg-[#1B1613] text-[#F3EBDC] text-xs font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none placeholder-[#6E655B]"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#C9A24B] hover:bg-amber-400 text-[#0F0D0B] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Confirm Inquiry Request
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi ${guide.name}, I want to book a tour on ${inquiryDate || 'upcoming date'} for ${groupSize} guests.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#1B1613] hover:bg-[#241E1A] text-emerald-400 border border-[#2E271F] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Pricing Specs Footer */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#241F19] font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#6E655B] uppercase block">Hourly Rate</span>
            <span className="text-base font-bold text-[#5FA97C]">₹{guide.pricePerHour} / hr</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#6E655B] uppercase block">Full Day (6 Hours)</span>
            <span className="text-base font-bold text-[#F3EBDC]">₹{guide.priceFullDay}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default GuideDetailModal;
