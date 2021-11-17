export const getImageUrl = (imageUrl: string) => {
    console.log(imageUrl, 'url');
    const [ protocol, url ] = imageUrl.split('://');
    if (protocol === 'ipfs') return `https://ipfs.io/${url}`;

    return imageUrl;
}