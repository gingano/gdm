export const createListWithTemplate = (accountsArray, list, template) => {
  const ul = document.createElement('ul')
  ul.classList.add('accounts__list')
  accountsArray.forEach((account) => {
    const accountItem = document.importNode(template.content, true)
    accountItem.querySelector('.accounts__list-item').id = account.id
    accountItem.querySelector('.accounts__image').src = account.img
    accountItem.querySelector('.accounts__title').textContent = account.title
    ul.appendChild(accountItem)
  })
  list.replaceWith(ul)
}

export const setScreen = (state, screens) => {
  state.screen2CurrentButton = 'add'
  screens.forEach((screen) => {
    screen.classList.add('screen--hidden')
  })
  screens
    .find((screen) =>
      [...screen.classList].includes(`screen--${state.currentScreen}`)
    )
    .classList.remove('screen--hidden')
}
