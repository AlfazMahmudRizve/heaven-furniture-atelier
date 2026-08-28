import { COMPANY } from '../data/company'

/**
 * Build a WhatsApp chat URL with a pre-filled message.
 * @param {string} message - The pre-filled text message
 * @returns {string} WhatsApp deep link URL
 */
export function buildWhatsAppUrl(message = '') {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encoded}`
}

/**
 * Build a WhatsApp URL for a general inquiry.
 */
export function getWhatsAppInquiryUrl() {
  return buildWhatsAppUrl(
    `Hi Heaven Furniture Mart! I'm interested in your bespoke furniture. I'd like to learn more about your collections and design consultation.`
  )
}

/**
 * Build a WhatsApp URL for a bespoke project inquiry with full spec.
 */
export function buildBespokeWhatsAppUrl({ room, timber, fabric, width, depth }) {
  const msg = [
    `🏠 *Bespoke Project Inquiry — Heaven Furniture Mart*`,
    ``,
    `*Room:* ${room}`,
    `*Timber:* ${timber}`,
    `*Fabric:* ${fabric}`,
    `*Dimensions:* ${width} ft × ${depth} ft`,
    ``,
    `I'd like to schedule a free design consultation for this project. Please share availability.`,
  ].join('\n')

  return buildWhatsAppUrl(msg)
}

/**
 * Build a WhatsApp URL for a specific product inquiry.
 */
export function buildProductWhatsAppUrl(productName, material) {
  return buildWhatsAppUrl(
    `Hi! I'm interested in the *${productName}* (${material}) from Heaven Furniture Mart. Can I get more details and pricing?`
  )
}

/**
 * Get a direct phone call link.
 */
export function getPhoneUrl() {
  return `tel:${COMPANY.phone.replace(/\s/g, '')}`
}
