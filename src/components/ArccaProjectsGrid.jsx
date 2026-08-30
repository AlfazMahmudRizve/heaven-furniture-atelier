import { motion } from 'framer-motion';
import { COLLECTIONS } from '../data/collections';

export default function ArccaProjectsGrid() {
  const projects = [
    { name: 'Casa Sovereign', location: 'Agrabad Penthouse', image: '/images/hero-living.jpg', status: 'In Development' },
    { name: 'Casa Imperial', location: 'Khulshi Residence', image: '/images/hero-bedroom.jpg', status: 'Current Project' },
    { name: 'Casa Heritage', location: 'Nasirabad Villa', image: '/images/hero-dining.jpg', status: 'Current Project' },
    { name: 'Casa Sanctum', location: 'GEC Circle Tower', image: '/images/hero-executive.jpg', status: 'Bespoke Commission' }
  ];

  return (
    <section id="collections" className="bg-linen text-espresso-deep py-24 md:py-32 px-6 md:px-16 relative">
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-espresso-deep/20 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <div className="w-5 h-5 border border-espresso-deep rotate-45 inline-block mb-4" />
            <motion.h2 
              className="font-display text-3xl md:text-4xl text-espresso-deep leading-tight"
              initial={{ opacity: 0, rotate: 5, y: 20 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Design, Architecture, Interior Design
            </motion.h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end md:text-right">
            <span className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase mb-4 block">
              PORTFOLIO
            </span>
            <p className="text-espresso-deep/80 text-sm leading-relaxed max-w-md mb-8">
              We create refined, functional spaces where aesthetics meet purpose. Each project reflects our commitment to heirloom timber craftsmanship.
            </p>
            <button className="arcca-btn bg-espresso text-linen hover:bg-espresso-deep transition-colors px-6 py-3 uppercase text-[11px] tracking-widest font-mono">
              View All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="aspect-[4/3] relative overflow-hidden rounded-lg group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 right-4 bg-linen/90 text-espresso-deep text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md">
                {project.status}
              </div>
              
              <div className="absolute bottom-6 left-6">
                <h3 className="font-display text-2xl text-linen">{project.name}</h3>
                <p className="font-mono text-[11px] text-linen/70 tracking-widest uppercase mt-1">
                  {project.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
