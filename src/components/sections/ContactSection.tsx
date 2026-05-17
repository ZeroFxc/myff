declare global {
  interface Window {
    paypal?: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (selector: string) => void;
      };
    };
  }
}

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { User, ExternalLink, CreditCard } from 'lucide-react';
import { CONTACTS, PLATFORMS } from '../../data/constants';
import { SectionHeader } from '../ui/SectionHeader';
import { SpotlightCard } from '../ui/SpotlightCard';

export function ContactSection() {
  useEffect(() => {
    if (window.paypal) {
      window.paypal.HostedButtons({
        hostedButtonId: "FD7MAGYWA5ERQ"
      }).render("#paypal-container-FD7MAGYWA5ERQ");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader icon={<User className="text-cyan-400" />} title="联系方式" />
        <div className="space-y-4">
          {CONTACTS.map((contact, i) => {
            const content = (
              <SpotlightCard className="p-4 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                      {contact.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-400">{contact.label}</span>
                  </div>
                  <span className="font-mono text-gray-200 group-hover:text-white transition-colors">
                    {contact.value}
                  </span>
                </div>
              </SpotlightCard>
            );

            return contact.href ? (
              <a key={i} href={contact.href} target="_blank" rel="noopener noreferrer" className="block">
                {content}
              </a>
            ) : <div key={i}>{content}</div>;
          })}
        </div>
      </motion.section>

      {/* Platforms */}
      <motion.section 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SectionHeader icon={<ExternalLink className="text-cyan-400" />} title="平台主页" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-4rem)]">
          {PLATFORMS.map((platform, i) => (
            <a key={i} href={platform.href} target="_blank" rel="noopener noreferrer" className="block h-full">
              <SpotlightCard className="p-6 h-full flex flex-col justify-center group">
                <div className="text-gray-400 group-hover:text-cyan-400 transition-colors group-hover:scale-110 transform origin-left duration-300">
                  {platform.icon}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                    {platform.label}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </motion.section>

      {/* PayPal Button */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2"
      >
        <SectionHeader icon={<CreditCard className="text-cyan-400" />} title="支持" />
        <SpotlightCard className="p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Support?</h3>
          <p className="text-sm text-gray-400 mb-6">你好</p>
          <div id="paypal-container-FD7MAGYWA5ERQ" className="py-4"></div>
        </SpotlightCard>
      </motion.section>
    </div>
  );
}
