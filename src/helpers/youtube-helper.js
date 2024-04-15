export const shortLinkHelper = (link) => {
    let videoId;
    if (link.includes("youtu.be")) {
        videoId = link.split('/').pop();
    } else if (link.includes("youtube.com")) {
        const urlParams = new URLSearchParams(new URL(link).search);
        videoId = urlParams.get('v');
    } else if (/^[a-zA-Z0-9_-]{11}$/.test(link)) {
        // Проверяем, соответствует ли переданная строка формату идентификатора видео
        videoId = link;
    } else {
        console.error("Invalid YouTube link format");
        return link;
    }
    return `https://www.youtube.com/embed/${videoId}`;
}