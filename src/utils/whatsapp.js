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
    `Hello ${COMPANY.name}! I am interested in your bespoke architectural furniture and interior design collections. I would like to schedule a consultation.`
  )
}

/**
 * Build a WhatsApp URL for a bespoke project inquiry with full spec.
 */
export function buildBespokeWhatsAppUrl({ room, timber, fabric, width, depth }) {
  const msg = [
    `🏠 *Bespoke Project Inquiry — ${COMPANY.name}*`,
    ``,
    `*Room:* ${room}`,
    `*Timber:* ${timber}`,
    `*Fabric:* ${fabric}`,
    `*Dimensions:* ${width} ft × ${depth} ft`,
    ``,
    `I would like to schedule a design consultation for this commission. Please share availability.`,
  ].join('\n')

  return buildWhatsAppUrl(msg)
}

/**
 * Build a WhatsApp URL for a specific product inquiry.
 */
export function buildProductWhatsAppUrl(productName, material) {
  return buildWhatsAppUrl(
    `Hello! I am interested in the *${productName}* (${material}) from ${COMPANY.name}. Can I get more details and pricing?`
  )
}

/**
 * Get a direct phone call link.
 */
export function getPhoneUrl() {
  return `tel:${COMPANY.phone.replace(/\s/g, '')}`
}
