interface ExperienceSectionEntry {
  primaryText: string
  secondaryText: string
  tags?: string[]
  link?: { href: string; text: string }
}

const experienceData: ExperienceSectionEntry[] = [
  {
    primaryText: 'AMB Software IT Services Sp. z o.o / REWE Digital Poland Sp. z o.o.',
    secondaryText: '2024 - Present',
    tags: [
      'Java',
      'Typescript',
      'Spring Boot',
      'Angular',
      'DB2',
      'Kafka',
      'Keycloak',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    primaryText: 'Biot Sp. z o.o',
    secondaryText: '2019 - 2024',
    tags: [
      'Typescript',
      'Node.JS',
      'Express.JS',
      'Nest.JS',
      'React',
      'GRPC',
      'PostgreSQL',
      'RabbitMQ',
      'Redis',
      'ElasticSearch',
      'Material.UI',
      'Mapbox.GL',
      'Deck.GL',
      'Docker',
      'Kubernetes',
    ],
    link: { href: 'https://biotcloud.com', text: 'biotcloud' },
  },
  {
    primaryText: 'Cinkciarz.pl',
    secondaryText: '2015 - 2019',
    tags: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'PostgreSQL', 'Bootstrap', 'Docker'],
    link: { href: 'https://forex.cinkciarz.pl', text: 'Forex' },
  },
  {
    primaryText: 'Trax S.A. / Icomp Sp. z o.o.',
    secondaryText: '2013 - 2015',
    tags: ['Infor Syteline', 'Visual Basic', 'T-SQL'],
  },
]

export default experienceData
