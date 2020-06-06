import $ from 'jquery';

class DomUpdates {
  constructor() {}
  
  displayAgentDashboard() {
    $('.login-page').addClass('hidden')
    $('.agent-dashboard').removeClass('hidden')
    $('.log-out-btn').removeClass('invisible')
  }
  
  displayUserDashboard() {
    $('.login-page').addClass('hidden')
    $('.user-dashboard').removeClass('hidden')
    $('.log-out-btn').removeClass('invisible')
  }

  incorrectLogin() {
    alert("Please Enter Correct Username and Password")
    $('.username-input').val('')
    $('.password-input').val('')
  }
}

export default DomUpdates; 