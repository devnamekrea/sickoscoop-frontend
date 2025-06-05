import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Send, Upload, Image, Video, FileText, Mic, User, Search, Settings, Plus, X, MoreHorizontal, Flag, Bookmark, Eye } from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://sickoscoop-backend-deo45.ondigitalocean.app/api';

// Move LandingPage outside to prevent re-creation
const LandingPage = React.memo(({ 
  loginForm, 
  setLoginForm, 
  registerForm, 
  setRegisterForm, 
  showRegister, 
  setShowRegister, 
  handleLogin, 
  handleRegister, 
  loading, 
  error,
  onBrowsePublic
}) => (
  <div className="min-h-screen relative overflow-hidden border-4 border-orange-600/80">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-slate-700 to-gray-600 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-zinc-800 to-slate-700 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
      {/* Logo */}
      <div className="mb-8 relative">
        <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          SickoScoop
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 drop-shadow-2xl leading-none">
        <span className="whitespace-nowrap">STOP STALKERS</span>
        <br />
        <span className="text-2xl md:text-4xl block my-2">ON</span>
        <span className="bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent block animate-pulse relative">
          <span className="absolute inset-0 bg-gradient-to-r from-orange-200 via-red-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent blur-sm opacity-80"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-rose-300 via-sky-300 to-violet-300 bg-clip-text text-transparent blur-xs opacity-40"></span>
          SICKOSCOOP
        </span>
      </h1>

      {/* Subtitle - REMOVED revelation & transparency */}

      {/* Browse Public Feed Button - Moved Higher */}
      <div className="mb-8 flex flex-col items-center">
        <button
          onClick={onBrowsePublic}
          className="px-8 py-3 bg-gradient-to-r from-gray-900 via-slate-800 to-black text-white text-lg font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 border-2 border-amber-500/80 hover:border-amber-400 hover:from-gray-800 hover:via-slate-700 hover:to-gray-900 backdrop-blur-md flex items-center space-x-3"
        >
          {/* Mystical Combined Symbol */}
          <div className="relative w-6 h-6">
            {/* Base circle from first icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 blur-sm animate-pulse"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-amber-500 to-red-500 rounded-full opacity-90"></div>
            
            {/* Diamond overlay from second icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70 blur-sm"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-amber-300 via-orange-400 to-red-400 transform rotate-45 opacity-80"></div>
            
            {/* Triangle overlay from third icon */}
            <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
            <div className="absolute inset-1 bg-gradient-to-tl from-orange-300 via-amber-400 to-yellow-400 opacity-70 animate-pulse" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}></div>
          </div>
          <span>Browse Public Feed</span>
        </button>
        <p className="text-slate-400 text-sm mt-2">See what people are sharing • No account required</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 max-w-md">
          {error}
        </div>
      )}

      {/* Auth Forms */}
      <div className="mb-8 w-full max-w-md">
        {!showRegister ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoComplete="email"
              className="w-full p-3 bg-black/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoComplete="current-password"
              className="w-full p-3 bg-black/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-12 py-4 bg-gradient-to-r from-gray-900 via-slate-800 to-black text-white text-xl font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 border-2 border-amber-500/80 hover:border-amber-400 hover:from-gray-800 hover:via-slate-700 hover:to-gray-900 disabled:opacity-50"
            >
              {loading ? 'Entering...' : 'Enter Sicko'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={registerForm.username}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              autoComplete="username"
              className="w-full p-3 bg-black/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              autoComplete="email"
              className="w-full p-3 bg-black/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              autoComplete="new-password"
              className="w-full p-3 bg-black/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full px-12 py-4 bg-gradient-to-r from-gray-900 via-slate-800 to-black text-white text-xl font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 border-2 border-amber-500/80 hover:border-amber-400 hover:from-gray-800 hover:via-slate-700 hover:to-gray-900 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Join Sicko'}
            </button>
          </div>
        )}
        
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="mt-4 text-slate-300 hover:text-white transition-colors"
        >
          {showRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
        </button>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        {[
          { 
            icon: (
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-indigo-400 to-violet-500 rounded-full opacity-80 blur-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-tr from-orange-300 via-orange-400 to-blue-500 rounded-full opacity-90 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-bl from-blue-300 via-purple-400 to-indigo-500 rounded-full opacity-70"></div>
                <div className="absolute inset-3 bg-gradient-to-tl from-orange-300 via-purple-300 to-blue-400 rounded-full animate-pulse"></div>
              </div>
            ), 
            title: 'Anti-Stalker Protection', 
            desc: 'Advanced privacy controls' 
          },
          { 
            icon: (
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-indigo-400 to-violet-500 transform rotate-45 opacity-80 blur-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-tr from-orange-300 via-orange-400 to-blue-500 transform rotate-45 opacity-90 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-bl from-blue-300 via-purple-400 to-indigo-500 transform rotate-45 opacity-70"></div>
                <div className="absolute inset-3 bg-gradient-to-tl from-orange-300 via-purple-300 to-blue-400 transform rotate-45 animate-pulse"></div>
              </div>
            ), 
            title: 'Decency', 
            desc: 'No anonymous trolls' 
          },
          { 
            icon: (
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 opacity-80 blur-sm" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-blue-700 to-amber-500 opacity-90 animate-pulse" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute inset-2 bg-gradient-to-bl from-teal-400 via-cyan-500 to-blue-600 opacity-70" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute inset-3 bg-gradient-to-tl from-blue-900 via-indigo-800 to-slate-800 animate-pulse" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
              </div>
            ), 
            title: 'Genuine Community', 
            desc: 'Keeping everyone safe' 
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 hover:bg-black/30 transition-all duration-300">
            <div className="inline-block border-2 border-amber-500/80 rounded-lg p-3 mb-4 bg-black/30">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
));

// Move ConnectionStatus outside to prevent re-creation
const Header = React.memo(({ 
  currentView, 
  setCurrentView, 
  apiStatus, 
  handleLogout, 
  user 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-zinc-900 shadow-2xl border-b border-amber-500/30 backdrop-blur-md relative z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Left: Logo + Mobile Menu Button */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-300 to-purple-400 bg-clip-text text-transparent">
              SickoScoop
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-center max-w-2xl">
            {/* Navigation Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentView('feed')}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                  currentView === 'feed' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                  currentView === 'profile' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setCurrentView('chat')}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                  currentView === 'chat' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                Chat
              </button>
            </div>

            {/* Desktop Search - Reduced width for better spacing */}
            <div className="hidden lg:block relative ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search sicko..."
                className="w-64 xl:w-72 pl-10 pr-4 py-2 bg-black/40 border border-slate-600/60 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 transition-all duration-200 text-sm"  
              />
            </div>
          </div>

          {/* Right: Actions - Reordered with user icon first */}
          <div className="flex items-center flex-shrink-0 mr-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 mr-3"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Avatar - Now first position */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-xl text-sm bg-gradient-to-r from-amber-500 to-orange-600 border-2 border-amber-500/80 text-white mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
            </div>

            {/* Settings Button - Now second to last */}
            <button className="p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800/50 rounded-lg mr-3">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* Logout Button - Now last position */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 bg-slate-700/40 text-slate-300 border-2 border-amber-600/40 hover:border-amber-500 hover:bg-slate-700/60 hover:text-white font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search sicko..."
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-slate-600/60 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 transition-all duration-200"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 bg-black/20 rounded-xl p-4 border border-slate-600/30">
            <div className="flex flex-col space-y-3">
              {/* Navigation Buttons */}
              <button
                onClick={() => {
                  setCurrentView('feed');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-left flex items-center space-x-3 ${
                  currentView === 'feed' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-lg">📱</span>
                <span>Feed</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('profile');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-left flex items-center space-x-3 ${
                  currentView === 'profile' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-lg">👤</span>
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('chat');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-left flex items-center space-x-3 ${
                  currentView === 'chat' 
                    ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-lg">💬</span>
                <span>Chat</span>
              </button>
              
              {/* Divider */}
              <div className="border-t border-slate-600/40 my-2"></div>
              
              {/* Mobile Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg border-2 border-amber-600/40 bg-slate-700/40 text-slate-300 hover:text-white hover:border-amber-500 hover:bg-slate-700/60 transition-all duration-200 font-medium text-left flex items-center space-x-3"  
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

// Move PostCreator outside to prevent re-creation - THIS FIXES THE TYPING ISSUE
// Updated PostCreator component - replace the existing one in your App.js
// Replace your existing PostCreator component (around line 306) with this:
const PostCreator = React.memo(({ 
  user, 
  newPost, 
  setNewPost, 
  handlePost, 
  loading, 
  fileInputRef, 
  handleFileUpload 
}) => {
  // Add state for file uploads
  const [uploadState, setUploadState] = useState({
    pdf: false,
    audio: false,
    video: false,
    photo: false
  });

  // Create refs for each file input
  const pdfInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Handle file selection for each type
  const handleFileSelect = (type, files) => {
    setUploadState(prev => ({
      ...prev,
      [type]: files && files.length > 0
    }));
    if (handleFileUpload) {
      handleFileUpload(files);
    }
  };

  // Check if post should be enabled (has text OR any file)
  const hasContent = newPost.trim() || 
                    uploadState.pdf || 
                    uploadState.audio || 
                    uploadState.video || 
                    uploadState.photo;

  return (
    <div className="bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40 mb-6">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
        </div>
        <div className="flex-1">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 bg-black/40 border border-slate-600/50 rounded-xl text-white placeholder-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
            rows="3"
          />
          
          <div className="mt-2 flex justify-end">
            <button
              onClick={handlePost}
              disabled={!hasContent || loading}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors border-2 text-base font-semibold ${
                hasContent && !loading
                  ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500 cursor-pointer'
                  : 'bg-slate-700/30 text-slate-500 border-amber-600/30 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{loading ? 'Posting...' : 'Post'}</span>
            </button>
          </div>
          
          <div className="mt-2 pt-2 border-t border-slate-600/30">
            <div className="flex flex-wrap gap-2 justify-end">
              <button 
                onClick={() => pdfInputRef.current?.click()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  uploadState.pdf
                    ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>PDF</span>
                {uploadState.pdf && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => audioInputRef.current?.click()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  uploadState.audio
                    ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70'
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>Audio</span>
                {uploadState.audio && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => videoInputRef.current?.click()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  uploadState.video
                    ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Video</span>
                {uploadState.video && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
              
              <button
                onClick={() => photoInputRef.current?.click()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  uploadState.photo
                    ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70'
                }`}
              >
                <Image className="h-4 w-4" />
                <span>Photo</span>
                {uploadState.photo && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden file inputs */}
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => handleFileSelect('pdf', e.target.files)}
        className="hidden"
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileSelect('audio', e.target.files)}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={(e) => handleFileSelect('video', e.target.files)}
        className="hidden"
      />
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect('photo', e.target.files)}
        className="hidden"
      />
      
      {/* Keep the existing file input for backward compatibility */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
});

// Move Post component outside to prevent re-creation
// Enhanced Post component with comments, sharing, and more features
// Enhanced Post component with "Who Liked" functionality
// Replace your existing Post component in App.js with this updated version

const Post = React.memo(({ post, user, handleLike, handleComment, handleShare, isPublicView = false, onLoginPrompt }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showWhoLiked, setShowWhoLiked] = useState(false); // New state for who liked modal
  const [isLiking, setIsLiking] = useState(false);
  const commentInputRef = useRef(null);

  // Enhanced timestamp function
  const getTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    return postDate.toLocaleDateString();
  };

  // Enhanced like handler with animation
  const handleLikeClick = async () => {
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    
    setIsLiking(true);
    try {
      await handleLike(post._id);
    } finally {
      setTimeout(() => setIsLiking(false), 300);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    
    handleComment?.(post._id, commentText);
    setCommentText('');
  };

  // Handle share click
  const handleShareClick = () => {
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    setShowShareMenu(!showShareMenu);
  };

  // Handle who liked click
  const handleWhoLikedClick = () => {
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    setShowWhoLiked(true);
  };

  // Check if user liked the post
  const isLiked = !isPublicView && post.likes?.some(like => 
    (typeof like === 'string' ? like : like.user || like._id) === (user?._id || user?.id)
  );

  // Get like count and users who liked
  const likeCount = post.likes?.length || 0;
  const commentCount = post.comments?.length || 0;

  // Get users who liked (for the modal)
  const usersWhoLiked = React.useMemo(() => {
    if (!post.likes || post.likes.length === 0) return [];
    
    // Handle different like data structures
    return post.likes.map((like, index) => {
      if (typeof like === 'string') {
        // If it's just a user ID, create a mock user object
        return {
          _id: like,
          username: `User ${index + 1}`,
          avatar: '👤',
          verified: false
        };
      } else if (like.user) {
        // If it has a user object
        return {
          _id: like.user._id || like.user,
          username: like.user.username || `User ${index + 1}`,
          avatar: like.user.avatar || '👤',
          verified: like.user.verified || false
        };
      } else {
        // Direct user object
        return {
          _id: like._id || `user-${index}`,
          username: like.username || `User ${index + 1}`,
          avatar: like.avatar || '👤',
          verified: like.verified || false
        };
      }
    });
  }, [post.likes]);

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 mb-6 hover:border-slate-500/50 transition-all duration-300 group">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* User Avatar */}
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {post.userId?.username?.slice(0, 2).toUpperCase() || 'UN'}
            </div>
            
            {/* User Info & Time */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-white hover:text-slate-200 cursor-pointer">
                  {post.userId?.username || 'Unknown User'}
                </span>
                {post.userId?.verified && (
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <span className="text-slate-400 text-sm">•</span>
                <span className="text-slate-400 text-sm hover:text-slate-300 cursor-pointer" title={new Date(post.createdAt).toLocaleString()}>
                  {getTimeAgo(post.createdAt)}
                </span>
              </div>
              
              {/* Transparency Score */}
              {post.userId?.transparencyScore && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-500">
                    {post.userId.transparencyScore}% transparency
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* More Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 top-10 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-xl z-10 min-w-48">
                <button className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl transition-colors flex items-center space-x-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Save Post</span>
                </button>
                <button className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors flex items-center space-x-2">
                  <Flag className="h-4 w-4" />
                  <span>Report</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Media Files */}
        {post.mediaFiles && post.mediaFiles.length > 0 && (
          <div className="mb-4 grid gap-2 max-w-2xl">
            {post.mediaFiles.map((file, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-slate-600/30">
                {file.type === 'image' && (
                  <img 
                    src={file.url} 
                    alt="Post media" 
                    className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
                  />
                )}
                {file.type === 'video' && (
                  <video controls className="w-full h-auto max-h-96 bg-black">
                    <source src={file.url} />
                    Your browser does not support video playback.
                  </video>
                )}
                {file.type === 'audio' && (
                  <div className="p-4 bg-slate-800/50">
                    <audio controls className="w-full">
                      <source src={file.url} />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}
                {file.type === 'pdf' && (
                  <div className="p-4 bg-slate-800/50 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-sm font-bold">PDF</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{file.filename}</p>
                      <p className="text-slate-400 text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        {(likeCount > 0 || commentCount > 0) && (
          <div className="flex items-center justify-between text-slate-400 text-sm mb-3 pb-3 border-b border-slate-600/30">
            <div className="flex items-center space-x-4">
              {likeCount > 0 && (
                <button 
                  onClick={handleWhoLikedClick}
                  className="flex items-center space-x-1 hover:text-slate-300 transition-colors cursor-pointer group"
                  title={isPublicView ? "Sign up to see who liked this" : "See who liked this post"}
                >
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform">
                      <Heart className="h-3 w-3 text-white" fill="white" />
                    </div>
                  </div>
                  <span className="hover:underline">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                  {isPublicView && (
                    <span className="text-xs text-slate-500 ml-1">🔒</span>
                  )}
                </button>
              )}
              {commentCount > 0 && (
                <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 50) + 20} views</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Like Button */}
            <button 
              onClick={handleLikeClick}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isLiked 
                  ? 'text-red-400 bg-red-500/10 hover:bg-red-500/20' 
                  : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'
              } ${isLiking ? 'scale-110' : ''}`}
              title={isPublicView ? "Sign up to like posts" : "Like this post"}
            >
              <Heart 
                className={`h-5 w-5 transition-all duration-200 ${isLiking ? 'scale-125' : ''}`} 
                fill={isLiked ? 'currentColor' : 'none'} 
              />
              <span className="font-medium">{likeCount || 'Like'}</span>
            </button>

            {/* Comment Button */}
            <button 
              onClick={() => {
                if (isPublicView) {
                  onLoginPrompt?.();
                } else {
                  setShowComments(!showComments);
                  setTimeout(() => commentInputRef.current?.focus(), 100);
                }
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
              title={isPublicView ? "Sign up to comment" : "Comment on this post"}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{commentCount || 'Comment'}</span>
            </button>

            {/* Share Button */}
            <div className="relative">
              <button 
                onClick={handleShareClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-200"
                title={isPublicView ? "Sign up to share" : "Share this post"}
              >
                <Share2 className="h-5 w-5" />
                <span className="font-medium">Share</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute left-0 top-12 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-xl z-10 min-w-48">
                  <button className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl transition-colors">
                    Copy Link
                  </button>
                  <button className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                    Share to Feed
                  </button>
                  <button className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-b-xl transition-colors">
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Public View Notice */}
          {isPublicView && (
            <button
              onClick={onLoginPrompt}
              className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
            >
              Join to interact →
            </button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && !isPublicView && (
          <div className="mt-4 pt-4 border-t border-slate-600/30 space-y-4">
            {/* Comment Input */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
              </div>
              <div className="flex-1">
                <div className="flex space-x-2">
                  <input
                    ref={commentInputRef}
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2 bg-black/40 border border-slate-600/50 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-slate-700 to-zinc-700 text-white rounded-full hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Comments */}
            {post.comments && post.comments.length > 0 && (
              <div className="space-y-3">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {comment.user?.username?.slice(0, 2).toUpperCase() || comment.author?.slice(0, 2).toUpperCase() || 'UN'}
                    </div>
                    <div className="flex-1">
                      <div className="bg-slate-800/50 rounded-2xl px-4 py-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-white text-sm">
                            {comment.user?.username || comment.author || 'Unknown User'}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {getTimeAgo(comment.createdAt || new Date())}
                          </span>
                        </div>
                        <p className="text-slate-200 text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 px-4">
                        <button className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                          Like
                        </button>
                        <button className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Click outside handlers */}
        {(showShareMenu || showMoreMenu) && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => {
              setShowShareMenu(false);
              setShowMoreMenu(false);
            }}
          />
        )}
      </div>

      {/* Who Liked Modal */}
      {showWhoLiked && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowWhoLiked(false)}>
          <div className="bg-gradient-to-r from-slate-900/95 to-zinc-900/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl max-w-md w-full mx-4 max-h-96 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
              <h3 className="text-xl font-semibold text-white">Liked by</h3>
              <button 
                onClick={() => setShowWhoLiked(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-80">
              {usersWhoLiked.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No likes yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {usersWhoLiked.map((likeUser, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors cursor-pointer">
                      {/* User Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {likeUser.username?.slice(0, 2).toUpperCase() || likeUser.avatar || '👤'}
                      </div>
                      
                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{likeUser.username}</span>
                          {likeUser.verified && (
                            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Heart Icon */}
                      <div className="text-red-400">
                        <Heart className="h-5 w-5" fill="currentColor" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

// Move Feed component outside to prevent re-creation
const Feed = React.memo(({ 
  user, 
  newPost, 
  setNewPost, 
  handlePost, 
  loading, 
  fileInputRef, 
  handleFileUpload, 
  posts, 
  handleLike,
  handleComment,
  handleShare,
  feedType,
  setFeedType,
  isPublicView = false,
  onLoginPrompt,
  onBackToHome
}) => (
  <div className="max-w-2xl mx-auto p-6">
    {/* Public View Header */}
    {isPublicView && (
      <div className="mb-6 bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40">
        <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0">
          {/* Left: Mystical Symbol */}
          <div className="relative w-8 h-8 flex-shrink-0 md:mr-0">
            {/* Base circle from first icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 blur-sm animate-pulse"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-amber-500 to-red-500 rounded-full opacity-90"></div>
            
            {/* Diamond overlay from second icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70 blur-sm"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-amber-300 via-orange-400 to-red-400 transform rotate-45 opacity-80"></div>
            
            {/* Triangle overlay from third icon */}
            <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
            <div className="absolute inset-1 bg-gradient-to-tl from-orange-300 via-amber-400 to-yellow-400 opacity-70 animate-pulse" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}></div>
          </div>
          
          {/* Center: Title (responsive) */}
          <div className="flex-1 text-center md:mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">SickoScoop Public Feed</h1>
          </div>
          
          {/* Right: Button */}
          <button
            onClick={onLoginPrompt}
            className="flex-shrink-0 px-4 md:px-6 py-2 bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 text-white rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-orange-300/70 hover:border-red-400 font-semibold text-sm md:text-base"
          >
            Join SickoScoop
          </button>
        </div>
      </div>
    )}

    {/* Post Creator - Only for logged-in users */}
    {!isPublicView && (
      <PostCreator 
        user={user}
        newPost={newPost}
        setNewPost={setNewPost}
        handlePost={handlePost}
        loading={loading}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
      />
    )}
    
    {/* Feed Type Toggle - Only for logged-in users */}
    {!isPublicView && (
      <div className="mb-6 flex justify-center">
        <div className="bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-xl p-2 border border-slate-600/40">
          <div className="flex space-x-1">
            <button
              onClick={() => setFeedType('public')}
              className={`px-6 py-2 rounded-lg transition-all font-medium flex items-center space-x-2 ${
                feedType === 'public' 
                  ? 'bg-gradient-to-r from-slate-700 to-zinc-700 text-white border-2 border-purple-500/70' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <div className="relative w-4 h-4">
                {/* Mini mystical symbol */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute inset-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
              </div>
              <span>Public Feed</span>
            </button>
            <button
              onClick={() => setFeedType('personal')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                feedType === 'personal' 
                  ? 'bg-gradient-to-r from-slate-700 to-zinc-700 text-white border-2 border-purple-500/70' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              👤 My Feed
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Feed Content */}
    {posts.length === 0 ? (
      <div className="text-center text-slate-400 py-8">
        <div className="mb-4 flex justify-center">
          {isPublicView || feedType === 'public' ? (
            <div className="relative w-12 h-12">
              {/* Mystical symbol for loading */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 blur-sm animate-pulse"></div>
              <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-amber-500 to-red-500 rounded-full opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70 blur-sm"></div>
              <div className="absolute inset-1 bg-gradient-to-tr from-amber-300 via-orange-400 to-red-400 transform rotate-45 opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
              <div className="absolute inset-1 bg-gradient-to-tl from-orange-300 via-amber-400 to-yellow-400 opacity-70 animate-pulse" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}></div>
            </div>
          ) : (
            <span className="text-4xl">👤</span>
          )}
        </div>
        <p>
          {isPublicView 
            ? 'Loading public posts...' 
            : feedType === 'public' 
              ? 'Loading public posts...' 
              : 'Loading your personalized feed...'}
        </p>
        <p className="text-sm mt-2 text-slate-500">
          {isPublicView 
            ? 'Discover conversations from the SickoScoop community' 
            : feedType === 'public' 
              ? 'See what everyone is sharing on SickoScoop' 
              : 'Posts from people you follow and your own posts'}
        </p>
      </div>
    ) : (
      <>
        <div className="text-center mb-4">
          <p className="text-slate-400 text-sm flex items-center justify-center space-x-2">
            {isPublicView ? (
              <>
                <div className="relative w-4 h-4">
                  {/* Mini mystical symbol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
                </div>
                <span>Public Feed • {posts.length} posts from the community</span>
              </>
            ) : feedType === 'public' ? (
              <>
                <div className="relative w-4 h-4">
                  {/* Mini mystical symbol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
                </div>
                <span>Public Feed • {posts.length} posts from the community</span>
              </>
            ) : (
              <span>👤 Your Feed • {posts.length} personalized posts</span>
            )}
          </p>
        </div>
        {posts.map(post => (
          <Post 
            key={post._id} 
            post={post} 
            user={user} 
            handleLike={handleLike}
            handleComment={handleComment}
            handleShare={handleShare}
            isPublicView={isPublicView}
            onLoginPrompt={onLoginPrompt}
          />
        ))}
      </>
    )}

    {/* Bottom CTA for public viewers */}
    {isPublicView && posts.length > 0 && (
      <div className="mt-8 text-center bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <p className="text-slate-300 mb-4">Create your account to post, like, comment, and connect with the SickoScoop community.</p>
        <button
          onClick={onLoginPrompt}
          className="px-8 py-3 bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 text-white text-lg font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-orange-300/70 hover:border-red-400"
        >
          Join SickoScoop
        </button>
      </div>
    )}
  </div>
));

// Move Profile component outside to prevent re-creation
const Profile = React.memo(({ user, posts }) => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-600/40 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
        <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
          {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">{user?.username || 'Your Profile'}</h1>
          <p className="text-slate-300 mb-4">Authentic • Transparent • Genuine</p>
          <div className="flex justify-center md:justify-start space-x-4 text-sm text-slate-400">
            <span>{user?.followers?.length || 127} Followers</span>
            <span>{user?.following?.length || 89} Following</span>
            <span>{posts.filter(p => p.userId?.username === user?.username).length || posts.length} Posts</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-600/40 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">About</h2>
        <p className="text-slate-200 leading-relaxed">
          {user?.bio || 'Passionate about genuine connections and transparent communication. Fighting against digital stalking and promoting authentic social interactions. Committed to sophisticated, meaningful discourse.'}
        </p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <h3 className="text-lg font-semibold text-white mb-3">Privacy Score</h3>
        <div className="text-3xl font-bold text-indigo-400 mb-2">{user?.privacyScore || 94}%</div>
        <p className="text-slate-400 text-sm">Excellent protection</p>
      </div>
      <div className="bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <h3 className="text-lg font-semibold text-white mb-3">Transparency</h3>
        <div className="text-3xl font-bold text-slate-400 mb-2">{user?.transparencyScore || 98}%</div>
        <p className="text-slate-400 text-sm">Highly authentic</p>
      </div>
      <div className="bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <h3 className="text-lg font-semibold text-white mb-3">Community</h3>
        <div className="text-3xl font-bold text-purple-400 mb-2">{user?.communityScore || 96}%</div>
        <p className="text-slate-400 text-sm">Great connections</p>
      </div>
    </div>
  </div>
));

// Move Chat component outside to prevent re-creation
const Chat = React.memo(({ 
  chats, 
  selectedChat, 
  setSelectedChat, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage 
}) => (
  <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 h-[calc(100vh-200px)]">
    {/* Chat List */}
    <div className="w-full lg:w-1/3 bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl border border-slate-600/40 overflow-hidden">
      <div className="p-6 border-b border-slate-600/40">
        <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-slate-600/50 rounded-full text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-96 lg:max-h-full">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-slate-400">
            <p>No conversations yet</p>
          </div>
        ) : (
          chats.map(chat => (
            <button
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 text-left hover:bg-slate-700/30 transition-colors border-b border-slate-600/20 ${
                selectedChat?._id === chat._id ? 'bg-slate-700/40' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {chat.participants?.[0]?.username?.slice(0, 2).toUpperCase() || 'UN'}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">
                    {chat.participants?.[0]?.username || 'Unknown User'}
                  </div>
                  <div className="text-sm text-slate-400 truncate">
                    {chat.lastMessage?.content || 'No messages yet'}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>

    {/* Chat Window */}
    <div className="flex-1 bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-2xl border border-slate-600/30 flex flex-col min-h-96">
      {selectedChat ? (
        <>
          <div className="p-6 border-b border-slate-600/40 flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {selectedChat.participants?.[0]?.username?.slice(0, 2).toUpperCase() || 'UN'}
            </div>
            <div>
              <div className="font-semibold text-white">
                {selectedChat.participants?.[0]?.username || 'Unknown User'}
              </div>
              <div className={`text-sm ${selectedChat.isOnline ? 'text-green-400' : 'text-slate-400'}`}>
                {selectedChat.isOnline ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-slate-700/60 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                  <p className="text-white">{selectedChat.lastMessage?.content}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-zinc-700/60 rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                  <p className="text-white">Thanks! Transparency is key 🔑</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-700/60 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                  <p className="text-white">Absolutely! The anti-stalker features are game-changing</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-600/40">
            <div className="flex space-x-4">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Send a transparent message..."
                className="flex-1 p-3 bg-black/40 border border-slate-600/50 rounded-full text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-gradient-to-r from-slate-700 to-zinc-700 text-white rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-amber-600/70 hover:border-amber-500"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  </div>
));

const SickoScoopApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // Store all posts for public feed
  const [newPost, setNewPost] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chats, setChats] = useState([]);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'connected', 'disconnected', 'unknown'
  const [feedType, setFeedType] = useState('public'); // 'public' or 'personal'
  const [isPublicBrowsing, setIsPublicBrowsing] = useState(false); // New state for public browsing
  const fileInputRef = useRef(null);

  // Fix hydration issues by ensuring client-side only operations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safe localStorage operations
  const getStorageItem = (key) => {
    if (typeof window !== 'undefined' && isClient) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('localStorage not available:', error);
        return null;
      }
    }
    return null;
  };

  const setStorageItem = (key, value) => {
    if (typeof window !== 'undefined' && isClient) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn('localStorage not available:', error);
      }
    }
  };

  const removeStorageItem = (key) => {
    if (typeof window !== 'undefined' && isClient) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('localStorage not available:', error);
      }
    }
  };

  // Enhanced API call helper with better error handling and timeout
  const apiCall = async (endpoint, options = {}, customToken = null) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const authToken = customToken || token || getStorageItem('authToken');
      const response = await fetch(`${API_BASE}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
          ...options.headers,
        },
        ...options,
      });

      clearTimeout(timeoutId);

      // Check if response is ok first
      if (!response.ok) {
        let errorMessage = 'Request failed';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        // Don't auto-logout on 401 for initial data loading - might be expected
        if (response.status === 401 && !endpoint.includes('/auth/')) {
          console.warn('401 error on', endpoint, '- skipping auto-logout');
          throw new Error('Unauthorized access');
        }

        throw new Error(errorMessage);
      }

      // Try to parse JSON response
      const responseText = await response.text();
      if (!responseText) {
        return {}; // Empty response
      }

      try {
        return JSON.parse(responseText);
      } catch (e) {
        console.warn('Non-JSON response received:', responseText);
        return { message: responseText };
      }

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        setApiStatus('disconnected');
        throw new Error('Request timeout. Please check your connection.');
      }
      
      if (error.message.includes('fetch')) {
        setApiStatus('disconnected');
        throw new Error('Network error. Please check your connection.');
      }
      
      setApiStatus('disconnected');
      throw error;
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    try {
      await apiCall('/health');
      setApiStatus('connected');
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      setApiStatus('disconnected');
      return false;
    }
  };

  // Initialize app data - only run on client
  useEffect(() => {
    if (!isClient) return;

    const initializeApp = async () => {
      // Test API connection first
      const isApiConnected = await testApiConnection();
      
      const authToken = getStorageItem('authToken');
      const userData = getStorageItem('userData');

      if (authToken && userData && isApiConnected) {
        try {
          const userObj = JSON.parse(userData);
          
          // Set user data first
          setToken(authToken);
          setUser(userObj);
          setIsLoggedIn(true);
          setCurrentView('feed');
          
          // Try to validate token with backend, but don't fail if it doesn't work
          try {
            const response = await apiCall('/auth/verify', {
              method: 'POST',
              body: JSON.stringify({ token: authToken }),
            }, authToken);
            
            if (response.valid) {
              setUser(response.user || userObj);
              setApiStatus('connected');
              // Load real data
              await Promise.all([loadPosts(authToken), loadChats(authToken)]);
              return;
            }
          } catch (error) {
            console.error('Token validation failed, using demo mode:', error);
            setApiStatus('disconnected');
          }
          
          // If token validation fails, still keep user logged in but use mock data
          loadMockData();
          return;
          
        } catch (error) {
          console.error('Invalid stored user data:', error);
          removeStorageItem('authToken');
          removeStorageItem('userData');
        }
      }

      // Production: Start with empty state
setAllPosts([]);
setPosts([]);
setChats([]);
setApiStatus(isApiConnected ? 'connected' : 'disconnected');
    };

    initializeApp();
  }, [isClient]);

  const loadMockData = () => {
  // Production: Start with empty arrays - real data comes from backend
  setAllPosts([]);
  setPosts([]);
  setChats([]);
};

  // Helper function to update displayed posts based on feed type
  const updateDisplayedPosts = (allPostsData, currentFeedType, currentUser) => {
    if (currentFeedType === 'public') {
      // Show all posts for public feed
      setPosts(allPostsData);
    } else {
      // Show only user's posts and posts from followed users for personal feed
      const userPosts = allPostsData.filter(post => 
        post.userId?._id === currentUser?._id || 
        post.userId?.username === currentUser?.username
      );
      
      // Show only user's own posts for personal feed (no fake followed users)
      setPosts(userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  };

  // Update posts when feed type changes
  useEffect(() => {
    if (allPosts.length > 0) {
      updateDisplayedPosts(allPosts, feedType, user);
    }
  }, [feedType, allPosts, user]);

  const loadPosts = async (authToken = null) => {
    try {
      // Try to load from public feed endpoint first
      const publicResponse = await apiCall('/posts/public', {}, authToken);
      let publicPostsData = [];
      
      if (Array.isArray(publicResponse)) {
        publicPostsData = publicResponse;
      } else if (publicResponse.posts && Array.isArray(publicResponse.posts)) {
        publicPostsData = publicResponse.posts;
      } else if (publicResponse.data && Array.isArray(publicResponse.data)) {
        publicPostsData = publicResponse.data;
      }
      
      if (publicPostsData.length > 0) {
        setAllPosts(publicPostsData);
        updateDisplayedPosts(publicPostsData, feedType, user);
        setApiStatus('connected');
        return;
      }

      // Fallback to regular posts endpoint
      const response = await apiCall('/posts', {}, authToken);
      let postsData = [];
      
      if (Array.isArray(response)) {
        postsData = response;
      } else if (response.posts && Array.isArray(response.posts)) {
        postsData = response.posts;
      } else if (response.data && Array.isArray(response.data)) {
        postsData = response.data;
      }
      
      if (postsData.length > 0) {
        setAllPosts(postsData);
        updateDisplayedPosts(postsData, feedType, user);
        setApiStatus('connected');
      }
    } catch (error) {
      console.error('Load posts error:', error);
      // Don't change API status or show error for 401s, just use mock data
      if (!error.message.includes('Unauthorized')) {
        setApiStatus('disconnected');
      }
    }
  };

  const loadChats = async (authToken = null) => {
    try {
      const response = await apiCall('/conversations', {}, authToken);
      let chatsData = [];
      
      if (Array.isArray(response)) {
        chatsData = response;
      } else if (response.conversations && Array.isArray(response.conversations)) {
        chatsData = response.conversations;
      } else if (response.data && Array.isArray(response.data)) {
        chatsData = response.data;
      }
      
      if (chatsData.length > 0) {
        setChats(chatsData);
        setApiStatus('connected');
      }
    } catch (error) {
      console.error('Load chats error:', error);
      // Don't change API status or show error for 401s, just use mock data
      if (!error.message.includes('Unauthorized')) {
        setApiStatus('disconnected');
      }
    }
  };

const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    setError('Please fill in all fields');
    return;
  }

  setLoading(true);
  setError('');

  try {
    console.log('🔐 Attempting login with:', { email: loginForm.email });
    
    // Test API connection first
    const isApiConnected = await testApiConnection();
    
    if (!isApiConnected) {
      throw new Error('Cannot connect to server. Using demo mode.');
    }

    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginForm.email.toLowerCase().trim(),
        password: loginForm.password
      }),
    });

    console.log('📥 Login response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Login failed:', errorData);
      throw new Error(errorData.message || `Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Login successful:', data);

    if (data.token && data.user) {
      // Set everything in the correct order
      setToken(data.token);
      setUser(data.user);
      setStorageItem('authToken', data.token);
      setStorageItem('userData', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setCurrentView('feed');
      setLoginForm({ email: '', password: '' });
      setApiStatus('connected');
      
      // Small delay to ensure state is updated, then load data with the token
      setTimeout(async () => {
        try {
          await Promise.all([
            loadPosts(data.token), 
            loadChats(data.token)
          ]);
        } catch (error) {
          console.warn('Failed to load initial data:', error);
          // Use mock data as fallback
          loadMockData();
        }
      }, 100);
      
    } else {
      throw new Error('Invalid response from server - missing token or user data');
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    
    // Enhanced demo login fallback
    setError(error.message || 'Login failed. Please check your credentials and try again.');
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Basic password validation
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Test API connection first
      const isApiConnected = await testApiConnection();
      
      if (!isApiConnected) {
        throw new Error('Cannot connect to server. Please try again later.');
      }

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Registration failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        setStorageItem('authToken', data.token);
        setStorageItem('userData', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setCurrentView('feed');
        setShowRegister(false);
        setRegisterForm({ username: '', email: '', password: '' });
        setApiStatus('connected');
        
        // Load real data
        await Promise.all([loadPosts(), loadChats()]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeStorageItem('authToken');
    removeStorageItem('userData');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setIsPublicBrowsing(false); // Reset public browsing state
    setCurrentView('landing');
    setApiStatus('unknown');
    setPosts([]);
    setAllPosts([]);
    setChats([]);
    setError('');
    setFeedType('public'); // Reset to public feed
    
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    
    setLoading(true);
    
    // Create the new post data structure
    const newPostData = {
      _id: Date.now().toString(),
      userId: { 
        username: user?.username || 'You', 
        verified: true,
        _id: user?._id || 'demo-user'
      },
      content: newPost,
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    try {
      if (apiStatus === 'connected' && token !== 'demo-token') {
        const response = await apiCall('/posts', {
          method: 'POST',
          body: JSON.stringify({ content: newPost }),
        }, token);

        if (response._id || response.id) {
          const updatedAllPosts = [response, ...allPosts];
          setAllPosts(updatedAllPosts);
          updateDisplayedPosts(updatedAllPosts, feedType, user);
        } else {
          throw new Error('Invalid post response');
        }
      } else {
        // Mock post creation - add to allPosts and update displayed posts
        const updatedAllPosts = [newPostData, ...allPosts];
        setAllPosts(updatedAllPosts);
        updateDisplayedPosts(updatedAllPosts, feedType, user);
      }
      
      setNewPost('');
    } catch (error) {
      console.error('Post error:', error);
      
      // Still create post locally as fallback
      const updatedAllPosts = [newPostData, ...allPosts];
      setAllPosts(updatedAllPosts);
      updateDisplayedPosts(updatedAllPosts, feedType, user);
      setNewPost('');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    const userId = user?._id || user?.id || 'demo-user';
    
    // Update UI optimistically first - update both allPosts and displayed posts
    const updatePostLikes = (postsArray) => {
      return postsArray.map(post => {
        if (post._id === postId) {
          const hasLiked = post.likes.includes(userId);
          return {
            ...post,
            likes: hasLiked 
              ? post.likes.filter(id => id !== userId)
              : [...post.likes, userId]
          };
        }
        return post;
      });
    };

    const updatedAllPosts = updatePostLikes(allPosts);
    const updatedDisplayedPosts = updatePostLikes(posts);
    
    setAllPosts(updatedAllPosts);
    setPosts(updatedDisplayedPosts);

    // Try to sync with backend
    if (apiStatus === 'connected' && token !== 'demo-token') {
      try {
        await apiCall(`/posts/${postId}/like`, {
          method: 'POST',
        }, token);
      } catch (error) {
        console.error('Like error:', error);
        // Revert optimistic update on error
        const revertPostLikes = (postsArray) => {
          return postsArray.map(post => {
            if (post._id === postId) {
              const hasLiked = post.likes.includes(userId);
              return {
                ...post,
                likes: hasLiked 
                  ? [...post.likes, userId]
                  : post.likes.filter(id => id !== userId)
              };
            }
            return post;
          });
        };

        setAllPosts(revertPostLikes(updatedAllPosts));
        setPosts(revertPostLikes(updatedDisplayedPosts));
      }
    }
  };

  const handleFileUpload = async (files) => {
    console.log('Files selected:', files);
    // TODO: Implement file upload to backend
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedChat) return;
    
    // Mock message sending for now
    console.log('Sending message:', chatMessage, 'to:', selectedChat.participants[0]?.username);
    setChatMessage('');
  };

    // Enhanced comment handler
  const handleComment = useCallback((postId, commentText) => {
    const newComment = {
      user: { username: user?.username || 'You', _id: user?._id || user?.id },
      content: commentText,
      createdAt: new Date()
    };

    // Update posts state
    const updatePostComments = (postsArray) => {
      return postsArray.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      });
    };

    setPosts(updatePostComments);
    setAllPosts(updatePostComments);

    // Optional: Send to backend
    if (apiStatus === 'connected' && token !== 'demo-token') {
      apiCall(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: commentText })
      }, token).catch(console.error);
    }
  }, [user, apiStatus, token, setPosts, setAllPosts, apiCall]);

  // Enhanced share handler
  const handleShare = useCallback((postId) => {
    // Copy link to clipboard
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      console.log('Link copied to clipboard!');
      // You could add a toast notification here
    }).catch(console.error);
  }, []);

  // Handle public browsing
  // Handle public browsing
const handleBrowsePublic = async () => {
  setIsPublicBrowsing(true);
  setCurrentView('publicFeed');
  
  // Actually load real posts from API instead of mock data
  try {
    console.log('🌐 Loading public posts for browsing...');
    
    const response = await fetch(`${API_BASE}/posts/public`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const publicPostsData = await response.json();
    console.log('✅ Public posts loaded:', publicPostsData.length);
    
    if (Array.isArray(publicPostsData) && publicPostsData.length > 0) {
      setAllPosts(publicPostsData);
      setPosts(publicPostsData); // Show all public posts in public view
      console.log('✅ Posts set in state:', publicPostsData.length);
    } else {
      console.log('⚠️ No public posts found');
      setAllPosts([]);
      setPosts([]);
    }
  } catch (error) {
    console.error('❌ Error loading public posts:', error);
    // Fallback to empty state
    setAllPosts([]);
    setPosts([]);
  }
};

  // Handle login prompt from public view
  const handleLoginPrompt = () => {
    setIsPublicBrowsing(false);
    setCurrentView('landing');
    setShowRegister(false);
  };

  // Handle back to home from public view
  const handleBackToHome = () => {
    setIsPublicBrowsing(false);
    setCurrentView('landing');
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading SickoScoop...</div>
      </div>
    );
  }

  // Show public browsing view
  if (isPublicBrowsing && currentView === 'publicFeed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative overflow-hidden border-4 border-orange-600/80">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-700 to-zinc-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <main className="container mx-auto">
            <Feed 
              user={null}
              newPost=""
              setNewPost={() => {}}
              handlePost={() => {}}
              loading={false}
              fileInputRef={fileInputRef}
              handleFileUpload={() => {}}
              posts={allPosts}
              handleLike={() => {}}
              handleComment={() => {}}
              handleShare={() => {}}
              feedType="public"
              setFeedType={() => {}}
              isPublicView={true}
              onLoginPrompt={handleLoginPrompt}
              onBackToHome={handleBackToHome}
            />
          </main>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <LandingPage
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        loading={loading}
        error={error}
        onBrowsePublic={handleBrowsePublic}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative overflow-hidden border-4 border-orange-600/80">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-700 to-zinc-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Error display */}
      {error && (
        <div className="relative z-20 mx-auto max-w-md mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
          {error}
          <button onClick={() => setError('')} className="ml-2 text-red-400 hover:text-red-300">×</button>
        </div>
      )}
      
      <div className="relative z-10">
        <Header 
          currentView={currentView}
          setCurrentView={setCurrentView}
          apiStatus={apiStatus}
          handleLogout={handleLogout}
          user={user}
        />
        <main className="container mx-auto">
          {currentView === 'feed' && (
            <Feed 
              user={user}
              newPost={newPost}
              setNewPost={setNewPost}
              handlePost={handlePost}
              loading={loading}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              posts={posts}
              handleLike={handleLike}
              feedType={feedType}
              setFeedType={setFeedType}
              isPublicView={false}
              onLoginPrompt={() => {}}
              onBackToHome={() => {}}
            />
          )}
          {currentView === 'profile' && (
            <Profile user={user} posts={posts} />
          )}
          {currentView === 'chat' && (
            <Chat 
              chats={chats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              handleSendMessage={handleSendMessage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SickoScoopApp;