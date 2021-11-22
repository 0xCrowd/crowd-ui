export const getImageUrl = (imageUrl: string) => {
    const [ protocol, url ] = imageUrl.split('://');
    if (protocol === 'ipfs') return `https://ipfs.io/${url}`;

    return imageUrl;
}