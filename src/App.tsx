import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { Menu, X, Instagram, Facebook, Phone, Mail, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { View, Project } from './types';
import { PROJECTS } from './data';

// --- Constants ---
const LOGO_URL = "https://lh3.googleusercontent.com/d/16i394jLeDwKC8wrvKUqu852HltnnZ6s0";
const HERO_LOGO_URL = "https://lh3.googleusercontent.com/d/1gOZd2sQlgjzBQlUxyxY69mLuz3mW2SBO";

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.2 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('.group');
      setIsHovering(!!isInteractive);
    };

    checkMobile();
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 4 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: { id: View; label: string }[] = [
    { id: 'home', label: 'Página Inicial' },
    { id: 'about', label: 'Flávio Severino' },
    { id: 'services', label: 'Serviços' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contactos' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => setView('home')} 
          className="h-10 flex items-center space-x-4 hover:opacity-70 transition-opacity"
        >
          <img src={LOGO_URL} alt="Flávio Severino Logo" className="h-full w-auto object-contain grayscale" referrerPolicy="no-referrer" />
          <span className="hidden sm:block text-xs uppercase tracking-[0.3em] font-medium border-l border-black/10 pl-4 py-1">
            Arquitectura
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsOpen(false); }}
              className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:text-neutral-400 ${
                currentView === item.id ? 'font-bold border-b border-black pb-1' : 'font-medium text-neutral-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-black md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); setIsOpen(false); }}
                  className={`text-xs uppercase tracking-[0.3em] text-left ${
                    currentView === item.id ? 'font-bold' : 'text-neutral-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Home = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col">
    {/* High-Impact Hero Section */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: [0.2, 0, 0, 1] }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" 
          alt="Architectural background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <img src={HERO_LOGO_URL} alt="Flávio Severino" className="h-32 md:h-48 w-auto object-contain invert brightness-0 grayscale" referrerPolicy="no-referrer" />
        <div className="mt-12 h-px w-16 bg-white/40"></div>
        <p className="mt-12 text-[10px] uppercase tracking-[0.8em] text-white font-medium">
          Arquitectura e Design
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
      </motion.div>
    </section>

    {/* Manifesto Section */}
    <section className="py-48 px-6 bg-white text-black border-b border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-12 font-bold">Filosofia</h2>
            <p className="text-3xl md:text-5xl font-light leading-tight mb-16 tracking-tight">
              A arquitectura é mais do que uma profissão. A partir da observação fundamentada, emergem soluções que deverão dignificar todos os intervenientes.
            </p>
            <p className="text-neutral-500 max-w-xl leading-loose font-light text-lg">
              Essa mais valia inquantificável passa pelo diálogo e pela partilha das soluções que constroem o nosso bem estar físico e psicológico.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <img src={LOGO_URL} alt="FS Symbol" className="w-32 opacity-10 grayscale" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>

    {/* Featured Projects Teaser */}
    <section className="py-48 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-6 font-bold">Trabalhos</h2>
            <p className="text-4xl font-light tracking-tight">Projectos de Destaque</p>
          </div>
          <button 
            onClick={() => setView('projects')}
            className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:opacity-50 transition-all"
          >
            Ver Portfolio Completo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="group cursor-pointer" onClick={() => setView('projects')}>
            <div className="aspect-[4/5] bg-neutral-200 mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
               <img 
                src="https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2000&auto=format&fit=crop" 
                alt="Habitação Unifamiliar" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold">Habitação Unifamiliar</p>
            <p className="text-[10px] text-neutral-400 mt-3 uppercase tracking-widest">Lourinhã</p>
          </div>
          <div className="group cursor-pointer" onClick={() => setView('projects')}>
            <div className="aspect-[4/5] bg-neutral-200 mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
               <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop" 
                alt="Projecto Residencial" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold">Residencial</p>
            <p className="text-[10px] text-neutral-400 mt-3 uppercase tracking-widest">Torres Vedras</p>
          </div>
          <div className="group hidden lg:block cursor-pointer" onClick={() => setView('projects')}>
            <div className="aspect-[4/5] bg-neutral-200 mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
               <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop" 
                alt="Reabilitação" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold">Reabilitação</p>
            <p className="text-[10px] text-neutral-400 mt-3 uppercase tracking-widest">Caldas da Rainha</p>
          </div>
        </div>
      </div>
    </section>

    {/* Regional Presence */}
    <section className="py-40 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xs uppercase tracking-[0.6em] text-neutral-500 mb-12">Projetos em todo o País</h2>
        <p className="text-2xl md:text-3xl font-light mb-16 max-w-4xl mx-auto leading-relaxed tracking-tight">
          Já desenvolvi projetos em diversos concelhos do nosso país! Quer desenvolver o seu?
        </p>
        <button 
          onClick={() => setView('contact')}
          className="bg-white text-black px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-colors"
        >
          orçamento grátis
        </button>
      </div>
    </section>
  </div>
);

const About = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6 font-bold">Flávio Severino</h2>
          <div className="aspect-[3/4] bg-neutral-100 grayscale mb-8">
             <img 
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop" 
              alt="Flávio Severino" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
            "A arquitectura é mais do que uma profissão. A partir da observação fundamentada, emergem soluções que deverão dignificar todos os intervenientes."
          </div>
          
          <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-loose">
            <p>
              Essa mais valia inquantificável passa pelo diálogo e pela partilha das soluções que constroem o nosso bem estar físico e psicológico.
            </p>
            
            <div className="pt-8 space-y-8 border-t border-neutral-100">
               <h3 className="text-lg font-medium text-black uppercase tracking-widest">Biografia</h3>
               <p>
                Flávio Alexandre Henriques Severino, inscrito na Ordem dos Arquitectos com o número 17332, com experiência profissional desde 2007.
               </p>
               <p>
                A maioria dos trabalhos desenvolvidos são projetos residenciais, mas o leque de trabalhos desenvolvidos é muito variado.
               </p>
               <p>
                Procura-se que trabalho desenvolvido seja o mais completo possível, desde a apreciação inicial do local até à finalização da obra e posterior acompanhamento, combinando sempre que possível a arquitectura, o desenho de interiores, o mobiliário e a iluminação, num trabalho que procura responder de forma global às necessidades do cliente.
               </p>
               <p>
                Com a consciência de que se trabalhou ao máximo na procura de soluções que irão permitir ao objecto construído responder da melhor forma possível, durante o maior periúdo de tempo possível às solicitações que terá de enfrentar.
               </p>
               <p className="font-medium text-black">
                Trabalhos desenvolvidos na Zona Oeste, nos concelhos de Lourinhã, Torres Vedras, Caldas da Rainha, Bombarral, Peniche, Mafra e Arruda dos Vinhos.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="py-32 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6">Serviços</h2>
        <p className="text-3xl font-light max-w-2xl">
          Soluções completas e acompanhamento técnico especializado em todas as fases do projecto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-2">Projecto e Planeamento</h3>
          <ul className="space-y-3 text-sm text-neutral-600 list-disc list-inside">
            <li>Aconselhamento e apoio especializado</li>
            <li>Desenvolvimento de conceito</li>
            <li>Estudos prévios</li>
            <li>PIP (Pedidos de Informação Prévia)</li>
            <li>Desenvolvimento de projetos</li>
            <li>Projectos de Licenciamento Camarário</li>
            <li>Projecto de execução</li>
            <li>Ficha Técnica da Habitação</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-2">Visualização e Obra</h3>
          <ul className="space-y-3 text-sm text-neutral-600 list-disc list-inside">
            <li>Modelação e animação tridimensional</li>
            <li>Maquetes</li>
            <li>Acompanhamento de obra</li>
            <li>Alterações durante a execução da obra</li>
            <li>Fiscalização de obra</li>
            <li>Conclusão de obra</li>
            <li>Alteração de usos</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-2">Tipos de Obra</h3>
          <ul className="space-y-3 text-sm text-neutral-600 list-disc list-inside">
            <li>Edifícios residenciais</li>
            <li>Edifícios de uso público, privado e/ou misto</li>
            <li>Estabelecimentos comerciais</li>
            <li>Loteamentos / Alteração de Loteamentos</li>
            <li>Propriedade Horizontal</li>
            <li>Legalizações e Ampliações</li>
            <li>Destaque de parcela</li>
            <li>Demolições</li>
          </ul>
        </div>
      </div>

      <div className="mt-32 p-12 bg-neutral-50">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-10">Parcerias com Especialistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs text-neutral-500 uppercase tracking-wider">
          <div className="space-y-4">
            <p>Arquitectura Paisagista</p>
            <p>Levantamentos Topográficos</p>
            <p>Projectos de infraestruturas</p>
            <p>Projectos de estabilidade</p>
            <p>Abastecimento de águas e saneamento</p>
          </div>
          <div className="space-y-4">
            <p>Projectos de Gás e ITED</p>
            <p>Electricidade e Mecânica</p>
            <p>Domótica</p>
            <p>Comportamento Térmico</p>
            <p>Condicionamento Acústico</p>
          </div>
          <div className="space-y-4">
            <p>Segurança contra Incêndio</p>
            <p>Planos de Emergência</p>
            <p>Avaliações Imobiliárias</p>
            <p>Certificações Energéticas</p>
            <p>Análise de patologias</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  if (selectedProject) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => setSelectedProject(null)}
            className="group flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] font-bold mb-20 hover:opacity-50 transition-opacity"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar aos Projetos</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Header Info */}
            <div className="lg:col-span-12 mb-12 border-b border-neutral-100 pb-12">
              <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-6">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-8 items-center text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
                <span>{selectedProject.location}</span>
                <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>
                <span>{selectedProject.category}</span>
                <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>
                <span>{selectedProject.year}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-32 space-y-16">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-10 font-bold">Resumo Técnico</h3>
                  <div className="space-y-8 text-[11px] uppercase tracking-[0.3em] font-medium">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-50">
                      <span className="text-neutral-400">Cliente</span>
                      <span className="text-black text-right">{selectedProject.specs.client}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-50">
                      <span className="text-neutral-400">Área</span>
                      <span className="text-black text-right">{selectedProject.specs.area}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-50">
                      <span className="text-neutral-400">Estado</span>
                      <span className="text-black text-right">{selectedProject.specs.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-50">
                      <span className="text-neutral-400">Equipa</span>
                      <span className="text-black text-right">{selectedProject.specs.team}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                   <h3 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold">Partilhar</h3>
                   <div className="flex space-x-6 text-neutral-300">
                     <Facebook size={18} className="hover:text-black cursor-pointer transition-colors" />
                     <Instagram size={18} className="hover:text-black cursor-pointer transition-colors" />
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 order-1 lg:order-2 space-y-20">
              <div className="bg-neutral-50 overflow-hidden">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold">Memória Descritiva</h3>
                <p className="text-neutral-600 leading-[2] text-lg font-light max-w-2xl">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-12 pt-12">
                {selectedProject.gallery.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-100 overflow-hidden"
                  >
                    <img 
                      src={img} 
                      alt={`${selectedProject.title} ${idx + 1}`} 
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6 font-bold">Portfolio</h2>
            <p className="text-4xl font-light tracking-tight">Uma selecção de trabalhos</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.4em] pb-1 border-b transition-all duration-300 ${
                  filter === cat ? 'border-black font-bold text-black' : 'border-transparent text-neutral-400 hover:text-black font-medium'
                }`}
              >
                {cat === 'all' ? 'Ver Tudo' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-40">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              onClick={() => setSelectedProject(p)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-8 overflow-hidden bg-neutral-100 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className="w-full h-[60vh] object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="lg:col-span-4 lg:pl-12">
                <div className="mb-6 flex items-center space-x-4">
                   <div className="h-px w-8 bg-neutral-200 group-hover:w-16 transition-all duration-700"></div>
                   <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold">{p.category}</span>
                </div>
                <h3 className="text-3xl font-light tracking-tighter mb-4 group-hover:pl-4 transition-all duration-700">{p.title}</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-widest pl-0 group-hover:pl-4 transition-all duration-700">{p.location} / {p.year}</p>
                
                <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black pb-2">Explorar Projecto</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-10">Contactos</h2>
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <MapPin className="text-neutral-400 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 font-bold">Endereço</p>
                <p className="text-neutral-600 leading-relaxed max-w-xs">
                  Rua da Falda, n.º9, Casais de São Miguel,<br />
                  2530-335 Marteleira
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <Phone className="text-neutral-400 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 font-bold">Telemóvel</p>
                <p className="text-neutral-600">967 283 304</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <Mail className="text-neutral-400 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 font-bold">E-mail</p>
                <p className="text-neutral-600">flavioseverino.arq@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-8 pt-6">
              <a href="https://www.facebook.com/flavioseverinoarq" target="_blank" className="hover:opacity-50 transition-opacity">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/flavio.severino.arquitecto/" target="_blank" className="hover:opacity-50 transition-opacity">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 p-10 lg:p-20">
          <h3 className="text-xl font-light mb-10">Solicite um pedido de informação ou agende uma reunião.</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Nome</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none px-0 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none px-0 py-2 text-sm" />
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <label className="text-[10px] uppercase tracking-widest font-bold block mb-4">Serviços de Interesse</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  'Projecto de Arquitectura',
                  'Reabilitação',
                  'Design de Interiores',
                  'Licenciamentos',
                  'Acompanhamento de Obra',
                  'Certificação Energética'
                ].map((service) => (
                  <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-4 h-4 border border-black/20 checked:bg-black checked:border-black transition-all" />
                      <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-neutral-500 group-hover:text-black transition-colors">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Mensagem</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none px-0 py-2 text-sm resize-none"></textarea>
            </div>
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors mt-8">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-neutral-100 text-center">
    <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
      © {new Date().getFullYear()} Flávio Severino | Arquitectura e Design
    </p>
  </footer>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col font-sans cursor-none">
      <CustomCursor />
      <Navbar currentView={view} setView={setView} />
      
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            {view === 'home' && <Home setView={setView} />}
            {view === 'about' && <About />}
            {view === 'services' && <Services />}
            {view === 'projects' && <Projects />}
            {view === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
