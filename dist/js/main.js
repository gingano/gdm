import { createListWithTemplate, setScreen } from './helpers.js'
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
const accountsElement = document.querySelector('.accounts')
let accountsList = document.querySelector('.accounts__list')
let itemsArray = [...accountsList.querySelectorAll('.accounts__list-item')]

const updateList = () => {
  createListWithTemplate(accounts, accountsList, template)
}

const updateFocus = () => {
  accountsList = document.querySelector('.accounts__list')
  itemsArray = [...accountsList.querySelectorAll('.accounts__list-item')]

  if (!itemsArray[state.currentItemIndex]) {
    state.currentItemIndex = 0
  }

  if (itemsArray.length > 0 && itemsArray[state.currentItemIndex]) {
    itemsArray[state.currentItemIndex].focus()
  }

  if (itemsArray.length > 0 && !itemsArray[state.currentItemIndex]) {
    itemsArray[state.currentItemIndex - 1].focus()
  }
}

updateList()

window.addEventListener('load', () => {
  updateFocus()
  setScreen(state, screens)
})

document.addEventListener('mousedown', (event) => {
  event.preventDefault()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  screen2AddButton.focus()
  state.inputFocused = false
})

screen1AddButton.addEventListener('click', () => {
  state.currentScreen = 2
  setScreen(state, screens)

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
    accountsElement.classList.remove('accounts--hidden')
    input.value = ''
    state.currentScreen = 1
    setScreen(state, screens)
    updateFocus()
    state.inputFocused = false
    state.focusOutOfList = false
  }
})

screen2CancelButton.addEventListener('click', (event) => {
  event.preventDefault()
  input.value = ''
  state.currentScreen = 1
  setScreen(state, screens)
  updateFocus()
  state.inputFocused = false
  state.focusOutOfList = false

  if (accounts.length === 0) {
    screen1AddButton.focus()
  }
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

    if (!accounts[state.currentItemIndex]) {
      state.currentItemIndex -= 1
    }

    if (accounts.length === 0) {
      accountsElement.classList.add('accounts--hidden')
      screen1AddButton.focus()
    }

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
