import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Send, Upload, Image, Video, FileText, Mic, User, Search, Settings, Plus, X } from 'lucide-react';

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

      {/* Subtitle */}
      <div className="inline-block border-2 border-amber-500/80 rounded-lg px-6 py-3 mb-8">
        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
          revelation & transparency
        </p>
      </div>

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
const ConnectionStatus = React.memo(({ apiStatus }) => (
  <div className={`text-xs px-2 py-1 rounded-full ${
    apiStatus === 'connected' 
      ? 'bg-green-500/20 text-green-400' 
      : apiStatus === 'disconnected'
      ? 'bg-red-500/20 text-red-400'
      : 'bg-yellow-500/20 text-yellow-400'
  }`}>
    {apiStatus === 'connected' ? '● Connected' : 
     apiStatus === 'disconnected' ? '● Demo Mode' : '● Checking...'}
  </div>
));

// Move Header outside to prevent re-creation
const Header = React.memo(({ 
  currentView, 
  setCurrentView, 
  apiStatus, 
  handleLogout, 
  user 
}) => (
  <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-zinc-900 shadow-2xl border-b border-amber-500/30 backdrop-blur-md relative z-50">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-300 to-purple-400 bg-clip-text text-transparent">
          SickoScoop
        </div>
        <ConnectionStatus apiStatus={apiStatus} />
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => setCurrentView('feed')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${currentView === 'feed' ? 'bg-slate-700 text-white border-amber-500' : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500'}`}
          >
            Feed
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${currentView === 'profile' ? 'bg-slate-700 text-white border-amber-500' : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setCurrentView('chat')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${currentView === 'chat' ? 'bg-slate-700 text-white border-amber-500' : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500'}`}
          >
            Chat
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search the scoop..."
            className="pl-10 pr-4 py-2 bg-black/40 border border-slate-600/60 rounded-full text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <button className="p-2 text-slate-300 hover:text-white transition-colors">
          <Settings className="h-6 w-6" />
        </button>
        
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
          style={{
            background: '#ea580c',
            border: '2px solid #ea580c',
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1000,
            position: 'relative'
          }}
        >
          Logout
        </button>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
          style={{
            background: 'linear-gradient(45deg, #f59e0b, #d97706)',
            border: '2px solid #f59e0b',
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1000,
            position: 'relative'
          }}
        >
          {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
        </div>
      </div>
    </div>
  </header>
));

// Move PostCreator outside to prevent re-creation - THIS FIXES THE TYPING ISSUE
const PostCreator = React.memo(({ 
  user, 
  newPost, 
  setNewPost, 
  handlePost, 
  loading, 
  fileInputRef, 
  handleFileUpload 
}) => (
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700/60 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors border-2 border-amber-600/50 hover:border-amber-500 text-sm"
            >
              <Image className="h-4 w-4" />
              <span>Photo</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700/60 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors border-2 border-amber-600/50 hover:border-amber-500 text-sm">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700/60 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors border-2 border-amber-600/50 hover:border-amber-500 text-sm">
              <Mic className="h-4 w-4" />
              <span>Audio</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700/60 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors border-2 border-amber-600/50 hover:border-amber-500 text-sm">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </button>
          </div>
          <button
            onClick={handlePost}
            disabled={!newPost.trim() || loading}
            className="px-6 py-2 bg-gradient-to-r from-slate-700 to-zinc-700 text-white rounded-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-amber-600/70 hover:border-amber-500"
          >
            {loading ? 'Posting...' : 'Post Scoop'}
          </button>
        </div>
      </div>
    </div>
    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*,video/*,audio/*,.pdf"
      onChange={(e) => handleFileUpload(e.target.files)}
      className="hidden"
    />
  </div>
));

// Move Post component outside to prevent re-creation
const Post = React.memo(({ post, user, handleLike, isPublicView = false, onLoginPrompt }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 mb-6 hover:border-slate-500/50 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {post.userId?.username?.slice(0, 2).toUpperCase() || 'UN'}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-white">
              {post.userId?.username || 'Unknown User'}
            </span>
            {post.userId?.verified && <span className="text-indigo-400">✓</span>}
            <span className="text-slate-400 text-sm">
              {timeAgo(post.createdAt)}
            </span>
          </div>
          <p className="text-slate-200 mb-4 leading-relaxed">{post.content}</p>
          {post.mediaFiles && post.mediaFiles.length > 0 && (
            <div className="mb-4">
              {post.mediaFiles.map((file, idx) => (
                <div key={idx} className="mb-2">
                  {file.type === 'image' && (
                    <img src={file.url} alt="Post media" className="w-full max-w-md rounded-xl" />
                  )}
                  {file.type === 'video' && (
                    <video controls className="w-full max-w-md rounded-xl">
                      <source src={file.url} />
                    </video>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-6 text-slate-400">
            {isPublicView ? (
              // Read-only view for non-logged-in users
              <>
                <button 
                  onClick={onLoginPrompt}
                  className="flex items-center space-x-2 hover:text-red-400 transition-colors group"
                  title="Sign up to like posts"
                >
                  <Heart className="h-5 w-5" fill="none" />
                  <span>{post.likes?.length || 0}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Sign up to like</span>
                </button>
                <button 
                  onClick={onLoginPrompt}
                  className="flex items-center space-x-2 hover:text-indigo-400 transition-colors group"
                  title="Sign up to comment"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments?.length || 0}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Sign up to comment</span>
                </button>
                <button 
                  onClick={onLoginPrompt}
                  className="flex items-center space-x-2 hover:text-slate-300 transition-colors group"
                  title="Sign up to share"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Sign up to share</span>
                </button>
              </>
            ) : (
              // Interactive view for logged-in users
              <>
                <button 
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center space-x-2 hover:text-red-400 transition-colors ${
                    post.likes.includes(user?._id || user?.id || 'demo-user') ? 'text-red-400' : ''
                  }`}
                >
                  <Heart className="h-5 w-5" fill={post.likes.includes(user?._id || user?.id || 'demo-user') ? 'currentColor' : 'none'} />
                  <span>{post.likes?.length || 0}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-indigo-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments?.length || 0}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-slate-300 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
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
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            {/* Mystical Symbol */}
            <div className="relative w-8 h-8">
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
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">SickoScoop Public Feed</h1>
              <p className="text-slate-300">Discover genuine conversations and transparent connections</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 bg-gradient-to-r from-slate-700/60 to-zinc-700/60 text-white rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-slate-500/60 hover:border-slate-400"
            >
              ← Back to Home
            </button>
            <button
              onClick={onLoginPrompt}
              className="px-6 py-2 bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 text-white rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-orange-300/70 hover:border-red-400 font-semibold"
            >
              Join SickoScoop
            </button>
          </div>
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
            isPublicView={isPublicView}
            onLoginPrompt={onLoginPrompt}
          />
        ))}
      </>
    )}

    {/* Bottom CTA for public viewers */}
    {isPublicView && posts.length > 0 && (
      <div className="mt-8 text-center bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <h3 className="text-xl font-semibold text-white mb-2">Ready to join the conversation?</h3>
        <p className="text-slate-300 mb-4">Create your account to post, like, comment, and connect with the SickoScoop community.</p>
        <button
          onClick={onLoginPrompt}
          className="px-8 py-3 bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 text-white text-lg font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-orange-300/70 hover:border-red-400"
        >
          Join SickoScoop Today
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

      // Load mock data for demo
      loadMockData();
    };

    initializeApp();
  }, [isClient]);

  const loadMockData = () => {
    const mockPosts = [
      {
        _id: '1',
        userId: { username: 'Aurora Dreams', verified: true, _id: 'user1' },
        content: 'Embracing transparency in our digital connections. This platform truly feels different! 🌟',
        likes: ['user2', 'user3', 'user4'],
        comments: [
          { user: 'Digital Phoenix', content: 'Absolutely love this approach!' }
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        _id: '2', 
        userId: { username: 'Digital Phoenix', verified: false, _id: 'user2' },
        content: 'Finally found a platform where genuine conversation thrives! The sophisticated design here creates the perfect atmosphere for authentic dialogue. 💫',
        likes: ['user1', 'user3'],
        comments: [],
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        _id: '3',
        userId: { username: 'Cosmic Wanderer', verified: true, _id: 'user3' },
        content: 'The anti-stalker protection here is revolutionary. Finally, a safe space for real connections! 🛡️',
        likes: ['user1', 'user2', 'user4', 'user5'],
        comments: [
          { user: 'Aurora Dreams', content: 'Privacy is everything!' }
        ],
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        _id: '4',
        userId: { username: 'Tech Sage', verified: true, _id: 'user4' },
        content: 'Just shared my thoughts on digital privacy in 2025. The landscape is evolving rapidly, and platforms like this are leading the charge! 🚀',
        likes: ['user1', 'user3'],
        comments: [],
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
      },
      {
        _id: '5',
        userId: { username: 'Privacy Advocate', verified: false, _id: 'user5' },
        content: 'Love how this platform puts user safety first. No more worrying about unwanted attention or harassment. This is the future of social media! 💪',
        likes: ['user1', 'user2', 'user3'],
        comments: [
          { user: 'Aurora Dreams', content: 'Couldn\'t agree more!' },
          { user: 'Tech Sage', content: 'Safety should always be priority #1' }
        ],
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
      },
      {
        _id: '6',
        userId: { username: 'Transparency Truth', verified: true, _id: 'user6' },
        content: 'Been testing this platform for weeks. The commitment to genuine discourse without anonymity trolls is refreshing. Quality over quantity! ✨',
        likes: ['user2', 'user4', 'user5'],
        comments: [],
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      },
      {
        _id: '7',
        userId: { username: 'Social Pioneer', verified: false, _id: 'user7' },
        content: 'The verification system here strikes the perfect balance. You know who you\'re talking to, but privacy is still protected. Ingenious design! 🎯',
        likes: ['user1', 'user3', 'user6'],
        comments: [
          { user: 'Digital Phoenix', content: 'The verification process was so smooth!' }
        ],
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000)
      },
      {
        _id: '8',
        userId: { username: 'Community Builder', verified: true, _id: 'user8' },
        content: 'Hosting my first SickoScoop community event next week! Who\'s interested in joining a discussion about ethical social media? 🤝',
        likes: ['user2', 'user5', 'user7'],
        comments: [
          { user: 'Privacy Advocate', content: 'Count me in!' },
          { user: 'Tech Sage', content: 'This sounds amazing!' }
        ],
        createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000)
      }
    ];
    
    setAllPosts(mockPosts);
    updateDisplayedPosts(mockPosts, feedType, user);

    const mockChats = [
      {
        _id: '1',
        participants: [{ username: 'Aurora Dreams' }],
        lastMessage: { content: 'Hey! Love the transparency here!' },
        isOnline: true
      },
      {
        _id: '2',
        participants: [{ username: 'Digital Phoenix' }],
        lastMessage: { content: 'Thanks for the authenticity tip' },
        isOnline: true
      },
      {
        _id: '3',
        participants: [{ username: 'Cosmic Wanderer' }],
        lastMessage: { content: 'The privacy features are amazing!' },
        isOnline: false
      }
    ];
    setChats(mockChats);
  };

  // Helper function to update displayed posts based on feed type
  const updateDisplayedPosts = (allPostsData, currentFeedType, currentUser) => {
    if (currentFeedType === 'public') {
      // Show all posts for public feed
      setPosts(allPostsData);
    } else {
      // Show only user's posts and posts from followed users for personal feed
      // For demo, we'll show user's posts + a few select posts
      const userPosts = allPostsData.filter(post => 
        post.userId?._id === currentUser?._id || 
        post.userId?.username === currentUser?.username
      );
      
      // Add some "followed" users' posts for demo
      const followedPosts = allPostsData.filter(post => 
        ['Aurora Dreams', 'Tech Sage', 'Privacy Advocate'].includes(post.userId?.username)
      ).slice(0, 3);
      
      const personalFeedPosts = [...userPosts, ...followedPosts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setPosts(personalFeedPosts);
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
    if (loginForm.email.toLowerCase().trim() === 'demo@sickoscoop.com' && loginForm.password === 'demo') {
      console.log('🎭 Using demo login');
      const demoUser = { 
        _id: 'demo-user',
        username: 'Demo User', 
        email: 'demo@sickoscoop.com', 
        verified: true 
      };
      setUser(demoUser);
      setToken('demo-token');
      setStorageItem('authToken', 'demo-token');
      setStorageItem('userData', JSON.stringify(demoUser));
      setIsLoggedIn(true);
      setCurrentView('feed');
      setLoginForm({ email: '', password: '' });
      setApiStatus('disconnected');
      setError('');
      loadMockData();
    } else {
      setError(error.message || 'Login failed. Please check your credentials or try demo@sickoscoop.com / demo');
    }
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
    
    // Reload mock data for demo
    setTimeout(() => {
      loadMockData();
    }, 100);
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

  // Handle public browsing
  const handleBrowsePublic = () => {
    setIsPublicBrowsing(true);
    setCurrentView('publicFeed');
    // Load mock data for public browsing
    loadMockData();
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