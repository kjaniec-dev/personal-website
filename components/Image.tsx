import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, loading = 'lazy', ...rest }: ImageProps) => (
  <NextImage
    src={`${basePath || ''}${src}`}
    loading={loading}
    sizes={rest.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
    {...rest}
  />
)

export default Image
