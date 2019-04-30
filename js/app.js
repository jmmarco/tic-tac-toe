$(document).ready(function () {

  console.log('hola')

  var counter = 0

  $('.counter').text(counter)


  $(document).on('keydown', handleKeyCodesAlaAntigua)


  function handleKeyCodes(evt) {
    switch(evt.code) {
      case 'ArrowUp':
        counter++
        $('.counter').text(counter)
        break
      case 'ArrowDown':
        counter--
        $('.counter').text(counter)
        break
      case 'Enter':
        counter = 0
        $('.counter').text(counter)
      default:
        console.log('nada')
    }
  }


  function handleKeyCodesAlaAntigua(evt) {
    console.log(evt.which)
    console.log(typeof evt.which)
    switch(evt.which) {
      case 13:
        counter = 0
        $('.counter').text(counter)
        break
      case 38:
        counter++
        $('.counter').text(counter)
        break
      case 40:
        counter--
        $('.counter').text(counter)
        break
      default:
        console.log('nada')
    }
  }

  





})