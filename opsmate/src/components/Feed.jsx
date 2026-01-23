import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Link2, MoreVertical, X, SlidersHorizontal, MessageSquare, Bot, Plus, Search, Home, Users, Target, Activity, AlertTriangle, Shield, Flame, BarChart3, ChevronRight, Eye, Paperclip, ArrowUp, CornerDownRight, Loader2 } from 'lucide-react'
import SummarizeIcon from './icons/SummarizeIcon'

// Summary bullet point pools for randomization
const summaryBulletPools = [
  [
    "Memory spike traced to a rogue cron job spawning 847 zombie processes every 5 minutes.",
    "The intern's \"temporary fix\" from 2019 finally broke—it was holding prod together with regex.",
    "Blast radius limited to APAC region; US users blissfully unaware while we panicked.",
  ],
  [
    "Root cause: someone deployed to prod instead of staging because tabs look identical.",
    "Rollback blocked by a circular dependency no one knew existed until 3am.",
    "CFO's dashboard was down for 47 minutes. We have never moved faster.",
  ],
  [
    "Cache invalidation bug: turns out there ARE only two hard problems in computer science.",
    "Redis cluster achieved sentience and decided to stop responding. (JK, it was a network partition.)",
    "Fixed by the classic trio: restart, redeploy, and pretend it never happened.",
  ],
  [
    "Latency spike correlated perfectly with the game going into overtime.",
    "Load balancer was routing 90% of traffic to a single sad instance in us-east-1.",
    "Auto-scaling kicked in 8 minutes late because someone set cooldown to 600 seconds.",
  ],
  [
    "SSL cert expired at 2am on a Saturday. On-call engineer is now a legend.",
    "The \"read-only Friday\" rule exists for a reason. This is that reason.",
    "Postmortem revealed 6 other teams have the same bug lurking in their code.",
  ],
  [
    "API started returning 418 \"I'm a teapot\" due to an easter egg that escaped to prod.",
    "Database failover worked perfectly—except for the part where it failed over.",
    "Incident duration: 23 minutes. Time spent writing postmortem: 4 hours.",
  ],
  [
    "Feature flag was supposed to be 1% rollout. Decimal point had other plans (100%).",
    "Third-party API rate limited us right before the product launch. Classic.",
    "Kubernetes decided today was a good day to evict pods during peak traffic.",
  ],
  [
    "Log ingestion backed up because someone logged the entire request body. In production. For auth.",
    "The fix was a one-line change that took 3 engineers 6 hours to find.",
    "Monitoring alert fired 47 times but was muted because \"it's always noisy on Mondays.\"",
  ],
]

const getRandomSummaryBullets = () => {
  const pool = summaryBulletPools[Math.floor(Math.random() * summaryBulletPools.length)]
  const numBullets = Math.random() > 0.5 ? 3 : 2
  return pool.slice(0, numBullets)
}

// Summary Dropdown Component for Feed
const FeedSummaryDropdown = ({ isOpen, isLoading, bullets, onToggle, onClose }) => {
  if (!isLoading && !isOpen && bullets.length === 0) return null
  
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg z-40">
      <button
        onClick={onToggle}
        disabled={isLoading}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="12" y2="18" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">Summary</span>
        </div>
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        ) : (
          isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )
        )}
      </button>
      
      {isOpen && bullets.length > 0 && (
        <div className="px-4 py-3 animate-fade-in border-b border-gray-100">
          <ul className="space-y-2.5">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* View investigation option */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          // TODO: Handle view investigation action
        }}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        <img src="/opsmate-logo.svg" alt="" className="w-4 h-4" />
        <span className="text-sm font-medium text-gray-700">View investigation</span>
      </button>
    </div>
  )
}

// Deterministic shuffle based on item ID for consistent ordering
const shuffleWithSeed = (array, seed) => {
  const shuffled = [...array]
  let currentIndex = shuffled.length
  let seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex)
    currentIndex--
    ;[shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]]
  }
  return shuffled
}

// Sample data matching the screenshot
const initialFeedItems = [
  {
    id: 1,
    type: 'SEV3',
    title: 'S448319 Taylor Swift - Life of a Showgirl - Only In Polish',
    comments: 2,
    newComments: true,
    hasBot: false,
    priority: 'Medium',
    status: 'Investigating',
    owner: 'David Kim',
    isFollowed: true,
    lastCommentTime: '16 hours ago',
    hasChatActivity: true,
  },
  {
    id: 2,
    type: 'ALERT',
    title: 'High memory usage on cache cluster',
    comments: 1,
    newComments: false,
    hasBot: true,
    botCount: 30,
    priority: 'High',
    status: 'Active',
    owner: 'Sarah Miller',
    isFollowed: true,
    lastCommentTime: '6.3 weeks ago',
    hasChatActivity: true,
  },
  {
    id: 3,
    type: 'SEV3',
    title: 'S512847 Super Bowl LVIII - Halftime Show - Audio Sync Failures',
    comments: 11,
    newComments: true,
    hasBot: false,
    priority: 'High',
    status: 'Mitigating',
    owner: 'Michael Chen',
    isFollowed: true,
    lastCommentTime: null,
    hasChatActivity: false,
  },
  {
    id: 4,
    type: 'ALERT',
    title: 'API latency threshold exceeded',
    comments: 9,
    newComments: true,
    hasBot: true,
    priority: 'High',
    status: 'Acknowledged',
    owner: 'Emily Rodriguez',
    isFollowed: true,
    lastCommentTime: null,
    hasChatActivity: false,
  },
  {
    id: 5,
    type: 'TASK',
    title: 'Task regression: Mobile Release protection setup',
    comments: 5,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'In Progress',
    owner: 'Alex Kumar',
    isFollowed: true,
    lastCommentTime: '3.3 months ago',
    hasChatActivity: true,
  },
  {
    id: 6,
    type: 'REGRESSION',
    title: 'Performance degradation in checkout flow',
    comments: 1,
    newComments: true,
    hasBot: true,
    botCount: 10,
    priority: 'Medium',
    status: 'Investigating',
    owner: 'Lisa Wong',
    isFollowed: true,
    lastCommentTime: null,
    hasChatActivity: false,
  },
  {
    id: 7,
    type: 'ALERT',
    title: 'Disk space warning on analytics cluster',
    comments: 1,
    newComments: false,
    hasBot: true,
    acked: true,
    priority: 'Medium',
    status: 'Active',
    owner: 'James Taylor',
    isFollowed: true,
    lastCommentTime: '8.2 months',
    hasChatActivity: true,
  },
  {
    id: 8,
    type: 'SEV3',
    title: 'S623914 Grammy Awards - Live Stream - Buffer Overflow Issues',
    comments: 5,
    newComments: true,
    hasBot: false,
    priority: 'High',
    status: 'Investigating',
    owner: 'Nina Patel',
    isFollowed: true,
    lastCommentTime: null,
    hasChatActivity: true,
  },
  {
    id: 9,
    type: 'TASK',
    title: 'Update monitoring dashboard thresholds',
    comments: 1,
    newComments: true,
    hasBot: true,
    priority: 'Low',
    status: 'To Do',
    owner: 'Rachel Park',
    isFollowed: false,
    lastCommentTime: null,
    hasChatActivity: true,
  },
  {
    id: 10,
    type: 'ALERT',
    title: 'SSL certificate expiring soon',
    comments: 2,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'Active',
    owner: 'Tom Wilson',
    isFollowed: true,
    lastCommentTime: '2 comments',
    hasChatActivity: false,
  },
  {
    id: 11,
    type: 'TASK',
    title: 'Task regression: Database connection pool tuning',
    comments: 0,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'To Do',
    owner: 'Maria Garcia',
    isFollowed: true,
    lastCommentTime: '2.1 weeks ago',
    hasChatActivity: true,
  },
  {
    id: 12,
    type: 'RECOMMENDATION',
    title: 'Missing detector for rb_app_responsiveness',
    comments: 0,
    newComments: false,
    hasBot: true,
    priority: 'High',
    status: 'Auto-apply',
    owner: 'System',
    isFollowed: false,
    lastCommentTime: null,
    hasChatActivity: false,
  },
]

// Type badge colors
const typeBadgeStyles = {
  SEV3: 'bg-red-100 text-red-700',
  ALERT: 'bg-amber-100 text-amber-700',
  TASK: 'bg-blue-100 text-blue-700',
  REGRESSION: 'bg-purple-100 text-purple-700',
  RECOMMENDATION: 'bg-gray-100 text-gray-600',
}

// Priority dropdown styles
const priorityStyles = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-green-50 text-green-700 border-green-200',
}

// Status dot colors
const statusDotColors = {
  'Investigating': 'bg-blue-500',
  'Active': 'bg-red-500',
  'Mitigating': 'bg-orange-500',
  'Acknowledged': 'bg-gray-400',
  'In Progress': 'bg-blue-500',
  'To Do': 'bg-gray-400',
  'Auto-apply': 'bg-gray-400',
}

// Status text colors
const statusTextColors = {
  'Investigating': 'text-blue-600',
  'Active': 'text-red-600',
  'Mitigating': 'text-orange-600',
  'Acknowledged': 'text-gray-600',
  'In Progress': 'text-blue-600',
  'To Do': 'text-gray-600',
  'Auto-apply': 'text-gray-600',
}

// Navigation items for the sidebar
const navItems = [
  { name: 'Feed', icon: Activity, active: true },
  { name: 'Quality Home', icon: Home },
  { name: 'Entities', icon: Target, expandable: true, expanded: true, subnav: [{ name: 'Agents' }] },
  { name: 'Metrics', icon: BarChart3 },
  { name: 'Incidents', icon: AlertTriangle },
  { type: 'divider' },
  { name: 'Data Exploration', icon: Search },
  { type: 'divider' },
  { name: 'Protections', icon: Shield },
  { name: 'SEV Criteria', icon: Flame },
]

// Opsmate Logo
function OpsmateLogo({ className }) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0206 15.0256C10.3164 15.8619 11.1136 16.4613 12.0513 16.4615C12.9891 16.4613 13.7863 15.8619 14.0821 15.0256H15.1493C14.8242 16.4359 13.5606 17.4872 12.0514 17.4872C10.5427 17.4872 9.27906 16.4359 8.95341 15.0256H10.0206ZM12.0508 16.4615H12.0519C12.0517 16.4615 12.0515 16.4615 12.0513 16.4615C12.0512 16.4615 12.051 16.4615 12.0508 16.4615Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.12879 7.38461C9.61545 7.38462 10.8211 8.59026 10.8211 10.0769C10.8211 11.5636 9.61545 12.7692 8.12879 12.7692C6.64213 12.7692 5.43649 11.5636 5.43649 10.0769C5.43649 8.59026 6.64213 7.38461 8.12879 7.38461ZM8.12879 8.41026C7.20828 8.41026 6.46213 9.15641 6.46213 10.0769C6.46213 10.9974 7.20828 11.7436 8.12879 11.7436C9.0493 11.7436 9.79546 10.9974 9.79546 10.0769C9.79546 9.15641 9.0493 8.41026 8.12879 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.8724 7.38461C17.359 7.38462 18.5647 8.59026 18.5647 10.0769C18.5647 11.5636 17.359 12.7692 15.8724 12.7692C14.3857 12.7692 13.1801 11.5636 13.1801 10.0769C13.1801 8.59026 14.3857 7.38461 15.8724 7.38461ZM15.8724 8.41026C14.9519 8.41026 14.2057 9.15641 14.2057 10.0769C14.2057 10.9974 14.9519 11.7436 15.8724 11.7436C16.7929 11.7436 17.5391 10.9974 17.5391 10.0769C17.5391 9.15641 16.7929 8.41026 15.8724 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6673 0C15.177 6.43207e-06 15.5903 0.413337 15.5903 0.923077V5.22922C15.9447 5.2087 16.2862 5.18513 16.616 5.16001V0.98152L18.7175 1.42874C20.2498 1.75489 21.3893 3.00361 21.6047 4.51848C21.6688 4.50617 21.7293 4.49385 21.7867 4.48257C22.019 4.43591 22.1944 4.39746 22.3103 4.37079C22.3683 4.35746 22.4114 4.34716 22.439 4.34049C22.4529 4.33742 22.4631 4.33487 22.4693 4.33333C22.4724 4.33282 22.4744 4.33178 22.4755 4.33178H22.476C22.8877 4.22614 23.3067 4.47435 23.4123 4.88562H23.4113C23.517 5.29741 23.2688 5.71642 22.8575 5.82206C22.8483 5.82463 22.8185 5.83178 22.8016 5.83589C22.7673 5.84409 22.718 5.85592 22.6534 5.87079C22.5247 5.90002 22.3354 5.94154 22.0888 5.99129C21.9442 6.02 21.7795 6.05179 21.5954 6.08564C21.6252 6.27487 21.6411 6.46923 21.6411 6.66667V17.7436C21.6411 19.7667 20.0139 21.4103 17.9965 21.4359H14.9744C14.7406 21.7472 14.3683 21.9487 13.9488 21.9487H10.0514C9.63189 21.9487 9.25958 21.7472 9.02573 21.4359H6.00364C3.98621 21.4108 2.35906 19.7672 2.35906 17.7441V6.66717C2.35906 6.46922 2.37494 6.27536 2.40469 6.08614C2.22058 6.05229 2.05596 6.02102 1.91135 5.99179C1.66469 5.94256 1.47597 5.90104 1.34674 5.87129C1.28213 5.85642 1.23287 5.84459 1.19851 5.83639C1.18158 5.83228 1.15184 5.82513 1.14262 5.82257C0.731345 5.71692 0.483149 5.29744 0.58878 4.88617C0.694421 4.47489 1.1139 4.2267 1.52518 4.33233H1.52573C1.52676 4.33235 1.5288 4.33332 1.53184 4.33383C1.53799 4.33537 1.54829 4.33746 1.56214 4.34105C1.58983 4.34771 1.63291 4.35796 1.69084 4.37129C1.80623 4.39796 1.98213 4.43641 2.21443 4.48307C2.27187 4.49487 2.33237 4.50667 2.39647 4.51898C2.61186 3.00411 3.75134 1.75539 5.28364 1.42924L7.3852 0.982071V5.16051C7.71494 5.18563 8.05649 5.20925 8.41085 5.22977V0.923077C8.41085 0.413333 8.82418 0 9.33392 0H14.6673ZM19.9411 6.35181C18.076 6.61233 15.3739 6.87179 12.0011 6.87179C8.62827 6.87179 5.9257 6.61284 4.06109 6.35181C4.01493 6.34515 3.96929 6.339 3.92417 6.33233C3.90673 6.44104 3.89803 6.55283 3.89803 6.66667V17.7436C3.89803 18.9333 4.86213 19.8974 6.05187 19.8974H9.02623C9.26008 19.5862 9.63239 19.3846 10.0519 19.3846H13.9493C14.3688 19.3846 14.7411 19.5862 14.9749 19.8974H17.9493C19.139 19.8974 20.1032 18.9333 20.1032 17.7436H20.1042V6.66667C20.1042 6.55283 20.0949 6.44155 20.078 6.33233C20.0329 6.339 19.9872 6.34515 19.9411 6.35181ZM10.616 1.4359C10.3611 1.4359 10.1544 1.64256 10.1544 1.89744V2.14874C10.1544 3.06155 10.5601 3.92771 11.2616 4.51232L11.7052 4.88206C11.7909 4.95333 11.896 4.98923 12.0006 4.98923C12.1052 4.98923 12.2103 4.95334 12.296 4.88206L12.7396 4.51232C13.4411 3.92771 13.8467 3.06206 13.8467 2.14874V1.89744C13.8467 1.64257 13.6401 1.4359 13.3852 1.4359H10.616Z" fill="currentColor"/>
    </svg>
  )
}

// OneMonitoring Logo
const OneMonitoringLogo = () => (
  <svg width="32" height="25" viewBox="0 0 73 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M72.186 51.1272C72.1736 53.2786 70.4189 55.0136 68.2676 55.0026C66.1153 54.991 64.3775 53.2364 64.3889 51.0842L72.186 51.1272ZM38.9722 49.4096C38.9722 51.5244 37.9538 53.3139 36.7714 54.4963C35.5892 55.6781 33.8019 56.6968 31.6881 56.6971H7.28743C2.85296 56.697 0 52.9988 0 49.4096V44.5216C0 42.6195 0.653047 40.7314 2.07503 39.3092C3.4973 37.8869 5.38518 37.2342 7.28743 37.2341H7.37348L7.66471 21.4513H7.53564C3.10105 21.4513 0.24821 17.7531 0.24821 14.1639V12.1319C0.24821 8.62572 2.46487 5.08602 5.74523 3.77216L5.74854 3.76885C5.76119 3.76364 5.7869 3.75369 5.82134 3.73907C5.89055 3.70968 6.00052 3.66121 6.14236 3.59676C6.42935 3.46632 6.8386 3.27125 7.29736 3.02422C8.27229 2.49921 9.24118 1.86467 9.8622 1.24373L10.1567 0.975668C11.6875 -0.273454 13.9454 -0.183336 15.3724 1.24373C16.8942 2.76571 16.8943 5.23209 15.3724 6.75399C13.9604 8.16601 12.2182 9.22714 10.9907 9.88805C10.3485 10.2338 9.78088 10.5051 9.36909 10.6922C9.16319 10.7858 8.99302 10.8581 8.86936 10.9107C8.80737 10.937 8.75506 10.9612 8.71712 10.9769C8.69904 10.9843 8.68299 10.9885 8.67079 10.9934C8.66494 10.9958 8.65866 10.9982 8.65424 11L8.64762 11.0033L8.64431 11.0066C8.6152 11.0259 8.4665 11.1236 8.30344 11.374C8.11148 11.6693 8.04199 11.9594 8.04199 12.1319V13.6575H8.21077C11.6797 13.6575 15.4717 16.3006 15.4717 20.8457C15.4717 20.8697 15.4722 20.8945 15.4717 20.9185L15.1573 37.8629L15.154 37.8596C15.129 40.1366 13.8817 41.9223 12.6785 42.9992C11.4834 44.0686 9.75188 44.9677 7.79709 45.018V48.9033H31.1784V45.0014C27.0626 44.7443 24.9344 41.3929 24.6753 38.4057L24.6489 37.7901V5.35409C24.6489 4.73218 24.7012 3.93382 24.96 3.14006C25.165 2.51143 25.8844 0.755852 27.9418 0.168159C30.0295 -0.427717 31.5792 0.719272 32.1051 1.17754C32.7364 1.72795 33.2087 2.39686 33.5546 2.96796L48.5399 27.2131L63.5251 2.96796C63.8709 2.39709 64.3404 1.72772 64.9714 1.17754C65.4965 0.719697 67.0486 -0.428646 69.138 0.168159C71.1952 0.755913 71.9115 2.51145 72.1165 3.14006C72.3754 3.93402 72.4309 4.73202 72.4309 5.35409V5.37394L72.186 51.1272L64.3889 51.0842L64.5775 16.0867L53.5504 33.9346L53.5471 33.9313C52.7411 35.256 51.1239 37.0518 48.5399 37.0521C45.9565 37.0521 44.3357 35.2592 43.5294 33.9346L32.4427 15.994V37.2672C34.0824 37.4189 35.6669 38.0755 36.9005 39.3092C38.3222 40.7314 38.9722 42.6196 38.9722 44.5216V49.4096Z" fill="url(#paint0_linear_feed)"/>
    <defs>
      <linearGradient id="paint0_linear_feed" x1="4.93846" y1="52.8314" x2="51.527" y2="-5.07724" gradientUnits="userSpaceOnUse">
        <stop stopColor="#222AEC"/>
        <stop offset="1" stopColor="#3C7CF1"/>
      </linearGradient>
    </defs>
  </svg>
)

// Opsmate Panel Component
function OpsmatePanel({ item, onClose }) {
  const [message, setMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const chatContainerRef = useRef(null)
  
  // Initialize with greeting when item changes
  useEffect(() => {
    if (item) {
      setChatMessages([
        {
          id: 'initial',
          type: 'assistant',
          content: `Hi! I'm Opsmate. I can help you investigate this ${item.type.toLowerCase()} and find relevant information.`,
          quickActions: [
            { id: 'summarize', label: 'Summarize' },
            { id: 'investigate', label: 'Start investigation' },
            { id: 'find-related', label: 'Find related issues' },
          ],
        },
      ])
    }
  }, [item])
  
  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const userMessage = message.trim()
    setMessage('')
    
    // Add user message
    setChatMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessage,
    }])
    
    // Start thinking
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsThinking(false)
    
    // Add response
    setChatMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      content: `I understand you're asking about "${item.title}". Let me analyze this for you.`,
      quickActions: [
        { id: 'more-context', label: 'Get more context' },
        { id: 'explain', label: 'Explain in detail' },
      ],
    }])
  }
  
  const handleQuickAction = async (actionId) => {
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsThinking(false)
    
    const responses = {
      summarize: `This is a ${item.priority} priority ${item.type.toLowerCase()} currently in ${item.status} status. It has ${item.comments} comments and is owned by ${item.owner}.`,
      investigate: `Starting investigation for "${item.title}". I'll analyze related metrics, logs, and similar incidents to help you understand the root cause.`,
      'find-related': `I found 3 related issues that share similar patterns with this ${item.type.toLowerCase()}. Would you like me to show you the details?`,
      'more-context': 'Let me gather more context about this issue from related systems and historical data.',
      explain: `This ${item.type.toLowerCase()} was created and is currently being ${item.status.toLowerCase()}. The owner ${item.owner} has been working on it with the team.`,
    }
    
    setChatMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      content: responses[actionId] || 'I can help you with that.',
      quickActions: [
        { id: 'summarize', label: 'Summarize' },
        { id: 'more-context', label: 'Get more context' },
      ],
    }])
  }
  
  if (!item) return null
  
  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col w-[380px] shrink-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <OpsmateLogo className="w-6 h-6 text-gray-900" />
          <span className="font-semibold text-gray-900">Opsmate</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Chat Content */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
        {chatMessages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'user' && (
              <div className="flex flex-col items-end">
                <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            )}
            
            {msg.type === 'assistant' && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <OpsmateLogo className="w-5 h-5 text-gray-900" />
                  <span className="text-sm font-medium text-gray-900">Opsmate</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {msg.content}
                </p>
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isThinking}
                        className="px-3 py-2 rounded-lg text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        
        {/* Thinking State */}
        {isThinking && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <OpsmateLogo className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Opsmate</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="px-4 pt-4 pb-5 border-t border-gray-100 bg-white shrink-0">
        <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors overflow-hidden">
          {/* Referenced Item */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 text-gray-600 min-w-0">
              <CornerDownRight className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium truncate">"{item.title}"</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          {/* Input Row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-2 rounded-full transition-colors ${
                message.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          Do not submit any <a href="#" className="underline hover:text-gray-500">User Data</a> into Opsmate
        </p>
      </div>
    </div>
  )
}

export default function Feed({ onAskOpsmate }) {
  const [feedItems, setFeedItems] = useState(initialFeedItems)
  const [activeFilters, setActiveFilters] = useState(['Alerts', 'Regressions', 'SEVs', 'Tasks'])
  const [oncallFilter, setOncallFilter] = useState('MSE, DSE...')
  const [showUnacknowledged, setShowUnacknowledged] = useState(false)
  const [showForMe, setShowForMe] = useState(false)
  const [openPriorityDropdown, setOpenPriorityDropdown] = useState(null)
  const [openActionDropdown, setOpenActionDropdown] = useState(null)
  const [expandedNavItems, setExpandedNavItems] = useState({ 'Entities': true })
  const [selectedItem, setSelectedItem] = useState(null)
  
  // Summary dropdown state - tracks per item
  const [summaryStates, setSummaryStates] = useState({})

  const handleSummarizeClick = async (e, itemId) => {
    e.stopPropagation()
    
    // If already showing, toggle it closed
    if (summaryStates[itemId]?.open) {
      setSummaryStates(prev => ({
        ...prev,
        [itemId]: { loading: false, open: false, bullets: [] }
      }))
      return
    }
    
    // Set loading state
    setSummaryStates(prev => ({
      ...prev,
      [itemId]: { loading: true, open: false, bullets: [] }
    }))
    
    // Wait 1 second for loading
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate random bullets and show dropdown
    const bullets = getRandomSummaryBullets()
    setSummaryStates(prev => ({
      ...prev,
      [itemId]: { loading: false, open: true, bullets }
    }))
  }

  const closeSummaryDropdown = (itemId) => {
    setSummaryStates(prev => ({
      ...prev,
      [itemId]: { loading: false, open: false, bullets: [] }
    }))
  }
  const [opsmateItem, setOpsmateItem] = useState(null)

  const handleRowClick = (item) => {
    setSelectedItem(item)
    // Close any open dropdowns when selecting a row
    setOpenPriorityDropdown(null)
    setOpenActionDropdown(null)
  }

  const closeFlyout = () => {
    setSelectedItem(null)
  }

  const typeFilters = ['Alerts', 'Regressions', 'SEVs', 'Tasks']

  const toggleTypeFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handlePriorityChange = (itemId, newPriority) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, priority: newPriority } : item
      )
    )
    setOpenPriorityDropdown(null)
  }

  const filteredItems = feedItems.filter(item => {
    // Type filter logic
    const typeMapping = {
      'SEV3': 'SEVs',
      'ALERT': 'Alerts',
      'TASK': 'Tasks',
      'REGRESSION': 'Regressions',
      'RECOMMENDATION': 'Tasks', // Group recommendations with tasks
    }
    return activeFilters.includes(typeMapping[item.type]) || item.type === 'RECOMMENDATION'
  })

  const toggleNavExpand = (name) => {
    setExpandedNavItems(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleNavClick = (item) => {
    if (item.name === 'Incidents') {
      // Navigate back to main dashboard
      window.location.href = window.location.pathname.includes('dist') 
        ? '../../../index.html' 
        : '/index.html'
    } else if (item.name === 'Entities') {
      window.location.href = window.location.pathname.replace(/\/[^/]*$/, '/') + '?page=entities'
    } else if (item.name === 'Metrics') {
      window.location.href = window.location.pathname.replace(/\/[^/]*$/, '/') + '?page=metrics'
    }
  }

  return (
    <div className="h-screen flex bg-[#f5f6f8] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[260px] h-full bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-200">
          <OneMonitoringLogo />
          <span className="text-lg font-semibold text-gray-900">OneMonitoring</span>
        </div>

        {/* Create Button */}
        <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-[#222AEC] to-[#3C7CF1] text-white text-sm font-medium rounded-lg mb-3 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Create
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Discover" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={index} className="h-px bg-gray-200 my-3" />
            }

            const Icon = item.icon
            const isExpanded = expandedNavItems[item.name]

            return (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (item.name === 'Entities' || item.name === 'Metrics') {
                      handleNavClick(item)
                    } else if (item.expandable) {
                      toggleNavExpand(item.name)
                    } else {
                      handleNavClick(item)
                    }
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.expandable && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                  )}
                </button>
                
                {/* Subnav */}
                {item.expandable && item.subnav && isExpanded && (
                  <div className="ml-7 mt-0.5">
                    {item.subnav.map(subitem => (
                      <button
                        key={subitem.name}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {subitem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${selectedItem ? 'mr-0' : ''}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Feed</h1>
          <button 
            onClick={() => {
              if (selectedItem) {
                setOpsmateItem(selectedItem)
              }
            }}
            disabled={!selectedItem}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedItem 
                ? 'bg-gradient-to-r from-[#222AEC] to-[#3C7CF1] text-white hover:opacity-90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C17.52 2 22 6.48 22 12s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm.86 4.56c-.32-.75-1.38-.75-1.7 0l-1.23 2.85c-.09.22-.27.39-.49.48l-2.89 1.23c-.74.32-.75 1.38 0 1.7l2.77 1.22c.21.09.38.26.47.46l1.34 2.95c.33.73 1.38.72 1.7.02l1.25-2.91c.09-.22.27-.39.49-.49l2.86-1.22c.75-.32.75-1.38 0-1.7l-2.86-1.22c-.22-.09-.39-.27-.49-.49l-1.22-2.85z"/>
            </svg>
            Ask Opsmate
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Oncall Filter */}
            <span className="text-sm text-gray-500">Filters:</span>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <span>Oncall: {oncallFilter}</span>
              <button 
                onClick={() => setOncallFilter('')}
                className="ml-1 p-0.5 hover:bg-blue-100 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Type Filters */}
            <span className="text-sm text-gray-500 ml-2">Types:</span>
            {typeFilters.map(filter => (
              <button
                key={filter}
                onClick={() => toggleTypeFilter(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeFilters.includes(filter)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Right side filters */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUnacknowledged(!showUnacknowledged)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                showUnacknowledged
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unacknowledged
            </button>
            <button
              onClick={() => setShowForMe(!showForMe)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                showForMe
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              For me
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-500">
          {filteredItems.length} results
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[45%]">
                  <div className="flex items-center gap-1">
                    Title
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
                  <div className="flex items-center gap-1">
                    Priority
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                  <div className="flex items-center gap-1">
                    Owner
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[13%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => handleRowClick(item)}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-50' : ''}`}
                >
                  {/* Title Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      {/* Type Badge */}
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${typeBadgeStyles[item.type]}`}>
                        {item.type}
                      </span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.type === 'SEV3' ? (
                            <a 
                              href="http://localhost:8888/sev-detail.html"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline text-gray-900"
                            >
                              {item.title}
                            </a>
                          ) : item.type === 'RECOMMENDATION' ? (
                            <a 
                              href="http://localhost:8888/opsmate-protection/?mode=protection"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline text-gray-900"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {(() => {
                            // Build badges array based on item properties
                            const badges = []
                            
                            // Followed badge (gray)
                            if (item.isFollowed) {
                              badges.push(
                                <span key="followed" className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                                  <Eye className="w-3 h-3" />
                                  Followed
                                </span>
                              )
                            }
                            
                            // Single comment badge (blue) - only show one type
                            if (item.newComments && item.comments > 0) {
                              badges.push(
                                <span key="comment" className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                  <MessageSquare className="w-3 h-3" />
                                  {item.comments} new comments
                                </span>
                              )
                            } else if (item.lastCommentTime) {
                              badges.push(
                                <span key="comment" className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                  <MessageSquare className="w-3 h-3" />
                                  Last comment {item.lastCommentTime}
                                </span>
                              )
                            } else if (item.comments > 0) {
                              badges.push(
                                <span key="comment" className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                  <MessageSquare className="w-3 h-3" />
                                  {item.comments} comments
                                </span>
                              )
                            }
                            
                            // Bot badge (gray)
                            if (item.hasBot) {
                              badges.push(
                                <span key="bot" className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-200 text-gray-600 uppercase tracking-wide">
                                  <span className="font-bold">BOT</span>
                                  Bot
                                </span>
                              )
                            }
                            
                            // Shuffle badges based on item ID for scattered appearance
                            return shuffleWithSeed(badges, item.id * 17)
                          })()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Priority Column */}
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() => setOpenPriorityDropdown(openPriorityDropdown === item.id ? null : item.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${priorityStyles[item.priority]}`}
                      >
                        {item.priority}
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {openPriorityDropdown === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-20" 
                            onClick={() => setOpenPriorityDropdown(null)}
                          />
                          <div className="absolute left-0 top-full mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-200 z-30 py-1">
                            {['High', 'Medium', 'Low'].map((priority) => (
                              <button
                                key={priority}
                                onClick={() => handlePriorityChange(item.id, priority)}
                                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  priority === 'High' ? 'bg-red-500' :
                                  priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                                }`} />
                                {priority}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDotColors[item.status]}`} />
                      <span className={`text-sm font-medium ${statusTextColors[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Owner Column */}
                  <td className="px-4 py-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">
                      {item.owner}
                    </button>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Summarize Button */}
                      <div className="relative">
                        <button
                          onClick={(e) => handleSummarizeClick(e, item.id)}
                          disabled={summaryStates[item.id]?.loading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-[#E6EBEF] hover:bg-[#D8DEE4] border border-gray-200 rounded-lg transition-colors disabled:opacity-70"
                        >
                          {summaryStates[item.id]?.loading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <SummarizeIcon className="w-3.5 h-3.5" />
                          )}
                          Summarize
                        </button>

                        {/* Summary Dropdown */}
                        {(summaryStates[item.id]?.loading || summaryStates[item.id]?.open) && (
                          <>
                            <div 
                              className="fixed inset-0 z-30" 
                              onClick={(e) => {
                                e.stopPropagation()
                                closeSummaryDropdown(item.id)
                              }}
                            />
                            <FeedSummaryDropdown
                              isOpen={summaryStates[item.id]?.open || false}
                              isLoading={summaryStates[item.id]?.loading || false}
                              bullets={summaryStates[item.id]?.bullets || []}
                              onToggle={() => {
                                setSummaryStates(prev => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    open: !prev[item.id]?.open
                                  }
                                }))
                              }}
                              onClose={() => closeSummaryDropdown(item.id)}
                            />
                          </>
                        )}
                      </div>

                      {/* Link Icon */}
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Link2 className="w-4 h-4" />
                      </button>

                      {/* More Options */}
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Flyout Panel */}
      <div 
        className={`h-full bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
          selectedItem && !opsmateItem ? 'w-[480px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {selectedItem && !opsmateItem && (
          <>
            {/* Flyout Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${typeBadgeStyles[selectedItem.type]}`}>
                  {selectedItem.type}
                </span>
                <span className={`flex items-center gap-1.5 text-sm font-medium ${statusTextColors[selectedItem.status]}`}>
                  <span className={`w-2 h-2 rounded-full ${statusDotColors[selectedItem.status]}`} />
                  {selectedItem.status}
                </span>
              </div>
              <button 
                onClick={closeFlyout}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flyout Title */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedItem.type === 'SEV3' ? (
                  <a 
                    href="http://localhost:8888/sev-detail.html"
                    className="hover:underline"
                  >
                    {selectedItem.title}
                  </a>
                ) : (
                  selectedItem.title
                )}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedItem.owner}
                </span>
                {selectedItem.comments > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {selectedItem.comments} comments
                  </span>
                )}
              </div>
            </div>

            {/* Flyout Content */}
            <div className="flex-1 overflow-auto p-6">
              {/* Ask Opsmate button in flyout */}
              <button
                onClick={() => setOpsmateItem(selectedItem)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#222AEC] to-[#3C7CF1] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C17.52 2 22 6.48 22 12s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm.86 4.56c-.32-.75-1.38-.75-1.7 0l-1.23 2.85c-.09.22-.27.39-.49.48l-2.89 1.23c-.74.32-.75 1.38 0 1.7l2.77 1.22c.21.09.38.26.47.46l1.34 2.95c.33.73 1.38.72 1.7.02l1.25-2.91c.09-.22.27-.39.49-.49l2.86-1.22c.75-.32.75-1.38 0-1.7l-2.86-1.22c-.22-.09-.39-.27-.49-.49l-1.22-2.85z"/>
                </svg>
                Ask Opsmate about this
              </button>
            </div>
          </>
        )}
      </div>

      {/* Opsmate Panel */}
      {opsmateItem && (
        <OpsmatePanel 
          item={opsmateItem} 
          onClose={() => setOpsmateItem(null)} 
        />
      )}
    </div>
  )
}

