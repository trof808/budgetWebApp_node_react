const url = '/banks/api';

export const getAllBanks = () => {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch((error) => { console.log(error) })
  });

}
