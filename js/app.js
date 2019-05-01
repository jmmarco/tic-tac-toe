$(document).ready(function () {

  $inputName = $('#input-name')
  $inputEmail = $('#input-email')
  $inputComments = $('#input-comments')
  $myForm = $('form');

  $inputName.on('input', handleName)
  $inputEmail.on('input', handleEmail)
  $inputComments.on('input', handleName)

  function handleName(evt) {
    var name = evt.target.value
    var $target = $(evt.target)

    if (name.length > 3) {
      $target.removeClass('is-invalid').addClass('is-valid')
    } else {
      $target.removeClass('is-valid').addClass('is-invalid')
    }
    enableSubmit(3)
  }

  function handleEmail(evt) {
    var $target = $(evt.target)

    if (emailIsValid(evt.target.value)) {
      var $target = $(evt.target)
      $target.removeClass('is-invalid').addClass('is-valid')
    } else {
      $target.removeClass('is-valid').addClass('is-invalid')
    }

    enableSubmit(3)
  }

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function enableSubmit(numEleToCheck) {
    var validElements = 0
    $('form').find(':input').each(function (e) {
      $(this).hasClass('is-valid') && validElements++
    })

    if (validElements == numEleToCheck) {
      $('form').find('button').attr('disabled', false)
      console.log('valid', validElements)
    } else {
      console.log('not enough', validElements)
      $('form').find('button').attr('disabled', true)
    }
  }
})
