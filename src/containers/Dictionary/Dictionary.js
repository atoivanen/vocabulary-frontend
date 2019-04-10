import React, {Component, Fragment} from 'react';
//import {useTranslation} from 'react-i18next';
import Button from 'react-bootstrap/Button';

import Words from '../../components/Words/Words'

class Dictionary extends Component {
  state = {
    words: [
      {
        id: 1602,
        lemma: 'abandonner',
        translation: 'luopua',
        pos: 'VERB',
        gender: null,
        source_lang: 'fr',
        target_lang: 'fi'
      },
      {
        id: 2143,
        lemma: 'abeille',
        translation: 'mehiläinen',
        pos: 'NOUN',
        gender: 'f',
        source_lang: 'fr',
        target_lang: 'fi'
      },
      {
        id: 5588,
        lemma: 'abominable',
        translation: 'iljettävä',
        pos: 'ADJ',
        gender: null,
        source_lang: 'fr',
        target_lang: 'fi'
      }
    ],
    showDetails: [
      {
        id: 1602,
        show: false
      },
      {
        id: 2143,
        show: false
      },
      {
        id: 5588,
        show: false
      }
    ]
  }

  showModalHandler = (id) => {
    const updatedShowDetails = [...this.state.showDetails]
    const i = updatedShowDetails.findIndex((el) => el.id === id)
    updatedShowDetails[i].show = true
    this.setState({updatedShowDetails})
  }

  closeModalHandler = (id) => {
    const updatedShowDetails = [...this.state.showDetails]
    const i = updatedShowDetails.findIndex((el) => el.id === id)
    updatedShowDetails[i].show = false
    this.setState({updatedShowDetails})
  }

  valueChangedHandler = (event, id) => {
    const wordIndex = this.state.words.findIndex(word => word.id === id)
    const word = {...this.state.words[wordIndex]}
    const property = event.target.name
    word[property] = event.target.value

    const words = [...this.state.words]
    words[wordIndex] = word

    this.setState({words: words})
  }

  showNextHandler = (event, id ) => {
    const updatedShowDetails = [...this.state.showDetails]
    const i = updatedShowDetails.findIndex((el) => el.id === id)
    const name = event.target.name

    if (name === 'next') {
      const nextIndex = i === updatedShowDetails.length - 1 ? 0 : i + 1
      updatedShowDetails[nextIndex].show = true
    } else if (name === 'previous') {
      const previousIndex = i === 0 ? updatedShowDetails.length - 1 : i - 1
      updatedShowDetails[previousIndex].show = true
    }

    updatedShowDetails[i].show = false
    this.setState({updatedShowDetails})
  }

  createWordHandler = () => {
    const updatedWords = [...this.state.words]
    const id = Math.max.apply(Math, updatedWords.map(word => word.id)) + 1
    const newWord = {
      id: id,
      lemma: '',
      translation: '',
      pos: 'ADJ',
      gender: null,
      source_lang: 'fr',
      target_lang: 'fi'
    }
    updatedWords.push(newWord)
    this.setState({words: updatedWords})

    const updatedShowDetails = [...this.state.showDetails]
    updatedShowDetails.push({id: id, show: true})
    this.setState({showDetails: updatedShowDetails})
  }

  render() {
    const modalTitle = 'EditWordModalTitle'
    const pageTitle = 'DictionaryTitle'

    return (
      <Fragment>
        <h1>{pageTitle}</h1>
        <Words
          words={this.state.words}
          showDetails={this.state.showDetails}
          changed={this.valueChangedHandler}
          close={this.closeModalHandler}
          show={this.showModalHandler}
          next={this.showNextHandler}
          title={modalTitle} />
        <Button
          as="input"
          type="button"
          value="AddWord"
          onClick={this.createWordHandler} />
      </Fragment>
    )
  }
}

export default Dictionary;
