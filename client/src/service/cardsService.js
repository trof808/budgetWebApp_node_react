const url = '/cards/api';

export const getAllCards = () => {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch((error) => console.log(error))
  });

}
