// Sharing utility functions

export const shareContent = async (title, text, url = null) => {
  const shareData = {
    title,
    text,
    ...(url && { url })
  }

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      // Use native share API if available
      await navigator.share(shareData)
      return { success: true, method: 'native' }
    } else {
      // Fallback to clipboard
      const shareText = url ? `${text}\n${url}` : text
      await navigator.clipboard.writeText(shareText)
      return { success: true, method: 'clipboard' }
    }
  } catch (error) {
    console.error('Error sharing:', error)
    return { success: false, error: error.message }
  }
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return { success: true }
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return { success: false, error: error.message }
  }
}

export const generateShareUrl = (path = '', params = {}) => {
  const baseUrl = window.location.origin
  const url = new URL(path, baseUrl)
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  
  return url.toString()
}

export const shareViaEmail = (subject, body, to = '') => {
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(mailtoUrl)
}

export const shareViaSocialMedia = (platform, url, text = '') => {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  
  const socialUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
  }
  
  if (socialUrls[platform]) {
    window.open(socialUrls[platform], '_blank', 'width=600,height=400')
  }
}
