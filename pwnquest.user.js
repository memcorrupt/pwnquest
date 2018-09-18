// ==UserScript==
// @name         PwnQuest
// @namespace    https://liquidram.tech/
// @version      0.1
// @description  dont do the verification things on setquest.com
// @author       memcorrupt
// @match        https://setquest.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var done = 0;
$('.js-task-done').each(function(){
	$.post("/en/v1/save/task_done/", {task:this.getAttribute("data-id"), user: "", csrfmiddlewaretoken: getCookie("csrftoken")}).done(function(){done++});
});
var time = 0;
var ok = setInterval(function(){
	if(done == $('.js-task-done').length){
		$('.js-check-task').hide();
		$('.social_block').hide();
		$('.check_info .info').hide();
		$('#presentBtn').removeAttr('disabled');
		$('#presentBtn').removeClass('disabled-btn');
		$('#presentBtn').addClass('active-present');
		$('.task_page .social_block').hide();
		$('.task_page .hide-present').hide();
    }else if(time > 5000){
		alert("took more than 5 seconds to pwn... is your internet slow?");
		clearInterval(ok);
    }
	time += 10;
}, 10);
