'use client'

import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

interface ImageLightboxProps {
  slides: { src: string; title?: string; description?: string }[]
  open: boolean
  close: () => void
  index?: number
}

export const ImageLightbox = ({ slides, open, close, index = 0 }: ImageLightboxProps) => {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Thumbnails, Zoom]}
      styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .85)' } }}
    />
  )
}
