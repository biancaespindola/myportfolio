import type { Locale } from "@/i18n/config";

type JobText = { role: string; place: string; bullets: string[] };

export type Job = {
  id: string;
  company: string;
  /** ISO year-month; formatted per locale at render time. */
  start: string;
  end?: string;
  award?: boolean;
  tags: string[];
  text: Record<Locale, JobText>;
};

export const experience: Job[] = [
  {
    id: "comeon",
    company: "ComeOn Group",
    start: "2024-04",
    award: true,
    tags: ["React", "Next.js", "TypeScript", "Zustand", "i18n", "Figma"],
    text: {
      en: {
        role: "Frontend Developer",
        place: "Graz, Austria · On-site",
        bullets: [
          "Main frontend developer in my team: I turn client problems into features people enjoy",
          "Sportsbook features in React and Next.js: Boosted Odds, Bet Builder, dashboards",
          "Multilingual releases in EN, PT-BR and DE-AT",
          "Reusable UI components and docs that make the whole team faster",
        ],
      },
      pt: {
        role: "Desenvolvedora Frontend",
        place: "Graz, Áustria · Presencial",
        bullets: [
          "Principal desenvolvedora frontend do meu time: transformo problemas de clientes em funcionalidades que as pessoas curtem",
          "Funcionalidades de sportsbook em React e Next.js: Boosted Odds, Bet Builder, dashboards",
          "Lançamentos multilíngues em EN, PT-BR e DE-AT",
          "Componentes de UI reutilizáveis e documentação que deixam o time inteiro mais rápido",
        ],
      },
      it: {
        role: "Sviluppatrice Frontend",
        place: "Graz, Austria · In sede",
        bullets: [
          "Principale sviluppatrice frontend del mio team: trasformo i problemi dei clienti in funzionalità che piacciono",
          "Funzionalità sportsbook in React e Next.js: Boosted Odds, Bet Builder, dashboard",
          "Rilasci multilingue in EN, PT-BR e DE-AT",
          "Componenti UI riutilizzabili e documentazione che rendono più veloce tutto il team",
        ],
      },
      de: {
        role: "Frontend-Entwicklerin",
        place: "Graz, Österreich · Vor Ort",
        bullets: [
          "Wichtigste Frontend-Entwicklerin im Team: Ich mache aus Kundenproblemen Features, die Spaß machen",
          "Sportsbook-Features in React und Next.js: Boosted Odds, Bet Builder, Dashboards",
          "Mehrsprachige Releases in EN, PT-BR und DE-AT",
          "Wiederverwendbare UI-Komponenten und Dokumentation, die das ganze Team schneller machen",
        ],
      },
    },
  },
  {
    id: "khomp-frontend",
    company: "Khomp",
    start: "2022-03",
    end: "2024-04",
    tags: ["TypeScript", "React", "MUI", "Redux", "WCAG"],
    text: {
      en: {
        role: "Front-end Developer",
        place: "Remote, Brazil",
        bullets: [
          "Large TypeScript / React / MUI app, from user stories to shipped features",
          "Raised accessibility by 20% through WCAG compliance",
          "REST integrations with Redux, Next.js and Node.js; back ends in PHP, Node and C++",
        ],
      },
      pt: {
        role: "Desenvolvedora Front-end",
        place: "Remoto, Brasil",
        bullets: [
          "Aplicação grande em TypeScript / React / MUI, de user stories a funcionalidades entregues",
          "Aumentei a acessibilidade em 20% com conformidade WCAG",
          "Integrações REST com Redux, Next.js e Node.js; back-ends em PHP, Node e C++",
        ],
      },
      it: {
        role: "Sviluppatrice Front-end",
        place: "Da remoto, Brasile",
        bullets: [
          "Grande applicazione TypeScript / React / MUI, dalle user story alle funzionalità rilasciate",
          "Accessibilità migliorata del 20% grazie alla conformità WCAG",
          "Integrazioni REST con Redux, Next.js e Node.js; back-end in PHP, Node e C++",
        ],
      },
      de: {
        role: "Front-end-Entwicklerin",
        place: "Remote, Brasilien",
        bullets: [
          "Große TypeScript/React/MUI-Anwendung, von User Stories bis zu ausgelieferten Features",
          "Barrierefreiheit durch WCAG-Konformität um 20 % verbessert",
          "REST-Integrationen mit Redux, Next.js und Node.js; Backends in PHP, Node und C++",
        ],
      },
    },
  },
  {
    id: "khomp-software",
    company: "Khomp",
    start: "2021-01",
    end: "2022-02",
    tags: ["C/C++", "PHP", "JavaScript"],
    text: {
      en: {
        role: "Software Developer",
        place: "Florianópolis, Brazil",
        bullets: [
          "Telecom products in C, C++, PHP and JavaScript",
          "New features, product testing and bug fixes in Scrum and Kanban teams",
        ],
      },
      pt: {
        role: "Desenvolvedora de Software",
        place: "Florianópolis, Brasil",
        bullets: [
          "Produtos de telecom em C, C++, PHP e JavaScript",
          "Novas funcionalidades, testes de produto e correção de bugs em times Scrum e Kanban",
        ],
      },
      it: {
        role: "Sviluppatrice Software",
        place: "Florianópolis, Brasile",
        bullets: [
          "Prodotti per telecomunicazioni in C, C++, PHP e JavaScript",
          "Nuove funzionalità, test di prodotto e bug fixing in team Scrum e Kanban",
        ],
      },
      de: {
        role: "Softwareentwicklerin",
        place: "Florianópolis, Brasilien",
        bullets: [
          "Telekommunikationsprodukte in C, C++, PHP und JavaScript",
          "Neue Features, Produkttests und Bugfixes in Scrum- und Kanban-Teams",
        ],
      },
    },
  },
  {
    id: "ejec",
    company: "EJEC",
    start: "2019-10",
    end: "2021-01",
    tags: ["HTML/CSS", "JavaScript", "Leadership"],
    text: {
      en: {
        role: "Frontend Developer · Junior Head of HR",
        place: "Junior Enterprise of Computer Engineering · Brazil",
        bullets: [
          "Turned client requirements into SPA prototypes (HTML, CSS, JS, Bootstrap)",
          "Led HR: ran hiring and introduced 1:1s between leads and members",
        ],
      },
      pt: {
        role: "Desenvolvedora Frontend · Head Júnior de RH",
        place: "Empresa Júnior de Engenharia de Computação · Brasil",
        bullets: [
          "Transformei requisitos de clientes em protótipos de SPA (HTML, CSS, JS, Bootstrap)",
          "Liderei o RH: conduzi processos seletivos e implantei 1:1s entre líderes e membros",
        ],
      },
      it: {
        role: "Sviluppatrice Frontend · Junior Head of HR",
        place: "Junior Enterprise di Ingegneria Informatica · Brasile",
        bullets: [
          "Ho trasformato i requisiti dei clienti in prototipi SPA (HTML, CSS, JS, Bootstrap)",
          "Ho guidato le risorse umane: selezioni e 1:1 tra responsabili e membri",
        ],
      },
      de: {
        role: "Frontend-Entwicklerin · Junior Head of HR",
        place: "Junior Enterprise für Computer Engineering · Brasilien",
        bullets: [
          "Kundenanforderungen in SPA-Prototypen umgesetzt (HTML, CSS, JS, Bootstrap)",
          "HR geleitet: Recruiting verantwortet und 1:1-Gespräche zwischen Leads und Mitgliedern eingeführt",
        ],
      },
    },
  },
  {
    id: "larm",
    company: "LARM",
    start: "2017-05",
    end: "2019-08",
    tags: ["C++", "Python", "ESP32", "MQTT"],
    text: {
      en: {
        role: "Software Development Researcher",
        place: "Mobile Automation & Robotics Lab, UFSC · Brazil",
        bullets: [
          "Real-time embedded communication with C++, Python, ESP32, MQTT and cryptography, visualised on the web",
        ],
      },
      pt: {
        role: "Pesquisadora em Desenvolvimento de Software",
        place: "Laboratório de Automação e Robótica Móvel, UFSC · Brasil",
        bullets: [
          "Comunicação embarcada em tempo real com C++, Python, ESP32, MQTT e criptografia, visualizada na web",
        ],
      },
      it: {
        role: "Ricercatrice in sviluppo software",
        place: "Laboratorio di automazione e robotica mobile, UFSC · Brasile",
        bullets: [
          "Comunicazione embedded in tempo reale con C++, Python, ESP32, MQTT e crittografia, visualizzata sul web",
        ],
      },
      de: {
        role: "Wissenschaftliche Mitarbeiterin Softwareentwicklung",
        place: "Labor für mobile Automatisierung und Robotik, UFSC · Brasilien",
        bullets: [
          "Echtzeit-Embedded-Kommunikation mit C++, Python, ESP32, MQTT und Kryptografie, im Web visualisiert",
        ],
      },
    },
  },
];

/** Tag lists line up with `work.skills.groups` in the dictionaries. */
export const skillGroups: string[][] = [
  ["React", "Next.js", "TypeScript", "Tailwind", "MUI"],
  ["WCAG", "i18n", "Figma → code"],
  ["Testing", "Storybook", "CI", "Code review"],
  ["Node.js", "REST", "PostgreSQL", "C/C++"],
];
