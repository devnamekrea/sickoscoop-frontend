import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Send, Upload, Image, Video, FileText, Mic, User, Search, Settings, Plus, X, MoreHorizontal, Flag, Bookmark, Eye, ArrowLeft, Clock, Users, Copy, ExternalLink, Twitter, Facebook, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://sickoscoop-backend-deo45.ondigitalocean.app/api';

// Enhanced URL generation for posts
const generatePostUrl = (postId) => {
  const baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://sickoscoop.netlify.app';
  return `${baseUrl}/post/${postId}`;
};

// Enhanced timestamp function with more details
const getDetailedTimestamp = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
  
  if (diffInMinutes < 1) return { relative: 'Just now', absolute: postDate.toLocaleTimeString() };
  if (diffInMinutes < 60) return { 
    relative: `${diffInMinutes}m ago`, 
    absolute: postDate.toLocaleString() 
  };
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return { 
    relative: `${diffInHours}h ago`, 
    absolute: postDate.toLocaleString() 
  };
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return { 
    relative: `${diffInDays}d ago`, 
    absolute: postDate.toLocaleDateString() 
  };
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return { 
    relative: `${diffInWeeks}w ago`, 
    absolute: postDate.toLocaleDateString() 
  };
  
  return { 
    relative: postDate.toLocaleDateString(), 
    absolute: postDate.toLocaleString() 
  };
};

// Enhanced Share Modal Component
const ShareModal = React.memo(({ post, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const postUrl = generatePostUrl(post._id);
  const shareText = `Check out this post by ${post.userId?.username || 'someone'} on SickoScoop: "${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}"`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = postUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSocialShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(postUrl);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      email: `mailto:?subject=${encodeURIComponent('Check out this SickoScoop post')}&body=${encodedText}%0A%0A${encodedUrl}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SickoScoop Post',
          text: shareText,
          url: postUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gradient-to-r from-slate-900/95 to-zinc-900/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <h3 className="text-xl font-semibold text-white">Share Post</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {/* Post Preview */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {post.userId?.username?.slice(0, 2).toUpperCase() || 'UN'}
              </div>
              <span className="text-white font-medium">{post.userId?.username || 'Unknown User'}</span>
            </div>
            <p className="text-slate-300 text-sm line-clamp-3">{post.content}</p>
          </div>

          {/* Copy Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Post Link</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-black/40 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Share to</label>
            
            {/* Native Share (Mobile) */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-700/70 rounded-lg transition-colors text-white"
              >
                <Share2 className="h-5 w-5" />
                <span>Share via device</span>
              </button>
            )}

            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialShare('twitter')}
                className="flex items-center space-x-3 p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors text-blue-400 border border-blue-600/30"
              >
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('facebook')}
                className="flex items-center space-x-3 p-3 bg-blue-700/20 hover:bg-blue-700/30 rounded-lg transition-colors text-blue-300 border border-blue-700/30"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('linkedin')}
                className="flex items-center space-x-3 p-3 bg-blue-800/20 hover:bg-blue-800/30 rounded-lg transition-colors text-blue-200 border border-blue-800/30"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('email')}
                className="flex items-center space-x-3 p-3 bg-slate-700/20 hover:bg-slate-700/30 rounded-lg transition-colors text-slate-300 border border-slate-700/30"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Email</span>
              </button>
            </div>

            {/* Additional Options */}
            <div className="pt-4 border-t border-slate-600/30">
              <button
                onClick={() => handleSocialShare('reddit')}
                className="w-full flex items-center space-x-3 p-3 bg-orange-600/20 hover:bg-orange-600/30 rounded-lg transition-colors text-orange-400 border border-orange-600/30"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Share to Reddit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// URL Router simulation (since we're not using React Router yet)
const useSimpleRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };
  
  return { currentPath, navigate };
};

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

      {/* Browse Public Feed Button */}
      <div className="mb-8 flex flex-col items-center">
        <button
          onClick={onBrowsePublic}
          className="px-8 py-3 bg-gradient-to-r from-gray-900 via-slate-800 to-black text-white text-lg font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 border-2 border-amber-500/80 hover:border-amber-400 hover:from-gray-800 hover:via-slate-700 hover:to-gray-900 backdrop-blur-md flex items-center space-x-3"
        >
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 blur-sm animate-pulse"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-amber-500 to-red-500 rounded-full opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70 blur-sm"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-amber-300 via-orange-400 to-red-400 transform rotate-45 opacity-80"></div>
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

// Header component with URL routing support
const Header = React.memo(({ 
  currentView, 
  setCurrentView, 
  apiStatus, 
  handleLogout, 
  user,
  selectedPost,
  onBackToFeed,
  navigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-zinc-900 shadow-2xl border-b border-amber-500/30 backdrop-blur-md relative z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-shrink-0">
            {currentView === 'post' && (
              <button
                onClick={onBackToFeed}
                className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 mr-2"
                title="Back to Feed"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            
            <button
              onClick={() => {
                navigate('/');
                setCurrentView('feed');
              }}
              className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-300 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              SickoScoop
            </button>
            
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

          <div className="hidden md:flex items-center space-x-3 flex-1 justify-center max-w-2xl">
            {currentView === 'post' ? (
              <div className="text-center text-slate-300">
                <span className="text-lg font-medium">Post by {selectedPost?.userId?.username || 'Unknown User'}</span>
              </div>
            ) : (
              <>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      navigate('/');
                      setCurrentView('feed');
                    }}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                      currentView === 'feed' 
                        ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                        : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                    }`}
                  >
                    Feed
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setCurrentView('profile');
                    }}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                      currentView === 'profile' 
                        ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                        : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/chat');
                      setCurrentView('chat');
                    }}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm lg:text-base ${
                      currentView === 'chat' 
                        ? 'bg-slate-700 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                        : 'text-slate-300 hover:text-white border-amber-600/50 hover:border-amber-500 hover:bg-slate-800/50'
                    }`}
                  >
                    Chat
                  </button>
                </div>

                <div className="hidden lg:block relative ml-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search sicko..."
                    className="w-64 xl:w-72 pl-10 pr-4 py-2 bg-black/40 border border-slate-600/60 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 transition-all duration-200 text-sm"  
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center flex-shrink-0 mr-2">
            {currentView !== 'post' && (
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 mr-3"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-xl text-sm bg-gradient-to-r from-amber-500 to-orange-600 border-2 border-amber-500/80 text-white mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {user?.username?.slice(0, 2).toUpperCase() || 'YU'}
            </div>

            <button className="p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800/50 rounded-lg mr-3">
              <Settings className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleLogout}
              className="hidden sm:flex px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 bg-slate-700/40 text-slate-300 border-2 border-amber-600/40 hover:border-amber-500 hover:bg-slate-700/60 hover:text-white font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {isSearchOpen && currentView !== 'post' && (
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

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 bg-black/20 rounded-xl p-4 border border-slate-600/30">
            <div className="flex flex-col space-y-3">
              {currentView === 'post' && (
                <button
                  onClick={() => {
                    onBackToFeed();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg border-2 border-amber-600/50 bg-slate-700/40 text-slate-300 hover:text-white hover:border-amber-500 hover:bg-slate-700/60 transition-all duration-200 font-medium text-left flex items-center space-x-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Feed</span>
                </button>
              )}
              
              {currentView !== 'post' && (
                <>
                  <button
                    onClick={() => {
                      navigate('/');
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
                      navigate('/profile');
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
                      navigate('/chat');
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
                </>
              )}
              
              <div className="border-t border-slate-600/40 my-2"></div>
              
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

// Enhanced PostCreator component with complete file upload functionality
const PostCreator = React.memo(({ 
  user, 
  newPost, 
  setNewPost, 
  handlePost, 
  loading, 
  fileInputRef, 
  handleFileUpload 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const pdfInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Handle file selection for specific types
  // Handle file selection for specific types
const handleFileSelect = async (type, files) => {
  console.log('🔄 handleFileSelect called:', type, files?.length); // ADD THIS LINE
  if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Validate file types
    const allowedTypes = {
      pdf: ['application/pdf'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/mp4'],
      video: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'],
      photo: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    };

    const validFiles = fileArray.filter(file => {
      if (allowedTypes[type].includes(file.type)) {
        return true;
      }
      console.warn(`Invalid file type for ${type}:`, file.type);
      return false;
    });

    if (validFiles.length === 0) {
      alert(`Please select valid ${type} files.`);
      return;
    }

    await uploadFiles(validFiles);
  };

  // Upload files to backend
  // Upload files to backend
const uploadFiles = async (files) => {
  console.log('🚀 uploadFiles called with:', files?.length, 'files'); // ADD THIS LINE
  if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      console.log('📤 Uploading files:', files.length);
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Upload successful:', result);

      if (result.files && Array.isArray(result.files)) {
  setUploadedFiles(prev => [...prev, ...result.files]);
  console.log('📁 Files added to state:', result.files.length); // ADD THIS LINE
} else {
        throw new Error('Invalid response format from server');
      }

    } catch (error) {
      console.error('❌ Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Check if we have content to post
  const hasContent = newPost.trim() || uploadedFiles.length > 0;

  // Handle post submission with files
  const handleSubmitPost = async () => {
    if (!hasContent) return;

    try {
      // Pass the uploaded files to the parent component
      await handlePost(uploadedFiles);
      
      // Clear uploaded files after successful post
      setUploadedFiles([]);
      
      // Clear file input values
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      if (audioInputRef.current) audioInputRef.current.value = '';
      if (videoInputRef.current) videoInputRef.current.value = '';
      if (photoInputRef.current) photoInputRef.current.value = '';
      
    } catch (error) {
      console.error('Post submission error:', error);
    }
  };

  // Get file type icon
  const getFileIcon = (file) => {
    switch (file.type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Mic className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

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
          
          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-slate-300 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Uploaded Files ({uploadedFiles.length})</span>
              </h4>
              <div className="grid gap-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-slate-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
                        {getFileIcon(file)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{file.filename}</p>
                        <p className="text-slate-400 text-xs">
                          {file.type.toUpperCase()} • {(file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-blue-400 text-sm">Uploading files...</span>
              </div>
            </div>
          )}
          
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSubmitPost}
              disabled={!hasContent || loading || isUploading}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors border-2 text-base font-semibold ${
                hasContent && !loading && !isUploading
                  ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border-amber-600/50 hover:border-amber-500 cursor-pointer'
                  : 'bg-slate-700/30 text-slate-500 border-amber-600/30 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{loading ? 'Posting...' : isUploading ? 'Uploading...' : 'Post'}</span>
            </button>
          </div>
          
          <div className="mt-2 pt-2 border-t border-slate-600/30">
            <div className="flex flex-wrap gap-2 justify-end">
              <button 
                onClick={() => pdfInputRef.current?.click()}
                disabled={isUploading}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  isUploading
                    ? 'bg-slate-700/20 text-slate-600 border-amber-600/20 cursor-not-allowed'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70 hover:bg-slate-700/40 hover:text-slate-400'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </button>
              
              <button 
                onClick={() => audioInputRef.current?.click()}
                disabled={isUploading}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  isUploading
                    ? 'bg-slate-700/20 text-slate-600 border-amber-600/20 cursor-not-allowed'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70 hover:bg-slate-700/40 hover:text-slate-400'
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>Audio</span>
              </button>
              
              <button 
                onClick={() => videoInputRef.current?.click()}
                disabled={isUploading}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  isUploading
                    ? 'bg-slate-700/20 text-slate-600 border-amber-600/20 cursor-not-allowed'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70 hover:bg-slate-700/40 hover:text-slate-400'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Video</span>
              </button>
              
              <button
                onClick={() => photoInputRef.current?.click()}
                disabled={isUploading}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border-2 text-sm ${
                  isUploading
                    ? 'bg-slate-700/20 text-slate-600 border-amber-600/20 cursor-not-allowed'
                    : 'bg-slate-700/30 text-slate-500 border-amber-600/30 opacity-50 hover:opacity-70 hover:bg-slate-700/40 hover:text-slate-400'
                }`}
              >
                <Image className="h-4 w-4" />
                <span>Photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden File Inputs */}
    <input
  ref={pdfInputRef}
  type="file"
  accept=".pdf"
  multiple
  onChange={(e) => {
    console.log('📁 PDF files selected:', e.target.files.length); // ADD THIS
    handleFileSelect('pdf', e.target.files);
  }}
  className="hidden"
/>
      <input
  ref={audioInputRef}
  type="file"
  accept="audio/*"
  multiple
  onChange={(e) => {
    console.log('🎵 Audio files selected:', e.target.files.length); // ADD THIS
    handleFileSelect('audio', e.target.files);
  }}
  className="hidden"
/>
      <input
  ref={videoInputRef}
  type="file"
  accept="video/*"
  multiple
  onChange={(e) => {
    console.log('📹 Video files selected:', e.target.files.length); // ADD THIS
    handleFileSelect('video', e.target.files);
  }}
  className="hidden"
/>
      <input
  ref={photoInputRef}
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    console.log('📸 Photo files selected:', e.target.files.length); // ADD THIS
    handleFileSelect('photo', e.target.files);
  }}
  className="hidden"
/>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf"
        onChange={(e) => uploadFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
});

// Rest of the components remain the same...
// [Include all other components exactly as they were]

// Enhanced Post component with sharing and timestamps
const Post = React.memo(({ 
  post, 
  user, 
  handleLike, 
  handleComment, 
  handleShare, 
  isPublicView = false, 
  onLoginPrompt,
  onPostClick,
  isDetailView = false,
  navigate
}) => {
  const [showComments, setShowComments] = useState(isDetailView);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showWhoLiked, setShowWhoLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const commentInputRef = useRef(null);

  const timestamp = getDetailedTimestamp(post.createdAt);

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

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    
    handleComment?.(post._id, commentText);
    setCommentText('');
  };

  const handleShareClick = () => {
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    setShowShareModal(true);
  };

  const handleWhoLikedClick = () => {
    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }
    setShowWhoLiked(true);
  };

  const handlePostContentClick = (e) => {
    if (e.target.closest('button') || 
        e.target.closest('input') || 
        e.target.closest('a') ||
        e.target.closest('.post-action-button') ||
        showShareModal || 
        showMoreMenu || 
        showWhoLiked ||
        isDetailView) {
      return;
    }

    if (isPublicView) {
      onLoginPrompt?.();
      return;
    }

    if (navigate) {
      navigate(`/post/${post._id}`);
    }
    onPostClick?.(post);
  };

  const isLiked = !isPublicView && post.likes?.some(like => 
    (typeof like === 'string' ? like : like.user || like._id) === (user?._id || user?.id)
  );

  const likeCount = post.likes?.length || 0;
  const commentCount = post.comments?.length || 0;

  const usersWhoLiked = React.useMemo(() => {
    if (!post.likes || post.likes.length === 0) return [];
    
    return post.likes.map((like, index) => {
      if (typeof like === 'string') {
        return {
          _id: like,
          username: `User ${index + 1}`,
          avatar: '👤',
          verified: false
        };
      } else if (like.user) {
        return {
          _id: like.user._id || like.user,
          username: like.user.username || `User ${index + 1}`,
          avatar: like.user.avatar || '👤',
          verified: like.user.verified || false
        };
      } else {
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
      <div 
        className={`bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 mb-6 transition-all duration-300 group ${
          !isDetailView && !isPublicView ? 'hover:border-slate-500/50 cursor-pointer hover:bg-slate-800/30' : ''
        }`}
        onClick={handlePostContentClick}
      >
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {post.userId?.username?.slice(0, 2).toUpperCase() || 'UN'}
            </div>
            
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
                <span 
                  className="text-slate-400 text-sm hover:text-slate-300 cursor-pointer flex items-center space-x-1 group/timestamp" 
                  title={timestamp.absolute}
                >
                  <Clock className="h-3 w-3" />
                  <span className="group-hover/timestamp:hidden">{timestamp.relative}</span>
                  <span className="hidden group-hover/timestamp:inline text-xs">{timestamp.absolute}</span>
                </span>
              </div>
              
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

          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 post-action-button"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 top-10 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-xl z-10 min-w-48">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(generatePostUrl(post._id));
                    setShowMoreMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl transition-colors flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors flex items-center space-x-2"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save Post</span>
                </button>
                {!isDetailView && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigate) navigate(`/post/${post._id}`);
                      onPostClick?.(post);
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Post</span>
                  </button>
                )}
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-b-xl transition-colors flex items-center space-x-2"
                >
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
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {file.type === 'video' && (
                  <video controls className="w-full h-auto max-h-96 bg-black" onClick={(e) => e.stopPropagation()}>
                    <source src={file.url} />
                    Your browser does not support video playback.
                  </video>
                )}
                {file.type === 'audio' && (
                  <div className="p-4 bg-slate-800/50">
                    <audio controls className="w-full" onClick={(e) => e.stopPropagation()}>
                      <source src={file.url} />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}
                {file.type === 'pdf' && (
                  <div className="p-4 bg-slate-800/50 flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoLikedClick();
                  }}
                  className="flex items-center space-x-1 hover:text-slate-300 transition-colors cursor-pointer group post-action-button"
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
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
                </div>
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
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleLikeClick();
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 post-action-button ${
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

            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (isPublicView) {
                  onLoginPrompt?.();
                } else {
                  setShowComments(!showComments);
                  setTimeout(() => commentInputRef.current?.focus(), 100);
                }
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200 post-action-button"
              title={isPublicView ? "Sign up to comment" : "Comment on this post"}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{commentCount || 'Comment'}</span>
            </button>

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareClick();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-200 post-action-button"
                title={isPublicView ? "Sign up to share" : "Share this post"}
              >
                <Share2 className="h-5 w-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {!isDetailView && !isPublicView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (navigate) navigate(`/post/${post._id}`);
                onPostClick?.(post);
              }}
              className="text-xs text-slate-500 hover:text-slate-400 transition-colors post-action-button flex items-center space-x-1"
            >
              <Eye className="h-3 w-3" />
              <span>View Post</span>
            </button>
          )}

          {isPublicView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLoginPrompt();
              }}
              className="text-xs text-slate-500 hover:text-slate-400 transition-colors post-action-button"
            >
              Join to interact →
            </button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && !isPublicView && (
          <div className="mt-4 pt-4 border-t border-slate-600/30 space-y-4">
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
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2 bg-black/40 border border-slate-600/50 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommentSubmit();
                    }}
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-slate-700 to-zinc-700 text-white rounded-full hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed post-action-button"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

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
                            {getDetailedTimestamp(comment.createdAt || new Date()).relative}
                          </span>
                        </div>
                        <p className="text-slate-200 text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 px-4">
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-slate-500 hover:text-slate-400 transition-colors post-action-button"
                        >
                          Like
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-slate-500 hover:text-slate-400 transition-colors post-action-button"
                        >
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

        {(showMoreMenu) && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={(e) => {
              e.stopPropagation();
              setShowMoreMenu(false);
            }}
          />
        )}
      </div>

      {/* Share Modal */}
      <ShareModal 
        post={post}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Who Liked Modal */}
      {showWhoLiked && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowWhoLiked(false)}>
          <div className="bg-gradient-to-r from-slate-900/95 to-zinc-900/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl max-w-md w-full mx-4 max-h-96 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
              <h3 className="text-xl font-semibold text-white">Liked by</h3>
              <button 
                onClick={() => setShowWhoLiked(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
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
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-zinc-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {likeUser.username?.slice(0, 2).toUpperCase() || likeUser.avatar || '👤'}
                      </div>
                      
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

// PostDetail component for individual post view
const PostDetail = React.memo(({ 
  post, 
  user, 
  handleLike, 
  handleComment, 
  handleShare, 
  onBackToFeed,
  navigate 
}) => {
  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-slate-400 py-8">
          <p>Post not found</p>
          <button
            onClick={onBackToFeed}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const timestamp = getDetailedTimestamp(post.createdAt);
  const postUrl = generatePostUrl(post._id);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Individual Post Header */}
      <div className="mb-6 bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToFeed}
              className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
              title="Back to Feed"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Individual Post</h1>
              <p className="text-slate-400 text-sm">
                by {post.userId?.username || 'Unknown User'} • {timestamp.absolute}
              </p>
            </div>
          </div>
          
          {/* Post Stats & Share */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes?.length || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments?.length || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 50) + 20}</span>
              </div>
            </div>
            
            {/* Quick Share Button */}
            <button
              onClick={() => navigator.clipboard.writeText(postUrl)}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
              title="Copy post link"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* The actual post with comments expanded by default */}
      <Post 
        post={post}
        user={user}
        handleLike={handleLike}
        handleComment={handleComment}
        handleShare={handleShare}
        isPublicView={false}
        onLoginPrompt={() => {}}
        onPostClick={() => {}}
        isDetailView={true}
        navigate={navigate}
      />

      {/* Related Posts Section */}
      <div className="mt-8 bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>More from {post.userId?.username || 'this user'}</span>
        </h3>
        <div className="text-slate-400 text-center py-4">
          <p>No other posts to show right now</p>
          <p className="text-sm mt-2">Check back later for more posts!</p>
        </div>
      </div>
    </div>
  );
});

// Feed component with enhanced sharing
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
  onBackToHome,
  onPostClick,
  navigate
}) => (
  <div className="max-w-2xl mx-auto p-6">
    {isPublicView && (
      <div className="mb-6 bg-gradient-to-r from-slate-900/60 to-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40">
        <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0">
          <div className="relative w-8 h-8 flex-shrink-0 md:mr-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 blur-sm animate-pulse"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-orange-400 via-amber-500 to-red-500 rounded-full opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70 blur-sm"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-amber-300 via-orange-400 to-red-400 transform rotate-45 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
            <div className="absolute inset-1 bg-gradient-to-tl from-orange-300 via-amber-400 to-yellow-400 opacity-70 animate-pulse" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}></div>
          </div>
          
          <div className="flex-1 text-center md:mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">SickoScoop Public Feed</h1>
          </div>
          
          <button
            onClick={onLoginPrompt}
            className="flex-shrink-0 px-4 md:px-6 py-2 bg-gradient-to-r from-orange-300 via-red-400 via-blue-400 to-indigo-400 text-white rounded-lg hover:scale-105 transform transition-all duration-300 border-2 border-orange-300/70 hover:border-red-400 font-semibold text-sm md:text-base"
          >
            Join SickoScoop
          </button>
        </div>
      </div>
    )}

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

    {posts.length === 0 ? (
      <div className="text-center text-slate-400 py-8">
        <div className="mb-4 flex justify-center">
          {isPublicView || feedType === 'public' ? (
            <div className="relative w-12 h-12">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
                </div>
                <span>Public Feed • {posts.length} posts from the community</span>
              </>
            ) : feedType === 'public' ? (
              <>
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-violet-400 via-purple-500 to-indigo-600 opacity-60" style={{clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)'}}></div>
                </div>
                <span>Public Feed • {posts.length} posts • Click to view individually or share</span>
              </>
            ) : (
              <span>👤 Your Feed • {posts.length} personalized posts • Click to view individually or share</span>
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
            onPostClick={onPostClick}
            isDetailView={false}
            navigate={navigate}
          />
        ))}
      </>
    )}

    {isPublicView && posts.length > 0 && (
      <div className="mt-8 text-center bg-gradient-to-r from-slate-900/40 to-zinc-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-600/30">
        <p className="text-slate-300 mb-4">Create your account to post, like, comment, and share with the SickoScoop community.</p>
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

// Profile and Chat components (unchanged)
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

const Chat = React.memo(({ 
  chats, 
  selectedChat, 
  setSelectedChat, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage 
}) => (
  <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 h-[calc(100vh-200px)]">
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

// Main App Component with URL routing and enhanced file upload
const SickoScoopApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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
  const [apiStatus, setApiStatus] = useState('unknown');
  const [feedType, setFeedType] = useState('public');
  const [isPublicBrowsing, setIsPublicBrowsing] = useState(false);
  const fileInputRef = useRef(null);
  
  // Add URL routing
  const { currentPath, navigate } = useSimpleRouter();

  // Handle URL-based navigation
  useEffect(() => {
    if (!isLoggedIn) return;
    
    if (currentPath.startsWith('/post/')) {
      const postId = currentPath.split('/')[2];
      const post = allPosts.find(p => p._id === postId);
      if (post) {
        setSelectedPost(post);
        setCurrentView('post');
      } else {
        // Post not found, redirect to feed
        navigate('/');
        setCurrentView('feed');
      }
    } else if (currentPath === '/profile') {
      setCurrentView('profile');
    } else if (currentPath === '/chat') {
      setCurrentView('chat');
    } else {
      setCurrentView('feed');
    }
  }, [currentPath, isLoggedIn, allPosts, navigate]);

  // Fix hydration issues
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

  // API call helper
  const apiCall = async (endpoint, options = {}, customToken = null) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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

      if (!response.ok) {
        let errorMessage = 'Request failed';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        if (response.status === 401 && !endpoint.includes('/auth/')) {
          console.warn('401 error on', endpoint, '- skipping auto-logout');
          throw new Error('Unauthorized access');
        }

        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      if (!responseText) {
        return {};
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

  // Initialize app data
  useEffect(() => {
    if (!isClient) return;

    const initializeApp = async () => {
      const isApiConnected = await testApiConnection();
      
      const authToken = getStorageItem('authToken');
      const userData = getStorageItem('userData');

      if (authToken && userData && isApiConnected) {
        try {
          const userObj = JSON.parse(userData);
          
          setToken(authToken);
          setUser(userObj);
          setIsLoggedIn(true);
          setCurrentView('feed');
          
          try {
            const response = await apiCall('/auth/verify', {
              method: 'POST',
              body: JSON.stringify({ token: authToken }),
            }, authToken);
            
            if (response.valid) {
              setUser(response.user || userObj);
              setApiStatus('connected');
              await Promise.all([loadPosts(authToken), loadChats(authToken)]);
              return;
            }
          } catch (error) {
            console.error('Token validation failed, using demo mode:', error);
            setApiStatus('disconnected');
          }
          
          loadMockData();
          return;
          
        } catch (error) {
          console.error('Invalid stored user data:', error);
          removeStorageItem('authToken');
          removeStorageItem('userData');
        }
      }

      setAllPosts([]);
      setPosts([]);
      setChats([]);
      setApiStatus(isApiConnected ? 'connected' : 'disconnected');
    };

    initializeApp();
  }, [isClient]);

  const loadMockData = () => {
    setAllPosts([]);
    setPosts([]);
    setChats([]);
  };

  // Helper function to update displayed posts based on feed type
  const updateDisplayedPosts = (allPostsData, currentFeedType, currentUser) => {
    if (currentFeedType === 'public') {
      setPosts(allPostsData);
    } else {
      const userPosts = allPostsData.filter(post => 
        post.userId?._id === currentUser?._id || 
        post.userId?.username === currentUser?.username
      );
      
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
        setToken(data.token);
        setUser(data.user);
        setStorageItem('authToken', data.token);
        setStorageItem('userData', JSON.stringify(data.user));
        setIsLoggedIn(true);
        navigate('/');
        setCurrentView('feed');
        setLoginForm({ email: '', password: '' });
        setApiStatus('connected');
        
        setTimeout(async () => {
          try {
            await Promise.all([
              loadPosts(data.token), 
              loadChats(data.token)
            ]);
          } catch (error) {
            console.warn('Failed to load initial data:', error);
            loadMockData();
          }
        }, 100);
        
      } else {
        throw new Error('Invalid response from server - missing token or user data');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
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
        navigate('/');
        setCurrentView('feed');
        setShowRegister(false);
        setRegisterForm({ username: '', email: '', password: '' });
        setApiStatus('connected');
        
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
    setIsPublicBrowsing(false);
    navigate('/');
    setCurrentView('landing');
    setSelectedPost(null);
    setApiStatus('unknown');
    setPosts([]);
    setAllPosts([]);
    setChats([]);
    setError('');
    setFeedType('public');
  };

  // Enhanced handlePost function with file support
  const handlePost = async (uploadedFiles = []) => {
    if (!newPost.trim() && uploadedFiles.length === 0) return;
    
    setLoading(true);
    
    const newPostData = {
      _id: Date.now().toString(),
      userId: { 
        username: user?.username || 'You', 
        verified: true,
        _id: user?._id || 'demo-user'
      },
      content: newPost,
      mediaFiles: uploadedFiles, // Include uploaded files
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    try {
      if (apiStatus === 'connected' && token !== 'demo-token') {
        const response = await apiCall('/posts', {
          method: 'POST',
          body: JSON.stringify({ 
            content: newPost,
            mediaFiles: uploadedFiles // Send files to backend
          }),
        }, token);

        if (response._id || response.id) {
          const updatedAllPosts = [response, ...allPosts];
          setAllPosts(updatedAllPosts);
          updateDisplayedPosts(updatedAllPosts, feedType, user);
        } else {
          throw new Error('Invalid post response');
        }
      } else {
        const updatedAllPosts = [newPostData, ...allPosts];
        setAllPosts(updatedAllPosts);
        updateDisplayedPosts(updatedAllPosts, feedType, user);
      }
      
      setNewPost('');
    } catch (error) {
      console.error('Post error:', error);
      
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

    if (selectedPost && selectedPost._id === postId) {
      setSelectedPost(updatePostLikes([selectedPost])[0]);
    }

    if (apiStatus === 'connected' && token !== 'demo-token') {
      try {
        await apiCall(`/posts/${postId}/like`, {
          method: 'POST',
        }, token);
      } catch (error) {
        console.error('Like error:', error);
        setAllPosts(allPosts);
        setPosts(posts);
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(selectedPost);
        }
      }
    }
  };

  const handleFileUpload = async (files) => {
    console.log('Files selected:', files);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedChat) return;
    
    console.log('Sending message:', chatMessage, 'to:', selectedChat.participants[0]?.username);
    setChatMessage('');
  };

  const handleComment = useCallback((postId, commentText) => {
    const newComment = {
      user: { username: user?.username || 'You', _id: user?._id || user?.id },
      content: commentText,
      createdAt: new Date()
    };

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

    if (selectedPost && selectedPost._id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
    }

    if (apiStatus === 'connected' && token !== 'demo-token') {
      apiCall(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: commentText })
      }, token).catch(console.error);
    }
  }, [user, apiStatus, token, selectedPost]);

  const handleShare = useCallback((postId) => {
    const postUrl = generatePostUrl(postId);
    navigator.clipboard.writeText(postUrl).then(() => {
      console.log('Link copied to clipboard!');
    }).catch(console.error);
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/post/${post._id}`);
    setCurrentView('post');
  };

  const handleBackToFeed = () => {
    setSelectedPost(null);
    navigate('/');
    setCurrentView('feed');
  };

  const handleBrowsePublic = async () => {
    setIsPublicBrowsing(true);
    setCurrentView('publicFeed');
    
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
        setPosts(publicPostsData);
        console.log('✅ Posts set in state:', publicPostsData.length);
      } else {
        console.log('⚠️ No public posts found');
        setAllPosts([]);
        setPosts([]);
      }
    } catch (error) {
      console.error('❌ Error loading public posts:', error);
      setAllPosts([]);
      setPosts([]);
    }
  };

  const handleLoginPrompt = () => {
    setIsPublicBrowsing(false);
    setCurrentView('landing');
    setShowRegister(false);
  };

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
              onPostClick={handleLoginPrompt}
              navigate={navigate}
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
          selectedPost={selectedPost}
          onBackToFeed={handleBackToFeed}
          navigate={navigate}
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
              handleComment={handleComment}
              handleShare={handleShare}
              feedType={feedType}
              setFeedType={setFeedType}
              isPublicView={false}
              onLoginPrompt={() => {}}
              onBackToHome={() => {}}
              onPostClick={handlePostClick}
              navigate={navigate}
            />
          )}
          {currentView === 'post' && (
            <PostDetail 
              post={selectedPost}
              user={user}
              handleLike={handleLike}
              handleComment={handleComment}
              handleShare={handleShare}
              onBackToFeed={handleBackToFeed}
              navigate={navigate}
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