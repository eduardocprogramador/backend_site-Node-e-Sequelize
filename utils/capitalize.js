const capitalize = (name) => {
  return name.toLowerCase().split(' ').map(word => {
    if (word.length >= 3) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return word 
  }).join(' ')
}

module.exports = capitalize