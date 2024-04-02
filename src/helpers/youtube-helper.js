export const shortLinkHelper = (shortLink) => {
    const videoId = shortLink.split('/').pop(); // Получаем идентификатор видео из ссылки
    return `https://www.youtube.com/embed/${videoId}`; // Формируем встроенную ссылку
}