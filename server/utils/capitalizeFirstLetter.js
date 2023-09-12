function capitalizeFirstLetter(string) {
    if (!string) return '';
    const words = string.trim().split(' ');
    const capitalizedWords = words.map(word => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' ');
}

module.exports = capitalizeFirstLetter;
