import defaultData from '../content/data.js'

const defaultImageUrl = 'img/default-image.jpg'
const state = {
  currentItemIndex: 0,
  currentScreen: 1,
  focusOutOfList: false,
  inputFocused: false,
  screen2CurrentButton: 'add',
}
let { accounts } = defaultData
const screens = [...document.querySelectorAll('.screen')]
const screen1AddButton = document.querySelector('.add-button')
const screen2AddButton = document.querySelector('.buttons__button--add')
const screen2CancelButton = document.querySelector('.buttons__button--cancel')
const form = document.querySelector('.form')
const input = document.querySelector('.form__input')
const template = document.getElementById('account-template')
let accountsList = document.querySelector('.accounts__list')
let itemsArray = [...accountsList.querySelectorAll('.accounts__list-item')]

const createListWithTemplate = (accountsArray, list) => {
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

const setScreen = () => {
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

const updateList = () => {
  createListWithTemplate(accounts, accountsList)
}

const updateFocus = () => {
  accountsList = document.querySelector('.accounts__list')
  itemsArray = [...accountsList.querySelectorAll('.accounts__list-item')]

  if (itemsArray.length > 0) {
    itemsArray[state.currentItemIndex].focus()
  }
}

updateList()

window.addEventListener('load', () => {
  updateFocus()
  setScreen()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  screen2AddButton.focus()
  state.inputFocused = false
})

screen1AddButton.addEventListener('click', () => {
  state.currentScreen = 2
  setScreen()

  input.focus()
  state.inputFocused = true
})

screen2AddButton.addEventListener('click', () => {
  if (input.value.length === 0) {
    state.inputFocused = true
    input.reportValidity()
  } else {
    accounts.push({
      title: input.value,
      img: defaultImageUrl,
    })
    updateList()
    input.value = ''
    state.currentScreen = 1
    setScreen()
    updateFocus()
    state.inputFocused = false
  }
})

screen2CancelButton.addEventListener('click', (event) => {
  event.preventDefault()
  input.value = ''
  state.currentScreen = 1
  setScreen()
  updateFocus()
  state.inputFocused = false
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && state.currentScreen === 1) {
    state.currentItemIndex =
      state.currentItemIndex === 0
        ? itemsArray.length - 1
        : state.currentItemIndex - 1
    updateFocus()
  }

  if (event.key === 'ArrowUp' && state.currentScreen === 2) {
    input.focus()
    state.inputFocused = true
  }

  if (event.key === 'ArrowDown' && state.currentScreen === 1) {
    state.currentItemIndex =
      state.currentItemIndex === itemsArray.length - 1
        ? 0
        : state.currentItemIndex + 1
    updateFocus()
  }

  if (event.key === 'ArrowDown' && state.currentScreen === 2) {
    document
      .querySelector(`.buttons__button--${state.screen2CurrentButton}`)
      .focus()
    state.inputFocused = false
  }

  if (event.key === 'ArrowRight' && state.currentScreen === 1) {
    screen1AddButton.focus()
    state.focusOutOfList = true
  }

  if (
    event.key === 'ArrowRight' &&
    state.currentScreen === 2 &&
    !state.inputFocused
  ) {
    screen2CancelButton.focus()
    state.screen2CurrentButton = 'cancel'
  }

  if (
    event.key === 'ArrowLeft' &&
    state.currentScreen === 1 &&
    !state.focusOutOfList
  ) {
    accounts = accounts.filter(
      (item, index) => index !== state.currentItemIndex
    )

    updateList()
    updateFocus()
  }

  if (
    event.key === 'ArrowLeft' &&
    state.currentScreen === 1 &&
    state.focusOutOfList
  ) {
    updateFocus()
    state.focusOutOfList = false
  }

  if (
    event.key === 'ArrowLeft' &&
    state.currentScreen === 2 &&
    !state.inputFocused
  ) {
    screen2AddButton.focus()
    state.screen2CurrentButton = 'add'
  }
})
