import dynamic from 'next/dynamic';

const clientSideRenderedPage =  page => dynamic(
    () => Promise.resolve(page),
    { ssr: false },
);

export default clientSideRenderedPage;