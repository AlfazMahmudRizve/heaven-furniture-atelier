import { motion } from 'framer-motion';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer id="showroom" className="bg-espresso-deep text-linen pt-24 pb-8 px-6 md:px-16 relative">
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-bronze origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl tracking-[0.3em] text-linen mb-2">
              HEAVEN
            </h2>
            <p className="font-mono text-[10px] tracking-[0.5em] text-bronze-light mb-8 uppercase">
              FURNITURE MART
            </p>
            <p className="font-body text-linen-muted text-sm italic mb-6 max-w-sm">
              {COMPANY.tagline}
            </p>
            <a 
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="arcca-btn inline-flex items-center"
            >
              <span>Book Consultation</span>
            </a>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase mb-2">EMAIL</h4>
              <a href={`mailto:${COMPANY.email}`} className="text-sm text-linen-muted hover:text-linen transition-colors">
                {COMPANY.email}
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase mb-2">ADDRESS</h4>
              <p className="text-sm text-linen-muted">
                {COMPANY.address}<br />
                <span className="text-linen-muted/70 text-xs mt-1 block">{COMPANY.landmark}</span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase mb-2">PHONE</h4>
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="text-sm text-linen-muted hover:text-linen transition-colors block w-fit">
                {COMPANY.phone}
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase mb-2">HOURS</h4>
              <p className="text-sm text-linen-muted">
                {COMPANY.hours}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="sm:col-span-2">
              <h4 className="font-mono text-[10px] tracking-[0.3em] text-bronze uppercase mb-2">SOCIAL</h4>
              <div className="flex space-x-6">
                {COMPANY.socials && Object.entries(COMPANY.socials).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-linen-muted hover:text-linen transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="h-[1px] w-full bg-bronze/20 my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-linen-muted/60 uppercase gap-4 text-center sm:text-left">
          <a href="#" className="hover:text-linen transition-colors">Privacy Policy</a>
          <a href="/admin" className="hover:text-bronze transition-colors">Store Manager CMS ↗</a>
          <span>© 2026 Heaven Furniture Mart</span>
          <span>Designed in Chattogram</span>
        </div>
      </div>
    </footer>
  );
}
