import dynamic from 'next/dynamic'

export default page => dynamic(
    () => Promise.resolve(page),
    { ssr: false },
)