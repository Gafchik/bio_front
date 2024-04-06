export const shortLinkHelper = (link) => {
    let videoId;
    if (link.includes("youtu.be")) {
        videoId = link.split('/').pop();
    } else if (link.includes("youtube.com")) {
        const urlParams = new URLSearchParams(new URL(link).search);
        videoId = urlParams.get('v');
    } else {
        console.error("Invalid YouTube link format");
        return link;
    }
    return `https://www.youtube.com/embed/${videoId}`;
}