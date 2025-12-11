"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationData {
  ip: string;
  city: string;
  country: string;
}

const UserLocationDisplay = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Usando uma API pública para obter IP e localização
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setLocation({
          ip: data.ip,
          city: data.city,
          country: data.country_name,
        });
      } catch (error) {
        console.error("Failed to fetch location data:", error);
        setLocation({
          ip: 'Desconhecido',
          city: 'Localização',
          country: 'Indisponível',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-sm text-gray-500 p-2">
        Carregando dados de segurança...
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full bg-gray-900/70 backdrop-blur-sm border-b border-gray-700 p-2 text-xs text-gray-400 flex justify-center space-x-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-1">
        <Globe className="h-3 w-3 text-lh-orange" />
        <span>IP: {location?.ip}</span>
      </div>
      <div className="flex items-center space-x-1">
        <MapPin className="h-3 w-3 text-lh-orange" />
        <span>Localização: {location?.city}, {location?.country}</span>
      </div>
    </motion.div>
  );
};

export default UserLocationDisplay;