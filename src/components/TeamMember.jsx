import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../styles/TeamMember.css';

const TeamMember = ({ miembro, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay || 0
      }
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      case 'facebook':
        return <FaFacebook />;
      case 'instagram':
        return <FaInstagram />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="team-member"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="member-image">
        <img 
          src={miembro.imagen || '/images/team/placeholder.jpg'} 
          alt={miembro.nombre} 
        />
      </div>
      
      <div className="member-info">
        <h3>{miembro.nombre}</h3>
        <p className="member-position">{miembro.cargo}</p>
        <p className="member-bio">{miembro.bio}</p>
        
        <div className="member-social">
          {miembro.redes && Object.entries(miembro.redes).map(([platform, url]) => (
            <a 
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${miembro.nombre} en ${platform}`}
            >
              {getSocialIcon(platform)}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
