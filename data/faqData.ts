export interface FAQItem {
  question: string
  answer: string
  category: 'technical' | 'work' | 'personal' | 'contact'
}

const faqData: FAQItem[] = [
  // Technical Preferences
  {
    question: "What's your preferred programming language?",
    answer:
      "On the backend: Golang, Python, and Rust. On the frontend: TypeScript. That's my preferred combo for building reliable, performant systems end-to-end.",
    category: 'technical',
  },
  {
    question: 'Frontend or Backend?',
    answer:
      "Both — I'm truly full‑stack and also comfortable with DevOps. I like to take things from idea to production: frontend, backend, infra, CI/CD — the whole thing.",
    category: 'technical',
  },
  {
    question: "What's your go-to tech stack for a new project?",
    answer:
      "It depends on the project's specifics and constraints — I pick tools to fit the problem. The good news: with me, you have it covered broadly, from frontend and backend to infrastructure.",
    category: 'technical',
  },
  {
    question: 'Tabs or spaces?',
    answer: 'No strong preference — the team should decide. Consistency is what matters.',
    category: 'technical',
  },
  {
    question: 'What IDE do you use?',
    answer:
      'JetBrains suite: IntelliJ IDEA for miscellaneous/monorepos, GoLand for Go, PyCharm for Python, WebStorm for frontend, DataGrip for databases, and so on. For COBOL, I use VS Code.',
    category: 'technical',
  },
  {
    question: 'Do you still learn new things?',
    answer:
      'Absolutely — I try to learn daily. I explore broadly across mobile, web, DevOps, and machine learning, keeping my toolkit sharp without fixating on course counts.',
    category: 'technical',
  },
  {
    question: "What's your experience with cloud platforms?",
    answer:
      'Solid experience with AWS and GCP, plus Kubernetes and Docker. I handle the full DevOps cycle — infrastructure as code, CI/CD pipelines, container orchestration. I can take projects from local development to production-ready cloud deployments.',
    category: 'technical',
  },

  // Frontend preference
  {
    question: 'Which frontend framework/library do you prefer?',
    answer: 'From the heart — React. I have 5+ years of experience with both React and Angular.',
    category: 'technical',
  },

  // Work & Experience
  {
    question: 'What kind of projects excite you most?',
    answer:
      'Projects that solve real problems and have a meaningful impact. I particularly enjoy building scalable distributed systems, real-time applications, and IoT solutions. My Planning Poker project and various IoT experiments reflect this passion for practical, interactive systems.',
    category: 'work',
  },
  {
    question: 'Are you open to freelance or contract work?',
    answer:
      "I'm always open to interesting opportunities! Feel free to reach out via email or LinkedIn to discuss potential collaborations. I'm particularly interested in modern web technologies and system architecture — anything non‑trivial.",
    category: 'work',
  },
  {
    question: 'Remote or on-site preference?',
    answer: 'Remote for the win — only remote, and I love it.',
    category: 'work',
  },
  {
    question: 'How many years of experience do you have?',
    answer:
      "Over 12 years in software development, starting from 2013. I've worked across various domains including fintech, healthcare/IoT, and retail, gaining experience with diverse tech stacks and architectural patterns.",
    category: 'work',
  },
  {
    question: "What's your most challenging project to date?",
    answer:
      'Building distributed IoT systems with real-time data processing. Coordinating sensors, edge computing, and cloud infrastructure while maintaining reliability and performance taught me a lot about system resilience and scalability.',
    category: 'work',
  },
  {
    question: 'Do you offer technical consulting or code reviews?',
    answer:
      "Absolutely. Architecture reviews, code audits, tech stack evaluations, and performance optimization — I'm happy to lend my expertise. Sometimes a second set of experienced eyes is all you need.",
    category: 'work',
  },
  {
    question: "What's your notice period for new projects?",
    answer:
      'At least 3 months. Reach out early if you have specific timelines so we can plan accordingly.',
    category: 'work',
  },

  // Personal
  {
    question: 'Why "kjaniec.dev"?',
    answer:
      "Simple and professional - it's my surname (Janiec) with a 'k' for Krzysztof, plus .dev because... well, I'm a developer! It's easy to remember and clearly communicates what I do.",
    category: 'personal',
  },
  {
    question: 'What do you do outside of coding?',
    answer:
      "Playing games on various platforms — PlayStation, Nintendo, Xbox, and PC. I'm a big fan of Souls and souls‑like games.",
    category: 'personal',
  },
  {
    question: 'Coffee or tea while coding?',
    answer: 'Definitely coffee — black, without milk.',
    category: 'personal',
  },
  {
    question: 'What inspired you to become a developer?',
    answer:
      "Curiosity and the desire to create things. I've always been fascinated by how software can solve problems and automate tasks. The ability to turn ideas into working applications is incredibly rewarding.",
    category: 'personal',
  },

  // Contact
  {
    question: 'How can I reach you?',
    answer:
      'Preferably via email at contact@kjaniec.dev. LinkedIn is also okay, though some days I may not have time to check it.',
    category: 'contact',
  },
  {
    question: 'Are you open to collaboration?',
    answer:
      "Absolutely! Whether it's open-source projects, technical writing, speaking opportunities, or consulting - I'm always interested in connecting with fellow developers and exploring new collaborations.",
    category: 'contact',
  },
  {
    question: 'What timezone do you work in?',
    answer:
      "Central European Time (CET/CEST) — Poland. I'm flexible with meeting times for collaboration with other timezones, especially for kickoffs and important discussions.",
    category: 'contact',
  },
]

export default faqData
