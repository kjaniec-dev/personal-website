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
      "TypeScript is my go-to language. I love the type safety, excellent IDE support, and the flexibility to use it across the entire stack - from React frontends to Node.js backends. That said, Java holds a special place in my heart for enterprise applications and its robust ecosystem.",
    category: 'technical',
  },
  {
    question: 'Frontend or Backend?',
    answer:
      "Full-stack, but if I had to choose, I'd lean slightly towards backend. I enjoy designing system architectures, working with databases, and building APIs. However, there's something satisfying about crafting smooth user experiences on the frontend too.",
    category: 'technical',
  },
  {
    question: "What's your go-to tech stack for a new project?",
    answer:
      "For most projects: Next.js + TypeScript + Tailwind CSS on the frontend, Node.js with NestJS or Express on the backend, and PostgreSQL for the database. Add Docker for containerization and you're good to go. For enterprise projects, I'd reach for Java with Spring Boot.",
    category: 'technical',
  },
  {
    question: 'Tabs or spaces?',
    answer: "Spaces. 2 spaces for JavaScript/TypeScript, 4 for Java. But honestly, as long as the team is consistent, I'm happy. Prettier handles this for me anyway!",
    category: 'technical',
  },
  {
    question: 'What IDE do you use?',
    answer:
      "VS Code for JavaScript/TypeScript work - it's fast, extensible, and has amazing TypeScript support. IntelliJ IDEA for Java projects - nothing beats its refactoring capabilities and Spring integration.",
    category: 'technical',
  },
  {
    question: 'Do you still learn new things?',
    answer:
      "Always! I've completed over 80 courses on various platforms covering everything from machine learning to mobile development. Currently, I'm diving deeper into AI/ML and exploring how to integrate LLMs into practical applications.",
    category: 'technical',
  },

  // Work & Experience
  {
    question: 'What kind of projects excite you most?',
    answer:
      "Projects that solve real problems and have a meaningful impact. I particularly enjoy building scalable distributed systems, real-time applications, and IoT solutions. My Planning Poker project and various IoT experiments reflect this passion for practical, interactive systems.",
    category: 'work',
  },
  {
    question: 'Are you open to freelance or contract work?',
    answer:
      "I'm always open to interesting opportunities! Feel free to reach out via email or LinkedIn to discuss potential collaborations. I'm particularly interested in projects involving modern web technologies, system architecture, or IoT.",
    category: 'work',
  },
  {
    question: 'Remote or on-site preference?',
    answer:
      "I prefer hybrid or remote work. I've been working effectively in remote/hybrid setups and appreciate the flexibility it provides. That said, I value face-to-face collaboration for complex problem-solving and team building.",
    category: 'work',
  },
  {
    question: 'How many years of experience do you have?',
    answer:
      "Over 12 years in software development, starting from 2013. I've worked across various domains including fintech, healthcare/IoT, and retail, gaining experience with diverse tech stacks and architectural patterns.",
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
      "I enjoy photo editing (hence the Affinity Photo course!), tinkering with electronics and IoT projects, and continuous learning. I'm also interested in data science and machine learning, which I explore through various courses and side projects.",
    category: 'personal',
  },
  {
    question: 'Coffee or tea while coding?',
    answer: "Coffee, definitely. A good espresso in the morning sets the right tone for a productive coding session. Though I switch to tea in the evenings when debugging late-night issues.",
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
      "The best way is via email at contact@kjaniec.dev or through LinkedIn. I try to respond within a day or two. For professional inquiries, LinkedIn tends to work best.",
    category: 'contact',
  },
  {
    question: 'Are you open to collaboration?',
    answer:
      "Absolutely! Whether it's open-source projects, technical writing, speaking opportunities, or consulting - I'm always interested in connecting with fellow developers and exploring new collaborations.",
    category: 'contact',
  },
]

export default faqData
