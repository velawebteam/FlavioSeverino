import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: "habitacao-unifamiliar-lourinha",
    title: "Habitação Unifamiliar",
    category: "Residencial",
    location: "Lourinhã",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2000&auto=format&fit=crop",
    description: "Este projecto consistiu no desenvolvimento de uma habitação unifamiliar contemporânea, onde a premissa principal foi a integração harmoniosa com a topografia local. A volumetria foi trabalhada para garantir exposição solar óptima e privacidade em relação aos vizinhos, mantendo uma linguagem de simplicidade e rigor formal.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724bc5c305e9?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687940-c52af096999c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop"
    ],
    specs: {
      client: "Privado",
      area: "240 m2",
      status: "Concluído",
      team: "Flávio Severino (Arq.)"
    }
  },
  {
    id: "projecto-residencial-torres-vedras",
    title: "Projecto Residencial",
    category: "Residencial",
    location: "Torres Vedras",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
    description: "Uma intervenção que procura o equilíbrio entre a modernidade e os materiais tradicionais da região. O desenho de interiores foi desenvolvido em paralelo com a arquitectura, permitindo um controlo total sobre a luz e o mobiliário fixo, resultando num espaço coeso e funcional.",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
    ],
    specs: {
      client: "Privado",
      area: "185 m2",
      status: "Concluído",
      team: "Flávio Severino (Arq.)"
    }
  },
  {
    id: "reabilitacao-caldas-da-rainha",
    title: "Reabilitação Urbana",
    category: "Reabilitação / Comércio",
    location: "Caldas da Rainha",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    description: "Reabilitação de um edifício no centro histórico de Caldas da Rainha, adaptando o rés-do-chão para fins comerciais e mantendo o carácter original das fachadas. O interior foi totalmente repensado para responder às novas normas de segurança e acessibilidade.",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449156001935-d28705321fbb?q=80&w=2000&auto=format&fit=crop"
    ],
    specs: {
      client: "Público/Privado",
      area: "120 m2",
      status: "Em execução",
      team: "Flávio Severino (Arq.)"
    }
  }
];
